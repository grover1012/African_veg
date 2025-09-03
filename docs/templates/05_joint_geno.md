---
title: 05_joint_geno.lsf
parent: LSF Templates
nav_order: 10
---

# 05_joint_geno.lsf

```bash
#!/bin/bash
#BSUB -q long
#BSUB -n 8
#BSUB -W 08:00
#BSUB -R "span[hosts=1] rusage[mem=8]"
#BSUB -o logs/jointgeno_%J.out
#BSUB -e logs/jointgeno_%J.err
set -euo pipefail
source /usr/local/apps/miniconda20240526/etc/profile.d/conda.sh
conda activate /share/africanveg/gwnjeri/conda_envs/aiv_env_new || export PATH="/share/africanveg/gwnjeri/conda_envs/aiv_env_new/bin:$PATH"
mkdir -p vcf tmp/java; export _JAVA_OPTIONS="-Djava.io.tmpdir=$PWD/tmp/java -Xmx8g"
REF_FASTA="${REF_FASTA:-$PWD/${PWD##*/}.fa}"; [ -f "$REF_FASTA" ] || { echo "Missing reference: $REF_FASTA" >&2; exit 2; }
ls gvcf/*.g.vcf.gz > gvcf.files; [ -s gvcf.files ] || { echo "No gVCFs in gvcf/"; exit 3; }
species="${PWD##*/}"
gatk CombineGVCFs -R "$REF_FASTA" $(sed 's/^/-V /' gvcf.files) -O "vcf/${species}.combined.g.vcf.gz"
gatk GenotypeGVCFs -R "$REF_FASTA" -V "vcf/${species}.combined.g.vcf.gz" -O "vcf/${species}.raw.vcf.gz"
tabix -p vcf "vcf/${species}.raw.vcf.gz"

```

**Submit**

