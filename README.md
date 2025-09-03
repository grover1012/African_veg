# African_veg: HPC-ready variant analysis workflows

## Overview
Self-contained runbook for species-wise short-read variant discovery on NCSU Hazel (LSF). Includes copy-paste job scripts, correct Hazel resource flags (mem per core), and troubleshooting notes.  
Run scripts: https://grover1012.github.io/African_veg/

## Scope
- Inputs: demultiplexed FASTQ, species manifests.
- Steps: QC, align, mark-duplicates, joint genotyping, filtering, PCA/IBD.
- Outputs: curated VCFs and figures (not tracked in repo).
