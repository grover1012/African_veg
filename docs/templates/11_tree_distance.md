---
title: 11_tree_distance.lsf
parent: LSF Templates
nav_order: 10
---

# 11_tree_distance.lsf

```bash
#!/bin/bash
#BSUB -q short
#BSUB -n 4
#BSUB -W 00:20
#BSUB -R "span[hosts=1] rusage[mem=2]"
#BSUB -o logs/ibs_%J.out
#BSUB -e logs/ibs_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
sp="${PWD##*/}"; mkdir -p tree
plink --bfile pca/${sp}.pca --allow-extra-chr --distance square ibs gz --out tree/${sp}

```

**Submit**

