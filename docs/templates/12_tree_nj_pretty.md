---
title: 12_tree_nj_pretty.lsf
parent: LSF Templates
nav_order: 10
---

# 12_tree_nj_pretty.lsf

```bash
#!/bin/bash
#BSUB -q short
#BSUB -n 1
#BSUB -W 00:10
#BSUB -R "span[hosts=1] rusage[mem=2]"
#BSUB -o logs/tree_%J.out
#BSUB -e logs/tree_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
sp="${PWD##*/}"; CONDARC=/dev/null conda install -y -p /share/africanveg/gwnjeri/conda_envs/aiv_env_new -c conda-forge r-ape || true
Rscript - <<'RS'
suppressPackageStartupMessages(library(ape))
sp <- basename(getwd()); mfile <- file.path("tree", paste0(sp,".mdist.gz"))
D <- as.matrix(read.table(gzfile(mfile), header=FALSE))
tree <- nj(as.dist(D)); pdf(file.path("tree", paste0(sp,"_NJ_tree.pdf")), width=9, height=9)
plot(tree, type="fan", cex=.6, no.margin=TRUE); dev.off()
write.tree(tree, file=file.path("tree", paste0(sp,"_NJ_tree.nwk")))
RS

```

**Submit**

