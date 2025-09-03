---
title: 01b_fastqc_post.lsf
parent: LSF Templates
nav_order: 10
---

# 01b_fastqc_post.lsf

```bash
#!/bin/bash
#BSUB -n 8
#BSUB -W 01:00
#BSUB -R "span[hosts=1]"
#BSUB -o logs/fqcp_post_%J.out
#BSUB -e logs/fqcp_post_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
mkdir -p fastqc_post
fastqc -t 8 -o fastqc_post trim/*.fastq.gz
multiqc -o fastqc_post fastqc_post

```

**Submit**

