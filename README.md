# AIV Project — Species-wise WGS Pipeline (Hazel LSF)

**Last updated:** 2025-08-22

Self-contained runbook for species-wise short-read variant discovery on NCSU Hazel (LSF). Includes copy‑paste job scripts, correct Hazel resource flags (mem in GB/core), and troubleshooting notes.
Link to run the scripts: https://grover1012.github.io/African_veg/

## Quick Start (per species)

```bash
export PROJ_ROOT=/share/africanveg/gwnjeri/AIV_project
export SPECIES=<Species_Name>
cd "$PROJ_ROOT/$SPECIES"
# 1) Index reference
REF_FASTA="$PWD/${SPECIES}.fa" bsub < "$PROJ_ROOT/00_prep_ref.lsf"
# 2) Trim
N=$(wc -l < fastq_merged/samples.tsv)
bsub -q long -n 8 -W 02:00 -R 'span[hosts=1] rusage[mem=3]' -J "fastp[1-$N]%24" < 02_fastp.lsf
# 3) Post-trim QC
bsub -q long -n 8 -W 01:00 -R 'span[hosts=1] rusage[mem=3]' < 01b_fastqc_post.lsf
# 4) Align
bsub -q long -n 8 -W 08:00 -R 'span[hosts=1] rusage[mem=3]' -J "aln[1-$N]%24" < 03_align_markdup.lsf
# 5) gVCFs
bsub -q long -n 8 -W 08:00 -R 'span[hosts=1] rusage[mem=3]' -J "hc[1-$N]%24" < 04_hc_gvcf.lsf
# 6) Joint
bsub -q long -n 8 -W 08:00 -R 'span[hosts=1] rusage[mem=3]' < 05_joint_geno.lsf
# 7) Filter
bsub -q long -n 8 -W 02:00 -R 'span[hosts=1] rusage[mem=3]' < 06_filter_vcfs.lsf
# 8) MultiQC
multiqc -o fastqc_post fastqc_pre fastqc_post trim/reports
```

## Hazel-specific Notes

- Use queue `long` for these jobs.
- `rusage[mem=…]` units are **GB per core**. We use `mem=3` by default.
- Throttle big arrays with `%24` to start faster.
- Java tools are more stable with OpenJDK 11 and a local tmp directory:
  ```bash
  export _JAVA_OPTIONS="-Djava.io.tmpdir=$PWD/tmp/java -Xmx8g"
  ```

## LSF Templates
- 00_prep_ref.lsf — reference indexing
- 01_fastqc_pre.lsf — pre-trim QC
- 01b_fastqc_post.lsf — post-trim QC
- 02_fastp.lsf — trimming (array)
- 03_align_markdup.lsf — bwa-mem2 alignment (array)
- 03_align_minimap2.lsf — minimap2 alignment (array; cross-species)
- 04_hc_gvcf.lsf — HaplotypeCaller (array)
- 05_joint_geno.lsf — CombineGVCFs + GenotypeGVCFs
- 06_filter_vcfs.lsf — filtering to clean SNPs

## Troubleshooting
- **PEND with mem reason**: lower to `rusage[mem=3]` (or `2`), keep single-host; shorten wall time.
- **Java segfaults (FastQC/Picard/GATK)**: ensure `openjdk=11` and `_JAVA_OPTIONS` tmpdir.
- **MultiQC 'path not found'**: only include dirs that exist (omit `trim/reports` until fastp finishes).

© 2025-08-22 AIV project runbook.
