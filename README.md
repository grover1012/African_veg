# African_veg: HPC-ready variant analysis workflows

## What this project does
LSF templates and documentation to run alignment, variant calling, filtering, and PCA/relatedness for multiple African vegetable species on HPC.

## Scope
- Inputs: demultiplexed FASTQ, species manifests.
- Steps: QC, align, mark-duplicates, joint genotyping, filtering, PCA/IBD.
- Outputs: curated VCFs and figures (not tracked in repo).

## Design
- Templates decoupled from data paths via \$PROJ_ROOT.
- Prebuilt Conda envs to avoid network on compute nodes.
- Per-step logs for auditing.

## Docs
See the site: https://grover1012.github.io/African_veg/
