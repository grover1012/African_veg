---
title: 10_plot_pca_ggrepel.lsf
parent: LSF Templates
nav_order: 10
---

# 10_plot_pca_ggrepel.lsf

```bash
#!/bin/bash
#BSUB -q short
#BSUB -n 1
#BSUB -W 00:20
#BSUB -R "span[hosts=1] rusage[mem=2]"
#BSUB -o logs/pca_plot_%J.out
#BSUB -e logs/pca_plot_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
sp="${PWD##*/}"; evf="pca/${sp}.eigenvec"; [ -s "$evf" ] || evf="pca/${sp}.SNPRelate.eigenvec.tsv"; [ -s "$evf" ] || { echo "No eigenvec found"; exit 2; }
Rscript - <<'RS'
suppressPackageStartupMessages({library(ggplot2);library(ggrepel)})
sp <- basename(getwd()); evf <- if (file.exists(file.path("pca",paste0(sp,".eigenvec")))) file.path("pca",paste0(sp,".eigenvec")) else file.path("pca",paste0(sp,".SNPRelate.eigenvec.tsv"))
ev <- read.table(evf, header=grepl("\\.tsv$",evf), stringsAsFactors=FALSE)
if(!grepl("\\.tsv$",evf)) names(ev)[1:3] <- c("FID","IID","PC1")
if(!grepl("\\.tsv$",evf)) { colnames(ev) <- c("FID","IID",paste0("PC",1:(ncol(ev)-2))); ev$Sample<-ev$IID } else { names(ev)[1]<-"Sample" }
pc1 <- which(names(ev)=="PC1"); pc2 <- which(names(ev)=="PC2")
p <- ggplot(ev, aes(ev[[pc1]], ev[[pc2]], label=Sample))+
  geom_point(size=2.8,alpha=.95)+ggrepel::geom_text_repel(size=3.4,max.overlaps=Inf,box.padding=.35,point.padding=.25,segment.size=.3)+
  labs(title=paste0(sp," PCA (labeled)"), x="PC1", y="PC2")+theme_classic(base_size=14)
ggsave(file.path("pca", paste0(sp,"_PCA_PC1_PC2_Labeled.png")), p, width=10, height=8, dpi=300)
RS

```

**Submit**

