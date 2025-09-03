---
title: 12_tree_nj_plot.lsf
parent: LSF Templates
nav_order: 10
---

# 12_tree_nj_plot.lsf

```bash
#!/bin/bash
#BSUB -q short
#BSUB -n 1
#BSUB -W 00:15
#BSUB -R "span[hosts=1] rusage[mem=2]"
#BSUB -o logs/tree_nj_%J.out
#BSUB -e logs/tree_nj_%J.err
set -euo pipefail

source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"

Rscript - <<'RS'
sp <- basename(getwd())
idf <- file.path("tree", paste0(sp, ".ibs.mdist.id"))
mdf <- file.path("tree", paste0(sp, ".ibs.mdist"))
stopifnot(file.exists(idf), file.exists(mdf))

ids  <- read.table(idf, stringsAsFactors=FALSE)  # FID IID
labs <- ids[,2]

# Optional pretty labels
labfile <- file.path("pca", paste0(sp, ".labels.tsv"))
if (file.exists(labfile)) {
  L <- read.table(labfile, sep="\t", header=FALSE, col.names=c("IID","Label"), stringsAsFactors=FALSE)
  m <- match(labs, L$IID)
  labs <- ifelse(is.na(m), labs, L$Label[m])
}

# Optional groups for colors
grpfile <- file.path("pca", paste0(sp, ".groups.tsv"))
tipcols <- rep("black", length(labs))
if (file.exists(grpfile)) {
  G <- read.table(grpfile, sep="\t", header=FALSE, col.names=c("IID","Group"), stringsAsFactors=FALSE)
  grp <- factor(ifelse(ids[,2] %in% G$IID, G$Group[match(ids[,2], G$IID)], "NA"))
  cols <- grDevices::rainbow(nlevels(grp))
  tipcols <- cols[as.integer(grp)]
}

# Distance matrix
mat <- as.matrix(read.table(mdf, check.names=FALSE))
rownames(mat) <- ids[,2]; colnames(mat) <- ids[,2]

# NJ tree
suppressPackageStartupMessages(library(ape))
d  <- as.dist(mat)
tr <- nj(d)

# Midpoint root if phangorn is available (optional)
if (requireNamespace("phangorn", quietly=TRUE)) {
  tr <- phangorn::midpoint(tr)
}

# Write Newick
ape::write.tree(tr, file=file.path("tree", paste0(sp, "_NJ.nwk")))

# Plot (unrooted), big canvas for readable labels
png(file.path("tree", paste0(sp, "_NJ.png")), width=2400, height=2400, res=220)
plot(tr, type="unrooted", tip.color=tipcols, cex=0.9, no.margin=TRUE)
# labels are drawn by default; increase/decrease with 'cex'
dev.off()

pdf(file.path("tree", paste0(sp, "_NJ.pdf")), width=11, height=11)
plot(tr, type="unrooted", tip.color=tipcols, cex=0.9, no.margin=TRUE)
dev.off()
RS

```

**Submit**

