---
title: 00_prep_ref.lsf
parent: LSF Templates
nav_order: 10
---

# 00_prep_ref.lsf

```bash
#!/bin/bash
#BSUB -n 4
#BSUB -W 01:00
#BSUB -R "span[hosts=1]"
#BSUB -o logs/refidx_%J.out
#BSUB -e logs/refidx_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
mkdir -p tmp/java; export _JAVA_OPTIONS="-Djava.io.tmpdir=$PWD/tmp/java -Xmx4g"
: "${REF_FASTA:?set REF_FASTA to absolute path of your .fa}"
[ -s "$REF_FASTA.bwt.2bit.64" ] || bwa-mem2 index "$REF_FASTA"
[ -s "$REF_FASTA.fai" ]         || samtools faidx "$REF_FASTA"
[ -s "${REF_FASTA%.fa}.dict" ]  || picard CreateSequenceDictionary R="$REF_FASTA" O="${REF_FASTA%.fa}.dict"

```

**Submit**

