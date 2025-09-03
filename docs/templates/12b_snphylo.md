---
title: 12b_snphylo.lsf
parent: LSF Templates
nav_order: 10
---

# 12b_snphylo.lsf

```bash
#!/bin/bash
#BSUB -q short
#BSUB -n 2
#BSUB -W 00:45
#BSUB -R "span[hosts=1] rusage[mem=4]"
#BSUB -o logs/snphylo_%J.out
#BSUB -e logs/snphylo_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
CONDARC=/dev/null conda install -y -p /share/africanveg/gwnjeri/conda_envs/aiv_env_new -c bioconda -c conda-forge raxml muscle clustalw bcftools plink || true
sp="${PWD##*/}"; invcf="vcf/${sp}.snps.clean.vcf.gz"; [ -s "$invcf" ] || { echo "Missing $invcf"; exit 2; }
mkdir -p "$HOME/bin"; if [ ! -x "$HOME/bin/snphylo.sh" ]; then curl -L -o "$HOME/bin/snphylo.sh" https://raw.githubusercontent.com/thlee/SNPhylo/master/snphylo.sh; chmod +x "$HOME/bin/snphylo.sh"; fi
mkdir -p tree/snphylo; cp -f "$invcf" tree/snphylo/input.vcf.gz; cd tree/snphylo
"$HOME/bin/snphylo.sh" -v input.vcf.gz -o "${sp}_snphylo" -m 0.05 -M 0.2 -l 0.2 -p 1000
ls -lh ${sp}_snphylo*

```

**Submit**

