---
title: 01_fastqc_pre.lsf
parent: LSF Templates
nav_order: 10
---

# 01_fastqc_pre.lsf

```bash
#!/bin/bash
#BSUB -n 8
#BSUB -W 01:00
#BSUB -R "span[hosts=1]"
#BSUB -o logs/fqcp_pre_%J.out
#BSUB -e logs/fqcp_pre_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
mkdir -p fastqc_pre
fastqc -t 8 -o fastqc_pre fastq_merged/*.fastq.gz
multiqc -o fastqc_pre fastqc_pre

```

**Submit**

