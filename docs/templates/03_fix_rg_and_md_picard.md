---
title: 03_fix_rg_and_md_picard.lsf
parent: LSF Templates
nav_order: 10
---

# 03_fix_rg_and_md_picard.lsf

```bash
#!/bin/bash
#BSUB -q long
#BSUB -n 4
#BSUB -W 02:00
#BSUB -R "span[hosts=1] rusage[mem=4]"
#BSUB -o logs/rgfix_%J_%I.out
#BSUB -e logs/rgfix_%J_%I.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
mkdir -p align tmp/java; export _JAVA_OPTIONS="-Djava.io.tmpdir=$PWD/tmp/java -Xmx4g"
line=$(sed -n "${LSB_JOBINDEX}p" fastq_merged/samples.tsv); s=$(awk '{print $1}' <<<"$line")
in=align/${s}.sorted.bam; out=align/${s}.rg.md.bam
if ! samtools view -H "$in" | grep -q '^@RG'; then
  picard AddOrReplaceReadGroups I="$in" O=align/${s}.rg.bam RGID="$s" RGLB=lib1 RGPL=ILLUMINA RGPU=unit1 RGSM="$s" VALIDATION_STRINGENCY=SILENT
  picard MarkDuplicates I=align/${s}.rg.bam O="$out" M=align/${s}.rg.md.txt CREATE_INDEX=true VALIDATION_STRINGENCY=SILENT
else
  picard MarkDuplicates I="$in" O="$out" M=align/${s}.rg.md.txt CREATE_INDEX=true VALIDATION_STRINGENCY=SILENT
fi

```

**Submit**

