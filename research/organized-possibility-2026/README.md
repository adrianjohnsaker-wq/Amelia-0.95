# Organized Possibility — manuscript-derived data summaries (12 October 2026)

**Status: transparent summary archive, NOT a raw-data reproducibility package.**

This directory transcribes numerical evidence as reported in Adrian Saker, *Organized Possibility: How Directed Transition Topology and Path-Dependent Memory Constitute an Accessible State Space* (draft supplied 12 October 2026). These are historical summary values extracted from the manuscript, **not** independently rerun results. The repository does not provide the original per-step observations, exact seven-variable ProcessFieldMemory runtime snapshot, individual matrices from the historical 100-topology null ensemble, or the original Python analysis scripts. Claims requiring those files must not be presented as independently reproducible from this release.

Contents:
- `n0_transition_matrix.csv` — the fixed ten-zone N0 adjacency (Table 1).
- `u1_reference_configurations.csv` — the 18 reference classification triplets (Supplementary Table S1).
- `archived_access_and_benchmarks.csv` — reported access and benchmark summaries (Tables 2–7).
- `structural_null_summary.csv` — **aggregate** results for 100 topologies (Table 8); not 100 raw adjacency matrices.

The broader TypeScript/Firebase codebase is available in this repository, but an exact source-to-historical-results correspondence is **not verified**. In particular, public ProcessFieldMemory variants may not match the seven-field model described in the manuscript. The two Python scripts named in transfer notes, `generate_null_ensemble.py` and `analyze_null_distribution.py`, are **not included** in this release.

The historical N0–S0 comparison preserves number of nodes (10), directed edges (20), out-degree (2), and excludes self-loops; it does **not** preserve in-degree. The 100-topology results are structural graph diagnostics, not a dynamical null ensemble of access scores. U1's 18/18 score is true by construction of the U1-derived reference set.

**Re-use:** the transcribed data tables in this directory are offered under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/), with attribution to Adrian Saker. This notice does not license the remainder of the software repository. No code licence is asserted for the broader repository unless a root licence is added.

**Still needed for full audit:** exact experimental source commit, lockfile and parameters, implementation of seven-field PCM and regime classifier, 100 individual null-topology matrices and original seeds/algorithm, null-generation and analysis scripts, unmodified per-step JSON/CSV from 2000-step runs (first 200 discarded), complete 45- and 100-run benchmark histories, and SHA-256 manifest of original artifacts.
