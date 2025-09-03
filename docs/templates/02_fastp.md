---
title: 02_fastp.lsf
parent: LSF Templates
nav_order: 10
---

# 02_fastp.lsf

```bash
#!/bin/bash
#BSUB -q long
#BSUB -n 8
#BSUB -W 02:00
#BSUB -R "span[hosts=1] rusage[mem=4]"
#BSUB -o logs/fastp_%J_%I.out
#BSUB -e logs/fastp_%J_%I.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
SHEET="fastq_merged/samples.tsv"; OUT="trim"; mkdir -p "$OUT" "$OUT/reports"
line=$(sed -n "${LSB_JOBINDEX}p" "$SHEET"); sample=$(awk '{print $1}' <<<"$line"); r1=$(awk '{print $2}' <<<"$line"); r2=$(awk '{print $3}' <<<"$line")
fastp -i "$r1" -I "$r2" -o $OUT/${sample}_R1.fastq.gz -O $OUT/${sample}_R2.fastq.gz \
  -w 8 --detect_adapter_for_pe --qualified_quality_phred 15 --length_required 50 \
  --json $OUT/reports/${sample}.json --html $OUT/reports/${sample}.html

```

**Submit**

