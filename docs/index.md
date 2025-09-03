---
title: African_veg Workflows
layout: default
---

# African_veg Workflows

Step-by-step usage of the HPC pipelines.

## Quick start
1. Set `PROJ_ROOT=/share/africanveg/gwnjeri/AIV_project`.
2. Navigate to a species folder.
3. Submit LSF jobs using templates in `lsf_templates/`.

## Pipelines
- 03 Align + MarkDuplicates
- 03fix Repair RG/MD if needed
- 04–06 Variant calling and joint genotyping
- 07–08 Filtering, PCA, relatedness

## Notes
- Compute nodes have no internet → prebuild or conda-pack envs.
- PCA labels use `meta/<species>_sample_map.tsv` with `sampleID` and `Entryname`.

More details in the README.
