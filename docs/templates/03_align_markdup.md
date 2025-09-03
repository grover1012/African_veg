---
title: 03_align_markdup.lsf
parent: LSF Templates
nav_order: 10
---

# 03_align_markdup.lsf

```bash
#!/bin/bash
#BSUB -q long
#BSUB -n 8
#BSUB -W 08:00
#BSUB -R "span[hosts=1] rusage[mem=6]"
#BSUB -o logs/aln_%J_%I.out
#BSUB -e logs/aln_%J_%I.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
mkdir -p align tmp/java; export _JAVA_OPTIONS="-Djava.io.tmpdir=$PWD/tmp/java -Xmx8g"
REF_FASTA="${REF_FASTA:-$PWD/${PWD##*/}.fa}"; [ -f "$REF_FASTA" ] || { echo "Missing $REF_FASTA"; exit 2; }
line=$(sed -n "${LSB_JOBINDEX}p" fastq_merged/samples.tsv); s=$(awk '{print $1}' <<<"$line")
r1="trim/${s}_R1.fastq.gz"; r2="trim/${s}_R2.fastq.gz"
RG="@RG\tID:${s}\tSM:${s}\tPL:ILLUMINA"
bwa-mem2 mem -t 8 -R "$RG" "$REF_FASTA" "$r1" "$r2" | samtools view -b - | samtools sort -@4 -o align/${s}.sorted.bam
picard MarkDuplicates I=align/${s}.sorted.bam O=align/${s}.markdup.bam M=align/${s}.markdup.txt CREATE_INDEX=true VALIDATION_STRINGENCY=SILENT

```

**Submit**

