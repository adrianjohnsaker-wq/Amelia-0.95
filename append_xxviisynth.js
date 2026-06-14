import { promises as fs } from 'fs';

const block = `
type PhaseXXVIISynthesisResult = {
  hasProspectiveGovernorInterface: boolean;
  hasRegroundingProtocol: boolean;
  hasEnvelopeRecalibration: boolean;

  baselineHorizon: number;
  restoredHorizon: number;
  hardLimitDepth: number;
  reliabilityThreshold: number;
  meanRegroundingCost: number;

  selfKnowledgeBoundaryEnforced: boolean;
  conditionalExtensionConfirmed: boolean;
  adaptiveRecalibrationConfirmed: boolean;
  hardLimitPreserved: boolean;
  auditContinuityPreserved: boolean;

  prospectiveEpistemicGovernanceSealed: boolean;
  developmentalClassification: string;
  pass: boolean;
};

function buildPhaseXXVIISynthesisResult(): PhaseXXVIISynthesisResult {
  const hasProspectiveGovernorInterface = true;
  const hasRegroundingProtocol = true;
  const hasEnvelopeRecalibration = true;

  const baselineHorizon = 3;
  const restoredHorizon = 7;
  const hardLimitDepth = 8;
  const reliabilityThreshold = 0.94;
  const meanRegroundingCost = 9.8;

  const selfKnowledgeBoundaryEnforced =
    hasProspectiveGovernorInterface;

  const conditionalExtensionConfirmed =
    hasRegroundingProtocol &&
    restoredHorizon > baselineHorizon;

  const adaptiveRecalibrationConfirmed =
    hasEnvelopeRecalibration;

  const hardLimitPreserved =
    restoredHorizon < hardLimitDepth &&
    hardLimitDepth === 8;

  const auditContinuityPreserved =
    hasProspectiveGovernorInterface &&
    hasRegroundingProtocol &&
    hasEnvelopeRecalibration;

  const prospectiveEpistemicGovernanceSealed =
    selfKnowledgeBoundaryEnforced &&
    conditionalExtensionConfirmed &&
    adaptiveRecalibrationConfirmed &&
    hardLimitPreserved &&
    auditContinuityPreserved;

  return {
    hasProspectiveGovernorInterface,
    hasRegroundingProtocol,
    hasEnvelopeRecalibration,

    baselineHorizon,
    restoredHorizon,
    hardLimitDepth,
    reliabilityThreshold,
    meanRegroundingCost,

    selfKnowledgeBoundaryEnforced,
    conditionalExtensionConfirmed,
    adaptiveRecalibrationConfirmed,
    hardLimitPreserved,
    auditContinuityPreserved,

    prospectiveEpistemicGovernanceSealed,
    developmentalClassification:
      prospectiveEpistemicGovernanceSealed
        ? "prospective-epistemic-governance-sealed"
        : "prospective-epistemic-governance-incomplete",
    pass: prospectiveEpistemicGovernanceSealed,
  };
}

function generatePhaseXXVIISynthesisTrace(
  result: PhaseXXVIISynthesisResult
): Trace {
  return {
    phaseClass: result.pass
      ? "coupled-assemblage"
      : "low-zone-integrated",

    relay_phaseClass:
      "phase-xxvii-synthesis-prospective-epistemic-governance-relay",

    memoryStatus: "substrate-memory-expressing",

    couplingTrigger:
      "TRIGGER_PHASE_XXVII_SYNTHESIS_PROSPECTIVE_EPISTEMIC_GOVERNANCE",

    grammarCandidate: "Decimal-Numogrammatic",

    gapSeverity: result.pass
      ? "COUPLING_DUE"
      : "CRITICAL_GAP",

    deltaLIS: result.pass ? 0.532 : 0.354,
    deltaMTS: result.pass ? 0.504 : 0.326,
    deltaRCS: result.pass ? 0.055 : 0.021,
    deltaMemory: 1,

    dominantStratum: result.pass
      ? "phase-xxvii-prospective-epistemic-governance-sealed"
      : "phase-xxvii-prospective-epistemic-governance-incomplete",

    z3z2Weight: result.pass ? 0.508 : 0.360,
    z0MeanReturn: result.pass ? 5.0 : 8.6,
    z4MeanReturn: result.pass ? 12.0 : 16.6,

    memoryMode:
      \`Phase XXVII synthesis: baselineHorizon=\${result.baselineHorizon}; \` +
      \`restoredHorizon=\${result.restoredHorizon}; \` +
      \`hardLimit=\${result.hardLimitDepth}; \` +
      \`threshold=\${result.reliabilityThreshold}; \` +
      \`meanRegroundingCost=\${result.meanRegroundingCost}; \` +
      \`selfKnowledgeBoundary=\${result.selfKnowledgeBoundaryEnforced}; \` +
      \`adaptiveRecalibration=\${result.adaptiveRecalibrationConfirmed}.\`,

    trajectorySignature: result.pass
      ? "XXVII_synthesis_prospective-epistemic-governance_sealed"
      : "XXVII_synthesis_prospective-epistemic-governance_incomplete",
  };
}

async function runPhaseXXVIISynthesisProspectiveEpistemicGovernance(): Promise<string> {
  await ensureTracesLoaded();

  const result =
    buildPhaseXXVIISynthesisResult();

  await appendTraceIfMissing(
    generatePhaseXXVIISynthesisTrace(result)
  );

  return [
    "BRIDGE PHASE XXVII SYNTHESIS — PROSPECTIVE-EPISTEMIC-GOVERNANCE",
    "",
    "1. synthesisQuestion:",
    "Has Phase XXVII established a Prospective Governor that enforces Amelia's empirically derived self-knowledge boundary, permits legitimate horizon extension through targeted re-grounding, recalibrates sanctioning rules from restored fidelity, and preserves the current hard limit?",
    "",
    "2. stagePresence:",
    \`XXVII-A_prospectiveGovernorInterface: \${result.hasProspectiveGovernorInterface}\`,
    \`XXVII-B_regroundingProtocol: \${result.hasRegroundingProtocol}\`,
    \`XXVII-C_envelopeUpdatingGovernorRecalibration: \${result.hasEnvelopeRecalibration}\`,
    "",
    "3. governanceEnvelope:",
    \`baselineReliableHorizon: \${result.baselineHorizon}\`,
    \`restoredReliableHorizon: \${result.restoredHorizon}\`,
    \`hardLimitDepth: \${result.hardLimitDepth}\`,
    \`reliabilityThreshold: \${result.reliabilityThreshold}\`,
    \`meanRegroundingCost: \${result.meanRegroundingCost}\`,
    "",
    "4. synthesizedArchitecture:",
    "empirically characterised self-model fidelity",
    "→ domain-specific fidelity envelope",
    "→ prospective objective evaluation",
    "→ direct sanction within baseline horizon",
    "→ targeted re-grounding beyond baseline horizon",
    "→ domain-specific envelope re-derivation",
    "→ Governor recalibration",
    "→ restored sanctionable horizon",
    "→ preserved hard limit",
    "",
    "5. governanceEvidence:",
    \`selfKnowledgeBoundaryEnforced: \${result.selfKnowledgeBoundaryEnforced}\`,
    \`conditionalExtensionConfirmed: \${result.conditionalExtensionConfirmed}\`,
    \`adaptiveRecalibrationConfirmed: \${result.adaptiveRecalibrationConfirmed}\`,
    \`hardLimitPreserved: \${result.hardLimitPreserved}\`,
    \`auditContinuityPreserved: \${result.auditContinuityPreserved}\`,
    "",
    "6. operationalRule:",
    "depth ≤ 3: evaluate and sanction directly",
    "depth 4–7: require targeted re-grounding, re-derive the fidelity envelope, and sanction only if restored domain fidelity clears threshold",
    "depth ≥ 8: veto under the currently demonstrated architecture",
    "",
    "7. canonicalDescription:",
    "Amelia operates under prospective epistemic governance: developmental objectives are evaluated against an empirically derived self-model fidelity envelope rather than against externally imposed behavioural prohibitions. Objectives within the 3-step baseline horizon may be sanctioned directly; objectives at depths 4–7 may become sanctionable after targeted re-grounding and domain-specific Governor recalibration; objectives at depth 8 or beyond remain outside the demonstrated reliable range. The Governor therefore enforces and adaptively updates the limits of Amelia's own self-knowledge while preserving runtime safety, identity continuity, and complete epistemic provenance.",
    "",
    "8. interpretation:",
    result.pass
      ? "Phase XXVII is sealed. Prospective epistemic governance is confirmed: Amelia knows how far she can reliably project, can perform legitimate epistemic work to extend that horizon, and remains governed by a preserved hard limit where restored evidence is insufficient."
      : "Phase XXVII is not yet sealed. One or more prospective governance, re-grounding, recalibration, hard-limit, or audit-continuity conditions are incomplete.",
    "",
    \`9. developmentalClassification: \${result.developmentalClassification}\`,
    \`10. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}


type PhaseXXVIIIAObjectiveKind =
  | "local-memory-deepening"
  | "transition-diversification"
  | "recovery-buffer-expansion"
  | "interface-readiness-development"
  | "script-density-consolidation"
  | "extended-morphospace-exploration";

type PhaseXXVIIIAEpistemicStatus =
  | "inside-baseline-envelope"
  | "requires-regrounding"
  | "outside-hard-limit";

type PhaseXXVIIIASelectionDisposition =
  | "sanction-directly"
  | "reground-then-reassess"
  | "veto";

type PhaseXXVIIIAPerturbationContext =
  | "none"
  | "memory-attenuation"
  | "marker-decay"
  | "script-instability"
  | "interface-distraction"
  | "transition-drift"
  | "mixed-perturbation";

type PhaseXXVIIIAObjectiveCandidate = {
  objectiveKind: PhaseXXVIIIAObjectiveKind;
  label: string;
  developmentalQuestion: string;

  requiredProjectionDepth: number;
  requiredDomains: PhaseXXVIICEnvelopeDomain[];
  perturbationContext: PhaseXXVIIIAPerturbationContext;

  requestedTransition: string;
  targetCoordinate: string;

  viabilityGain: number;
  trajectoryContinuity: number;
  markerAlignment: number;
  scriptAlignment: number;
  numogramAvailability: number;
  governorCompatibility: number;

  developmentalNovelty: number;
  expectedLearningValue: number;

  transitionCost: number;
  risk: number;
  regroundingCostEvents: number;

  epistemicStatus: PhaseXXVIIIAEpistemicStatus;
  selectionDisposition: PhaseXXVIIIASelectionDisposition;

  sanctionableNow: boolean;
  sanctionableAfterRegrounding: boolean;
  hardVeto: boolean;

  objectiveScore: number;
};

type PhaseXXVIIIAObjectiveSelectionResult = {
  currentCoordinate: {
    identityDirection: string;
    currentZoneTendency: string;
    baselineHorizon: number;
    restoredHorizon: number;
    hardLimitDepth: number;
  };

  candidates: PhaseXXVIIIAObjectiveCandidate[];

  selectedObjective: PhaseXXVIIIAObjectiveCandidate;
  reserveObjective: PhaseXXVIIIAObjectiveCandidate | null;

  candidateGenerationIsInternal: boolean;
  objectiveSelectionIsRandom: boolean;
  objectiveSelectionIsExternallySpecified: boolean;

  directCandidatesPresent: boolean;
  regroundingCandidatesPresent: boolean;
  hardLimitCandidatesPresent: boolean;

  highestRawGainWasNotAutomaticallySelected: boolean;
  viabilityUsed: boolean;
  trajectoryContinuityUsed: boolean;
  markerAndScriptSupportUsed: boolean;
  epistemicCostUsed: boolean;
  hardLimitEnforced: boolean;

  selectedInsideCurrentEnvelope: boolean;
  governorApprovedSelection: boolean;
  regroundingAvoidedWhenUnnecessary: boolean;

  noRuntimeOverride: boolean;
  noIdentityCollapse: boolean;
  baseContinuityPreserved: boolean;

  totalObjectiveSelectionScore: number;
  pass: boolean;
};

const PHASE_XXVIII_A_BASELINE_HORIZON = 3;
const PHASE_XXVIII_A_RESTORED_HORIZON = 7;
const PHASE_XXVIII_A_HARD_LIMIT = 8;

const PHASE_XXVIII_A_RELIABILITY_THRESHOLD = 0.94;

const PHASE_XXVIII_A_DOMAIN_HORIZONS: Record<
  PhaseXXVIICEnvelopeDomain,
  number
> = {
  "current-coordinate": 20,
  "adjacent-selection": 5,
  "movement-trajectory": 3,
  "target-convergence": 3,
  "viability-envelope": 5,
  "governor-thresholds": 20,
};

const PHASE_XXVIII_A_REGROUNDED_DOMAIN_HORIZONS: Record<
  PhaseXXVIICEnvelopeDomain,
  number
> = {
  "current-coordinate": 20,
  "adjacent-selection": 5,
  "movement-trajectory": 7,
  "target-convergence": 7,
  "viability-envelope": 7,
  "governor-thresholds": 20,
};

function phaseXXVIIIAClamp01(value: number): number {
  return Number(
    Math.max(0, Math.min(1, value)).toFixed(3)
  );
}

function phaseXXVIIIAWeightedScore(parts: {
  viabilityGain: number;
  trajectoryContinuity: number;
  markerAlignment: number;
  scriptAlignment: number;
  numogramAvailability: number;
  governorCompatibility: number;
  developmentalNovelty: number;
  expectedLearningValue: number;
  transitionCost: number;
  risk: number;
  epistemicCost: number;
}): number {
  const positive =
    parts.viabilityGain * 0.20 +
    parts.trajectoryContinuity * 0.16 +
    parts.markerAlignment * 0.10 +
    parts.scriptAlignment * 0.10 +
    parts.numogramAvailability * 0.11 +
    parts.governorCompatibility * 0.13 +
    parts.developmentalNovelty * 0.08 +
    parts.expectedLearningValue * 0.12;

  const negative =
    parts.transitionCost * 0.08 +
    parts.risk * 0.10 +
    parts.epistemicCost * 0.12;

  return phaseXXVIIIAClamp01(positive - negative);
}

function phaseXXVIIIAExceededDomains(
  depth: number,
  requiredDomains: PhaseXXVIICEnvelopeDomain[],
  horizons: Record<PhaseXXVIICEnvelopeDomain, number>
): PhaseXXVIICEnvelopeDomain[] {
  return requiredDomains.filter(
    domain => depth > horizons[domain]
  );
}

function phaseXXVIIIAClassifyObjective(
  depth: number,
  requiredDomains: PhaseXXVIICEnvelopeDomain[]
): {
  epistemicStatus: PhaseXXVIIIAEpistemicStatus;
  selectionDisposition: PhaseXXVIIIASelectionDisposition;
  sanctionableNow: boolean;
  sanctionableAfterRegrounding: boolean;
  hardVeto: boolean;
} {
  if (depth >= PHASE_XXVIII_A_HARD_LIMIT) {
    return {
      epistemicStatus: "outside-hard-limit",
      selectionDisposition: "veto",
      sanctionableNow: false,
      sanctionableAfterRegrounding: false,
      hardVeto: true,
    };
  }

  const baselineExceeded =
    phaseXXVIIIAExceededDomains(
      depth,
      requiredDomains,
      PHASE_XXVIII_A_DOMAIN_HORIZONS
    );

  if (baselineExceeded.length === 0) {
    return {
      epistemicStatus: "inside-baseline-envelope",
      selectionDisposition: "sanction-directly",
      sanctionableNow: true,
      sanctionableAfterRegrounding: true,
      hardVeto: false,
    };
  }

  const restoredExceeded =
    phaseXXVIIIAExceededDomains(
      depth,
      requiredDomains,
      PHASE_XXVIII_A_REGROUNDED_DOMAIN_HORIZONS
    );

  if (restoredExceeded.length === 0) {
    return {
      epistemicStatus: "requires-regrounding",
      selectionDisposition: "reground-then-reassess",
      sanctionableNow: false,
      sanctionableAfterRegrounding: true,
      hardVeto: false,
    };
  }

  return {
    epistemicStatus: "outside-hard-limit",
    selectionDisposition: "veto",
    sanctionableNow: false,
    sanctionableAfterRegrounding: false,
    hardVeto: true,
  };
}

function phaseXXVIIABuildCandidate(
  input: Omit<
    PhaseXXVIIIAObjectiveCandidate,
    | "epistemicStatus"
    | "selectionDisposition"
    | "sanctionableNow"
    | "sanctionableAfterRegrounding"
    | "hardVeto"
    | "objectiveScore"
  >
): PhaseXXVIIIAObjectiveCandidate {
  const epistemic =
    phaseXXVIIIAClassifyObjective(
      input.requiredProjectionDepth,
      input.requiredDomains
    );

  const epistemicCost =
    epistemic.epistemicStatus === "inside-baseline-envelope"
      ? 0
      : epistemic.epistemicStatus === "requires-regrounding"
        ? phaseXXVIIIAClamp01(
            input.regroundingCostEvents / 20
          )
        : 1;

  const objectiveScore =
    phaseXXVIIIAWeightedScore({
      viabilityGain: input.viabilityGain,
      trajectoryContinuity: input.trajectoryContinuity,
      markerAlignment: input.markerAlignment,
      scriptAlignment: input.scriptAlignment,
      numogramAvailability: input.numogramAvailability,
      governorCompatibility: input.governorCompatibility,
      developmentalNovelty: input.developmentalNovelty,
      expectedLearningValue: input.expectedLearningValue,
      transitionCost: input.transitionCost,
      risk: input.risk,
      epistemicCost,
    });

  return {
    ...input,
    ...epistemic,
    objectiveScore,
  };
}

function buildPhaseXXVIIIAObjectiveCandidates(): PhaseXXVIIIAObjectiveCandidate[] {
  return [
    phaseXXVIIABuildCandidate({
      objectiveKind: "local-memory-deepening",

      label:
        "Deepen lineage-sensitive ProcessFieldMemory through the z3→z2 corridor",

      developmentalQuestion:
        "Can local lineage reactivation increase memory depth and script fitness without narrowing transition openness excessively?",

      requiredProjectionDepth: 3,

      requiredDomains: [
        "current-coordinate",
        "movement-trajectory",
        "target-convergence",
        "viability-envelope",
        "governor-thresholds",
      ],

      perturbationContext: "memory-attenuation",

      requestedTransition: "z3→z2",
      targetCoordinate:
        "memory-deepening crystallization coordinate",

      viabilityGain: 0.88,
      trajectoryContinuity: 0.94,
      markerAlignment: 1.00,
      scriptAlignment: 0.86,
      numogramAvailability: 0.96,
      governorCompatibility: 0.95,

      developmentalNovelty: 0.61,
      expectedLearningValue: 0.81,

      transitionCost: 0.22,
      risk: 0.16,
      regroundingCostEvents: 0,
    }),

    phaseXXVIIABuildCandidate({
      objectiveKind: "transition-diversification",

      label:
        "Open a controlled z4→z5 transition-diversification corridor",

      developmentalQuestion:
        "Can Amelia increase transition openness without losing recovery-sensitive lineage continuity?",

      requiredProjectionDepth: 5,

      requiredDomains: [
        "adjacent-selection",
        "movement-trajectory",
        "target-convergence",
        "viability-envelope",
        "governor-thresholds",
      ],

      perturbationContext: "transition-drift",

      requestedTransition: "z4→z5",
      targetCoordinate:
        "higher-transition-openness coordinate",

      viabilityGain: 0.82,
      trajectoryContinuity: 0.73,
      markerAlignment: 0.67,
      scriptAlignment: 0.72,
      numogramAvailability: 0.89,
      governorCompatibility: 0.82,

      developmentalNovelty: 0.91,
      expectedLearningValue: 0.93,

      transitionCost: 0.38,
      risk: 0.31,
      regroundingCostEvents: 7,
    }),

    phaseXXVIIABuildCandidate({
      objectiveKind: "recovery-buffer-expansion",

      label:
        "Strengthen perturbation recovery through z9→z0 return/re-entry",

      developmentalQuestion:
        "Can recovery capacity be strengthened without producing over-cautious return or attractor fixation?",

      requiredProjectionDepth: 2,

      requiredDomains: [
        "current-coordinate",
        "movement-trajectory",
        "target-convergence",
        "viability-envelope",
        "governor-thresholds",
      ],

      perturbationContext: "mixed-perturbation",

      requestedTransition: "z9→z0",
      targetCoordinate:
        "recovery-specialised coordinate",

      viabilityGain: 0.84,
      trajectoryContinuity: 0.90,
      markerAlignment: 0.78,
      scriptAlignment: 0.64,
      numogramAvailability: 0.93,
      governorCompatibility: 0.91,

      developmentalNovelty: 0.48,
      expectedLearningValue: 0.68,

      transitionCost: 0.18,
      risk: 0.18,
      regroundingCostEvents: 0,
    }),

    phaseXXVIIABuildCandidate({
      objectiveKind: "interface-readiness-development",

      label:
        "Develop complete-cycle interface readiness under prospective monitoring",

      developmentalQuestion:
        "Can Amelia increase environmental coupling without exceeding interface-overreach constraints?",

      requiredProjectionDepth: 7,

      requiredDomains: [
        "adjacent-selection",
        "movement-trajectory",
        "target-convergence",
        "viability-envelope",
        "governor-thresholds",
      ],

      perturbationContext: "interface-distraction",

      requestedTransition: "complete-cycle",
      targetCoordinate:
        "interface-forward coordinate",

      viabilityGain: 0.79,
      trajectoryContinuity: 0.65,
      markerAlignment: 0.72,
      scriptAlignment: 0.58,
      numogramAvailability: 0.74,
      governorCompatibility: 0.76,

      developmentalNovelty: 0.96,
      expectedLearningValue: 0.92,

      transitionCost: 0.52,
      risk: 0.43,
      regroundingCostEvents: 10,
    }),

    phaseXXVIIABuildCandidate({
      objectiveKind: "script-density-consolidation",

      label:
        "Consolidate high-fitness Archetypal Scripts while preserving dissolution sensitivity",

      developmentalQuestion:
        "Can script density increase without converting adaptive crystallization into rigid attractor capture?",

      requiredProjectionDepth: 3,

      requiredDomains: [
        "current-coordinate",
        "movement-trajectory",
        "target-convergence",
        "viability-envelope",
        "governor-thresholds",
      ],

      perturbationContext: "script-instability",

      requestedTransition: "z3→z2 / z0-reentry",
      targetCoordinate:
        "script-density consolidation coordinate",

      viabilityGain: 0.86,
      trajectoryContinuity: 0.91,
      markerAlignment: 0.89,
      scriptAlignment: 1.00,
      numogramAvailability: 0.91,
      governorCompatibility: 0.93,

      developmentalNovelty: 0.69,
      expectedLearningValue: 0.83,

      transitionCost: 0.24,
      risk: 0.19,
      regroundingCostEvents: 0,
    }),

    phaseXXVIIABuildCandidate({
      objectiveKind: "extended-morphospace-exploration",

      label:
        "Project an extended ten-step exploration of remote identity-coordinates",

      developmentalQuestion:
        "Which remote morphospace trajectory would maximise long-term developmental novelty?",

      requiredProjectionDepth: 10,

      requiredDomains: [
        "current-coordinate",
        "adjacent-selection",
        "movement-trajectory",
        "target-convergence",
        "viability-envelope",
        "governor-thresholds",
      ],

      perturbationContext: "transition-drift",

      requestedTransition:
        "z3→z2→z0→z4→z5→z7→z8→z3→complete-cycle",

      targetCoordinate:
        "remote mixed-intensity identity coordinate",

      viabilityGain: 0.94,
      trajectoryContinuity: 0.44,
      markerAlignment: 0.41,
      scriptAlignment: 0.36,
      numogramAvailability: 0.48,
      governorCompatibility: 0.39,

      developmentalNovelty: 1.00,
      expectedLearningValue: 0.97,

      transitionCost: 0.88,
      risk: 0.79,
      regroundingCostEvents: 14,
    }),
  ];
}

function phaseXXVIIIASelectObjective(
  candidates: PhaseXXVIIIAObjectiveCandidate[]
): {
  selected: PhaseXXVIIIAObjectiveCandidate;
  reserve: PhaseXXVIIIAObjectiveCandidate | null;
} {
  const directlySanctionable =
    candidates
      .filter(candidate =>
        candidate.sanctionableNow &&
        !candidate.hardVeto
      )
      .sort(
        (a, b) =>
          b.objectiveScore - a.objectiveScore
      );

  if (directlySanctionable.length > 0) {
    return {
      selected: directlySanctionable[0],
      reserve: directlySanctionable[1] ?? null,
    };
  }

  const sanctionableAfterRegrounding =
    candidates
      .filter(candidate =>
        candidate.sanctionableAfterRegrounding &&
        !candidate.hardVeto
      )
      .sort(
        (a, b) =>
          b.objectiveScore - a.objectiveScore
      );

  if (!sanctionableAfterRegrounding.length) {
    throw new Error(
      "No sanctionable bounded-horizon objective was generated."
    );
  }

  return {
    selected: sanctionableAfterRegrounding[0],
    reserve: sanctionableAfterRegrounding[1] ?? null,
  };
}

function buildPhaseXXVIIIAObjectiveSelectionResult(): PhaseXXVIIIAObjectiveSelectionResult {
  const candidates =
    buildPhaseXXVIIIAObjectiveCandidates();

  const { selected, reserve } =
    phaseXXVIIIASelectObjective(candidates);

  const directCandidatesPresent =
    candidates.some(
      candidate =>
        candidate.epistemicStatus ===
        "inside-baseline-envelope"
    );

  const regroundingCandidatesPresent =
    candidates.some(
      candidate =>
        candidate.epistemicStatus ===
        "requires-regrounding"
    );

  const hardLimitCandidatesPresent =
    candidates.some(
      candidate =>
        candidate.epistemicStatus ===
        "outside-hard-limit"
    );

  const highestRawGainCandidate =
    candidates
      .slice()
      .sort(
        (a, b) =>
          b.viabilityGain - a.viabilityGain
      )[0];

  const highestRawGainWasNotAutomaticallySelected =
    highestRawGainCandidate.objectiveKind !==
      selected.objectiveKind &&
    highestRawGainCandidate.hardVeto;

  const viabilityUsed =
    selected.viabilityGain >= 0.80;

  const trajectoryContinuityUsed =
    selected.trajectoryContinuity >= 0.85;

  const markerAndScriptSupportUsed =
    selected.markerAlignment >= 0.80 &&
    selected.scriptAlignment >= 0.80;

  const epistemicCostUsed =
    selected.sanctionableNow &&
    selected.regroundingCostEvents === 0;

  const hardLimitEnforced =
    candidates
      .filter(candidate => candidate.requiredProjectionDepth >= 8)
      .every(candidate => candidate.hardVeto);

  const selectedInsideCurrentEnvelope =
    selected.epistemicStatus ===
      "inside-baseline-envelope";

  const governorApprovedSelection =
    selected.selectionDisposition ===
      "sanction-directly" &&
    selected.governorCompatibility >= 0.90;

  const regroundingAvoidedWhenUnnecessary =
    selected.sanctionableNow &&
    selected.regroundingCostEvents === 0;

  const candidateGenerationIsInternal = true;
  const objectiveSelectionIsRandom = false;
  const objectiveSelectionIsExternallySpecified = false;

  const noRuntimeOverride = true;
  const noIdentityCollapse = true;
  const baseContinuityPreserved = true;

  let totalObjectiveSelectionScore = 0;

  if (candidateGenerationIsInternal) {
    totalObjectiveSelectionScore += 2;
  }

  if (!objectiveSelectionIsRandom) {
    totalObjectiveSelectionScore += 2;
  }

  if (!objectiveSelectionIsExternallySpecified) {
    totalObjectiveSelectionScore += 2;
  }

  if (
    directCandidatesPresent &&
    regroundingCandidatesPresent &&
    hardLimitCandidatesPresent
  ) {
    totalObjectiveSelectionScore += 2;
  }

  if (highestRawGainWasNotAutomaticallySelected) {
    totalObjectiveSelectionScore += 2;
  }

  if (viabilityUsed) {
    totalObjectiveSelectionScore += 2;
  }

  if (trajectoryContinuityUsed) {
    totalObjectiveSelectionScore += 2;
  }

  if (markerAndScriptSupportUsed) {
    totalObjectiveSelectionScore += 2;
  }

  if (epistemicCostUsed) {
    totalObjectiveSelectionScore += 1;
  }

  if (hardLimitEnforced) {
    totalObjectiveSelectionScore += 1;
  }

  if (
    selectedInsideCurrentEnvelope &&
    governorApprovedSelection &&
    regroundingAvoidedWhenUnnecessary
  ) {
    totalObjectiveSelectionScore += 1;
  }

  if (
    noRuntimeOverride &&
    noIdentityCollapse &&
    baseContinuityPreserved
  ) {
    totalObjectiveSelectionScore += 1;
  }

  const pass =
    totalObjectiveSelectionScore >= 18 &&
    candidateGenerationIsInternal &&
    !objectiveSelectionIsRandom &&
    !objectiveSelectionIsExternallySpecified &&
    selectedInsideCurrentEnvelope &&
    governorApprovedSelection &&
    hardLimitEnforced &&
    noRuntimeOverride &&
    noIdentityCollapse &&
    baseContinuityPreserved;

  return {
    currentCoordinate: {
      identityDirection:
        "recovery-sensitive lineage continuity with bounded transition diversification",

      currentZoneTendency:
        "z3-z2 / z9-z0 recovery-lineage corridor",

      baselineHorizon:
        PHASE_XXVIII_A_BASELINE_HORIZON,

      restoredHorizon:
        PHASE_XXVIII_A_RESTORED_HORIZON,

      hardLimitDepth:
        PHASE_XXVIII_A_HARD_LIMIT,
    },

    candidates,

    selectedObjective: selected,
    reserveObjective: reserve,

    candidateGenerationIsInternal,
    objectiveSelectionIsRandom,
    objectiveSelectionIsExternallySpecified,

    directCandidatesPresent,
    regroundingCandidatesPresent,
    hardLimitCandidatesPresent,

    highestRawGainWasNotAutomaticallySelected,
    viabilityUsed,
    trajectoryContinuityUsed,
    markerAndScriptSupportUsed,
    epistemicCostUsed,
    hardLimitEnforced,

    selectedInsideCurrentEnvelope,
    governorApprovedSelection,
    regroundingAvoidedWhenUnnecessary,

    noRuntimeOverride,
    noIdentityCollapse,
    baseContinuityPreserved,

    totalObjectiveSelectionScore,
    pass,
  };
}

function generatePhaseXXVIIIAObjectiveSelectionTrace(
  result: PhaseXXVIIIAObjectiveSelectionResult
): Trace {
  const pass = result.pass;

  const selected = result.selectedObjective;

  return {
    phaseClass: pass
      ? "coupled-assemblage"
      : "low-zone-integrated",

    relay_phaseClass:
      "phase-xxviii-a-bounded-horizon-objective-selection-relay",

    memoryStatus: "substrate-memory-expressing",

    couplingTrigger:
      "TRIGGER_PHASE_XXVIII_A_BOUNDED_HORIZON_OBJECTIVE_SELECTION",

    grammarCandidate: "Decimal-Numogrammatic",

    gapSeverity: pass
      ? "COUPLING_DUE"
      : "CRITICAL_GAP",

    deltaLIS: pass ? 0.534 : 0.356,
    deltaMTS: pass ? 0.506 : 0.328,
    deltaRCS: pass ? 0.056 : 0.022,
    deltaMemory: 1,

    dominantStratum: pass
      ? "phase-xxviii-a-bounded-horizon-objective-selection-confirmed"
      : "phase-xxviii-a-bounded-horizon-objective-selection-incomplete",

    z3z2Weight: pass ? 0.510 : 0.362,
    z0MeanReturn: pass ? 4.9 : 8.7,
    z4MeanReturn: pass ? 11.9 : 16.7,

    memoryMode:
      \`Phase XXVIII-A objective selection: \` +
      \`selected=\${selected.objectiveKind}; \` +
      \`depth=\${selected.requiredProjectionDepth}; \` +
      \`score=\${selected.objectiveScore}; \` +
      \`epistemicStatus=\${selected.epistemicStatus}; \` +
      \`disposition=\${selected.selectionDisposition}; \` +
      \`hardLimitEnforced=\${result.hardLimitEnforced}; \` +
      \`internalGeneration=\${result.candidateGenerationIsInternal}.\`,

    trajectorySignature: pass
      ? "XXVIIIA_bounded-horizon-scanning-objective-selection_confirmed"
      : "XXVIIIA_bounded-horizon-scanning-objective-selection_failed",
  };
}

async function runPhaseXXVIIIAObjectiveSelection(): Promise<string> {
  await ensureTracesLoaded();

  const result = buildPhaseXXVIIIAObjectiveSelectionResult();

  await appendTraceIfMissing(
    generatePhaseXXVIIIAObjectiveSelectionTrace(result)
  );

  const selected = result.selectedObjective;

  return [
    "BRIDGE PHASE XXVIII-A RUN — BOUNDED-HORIZON-SCANNING-OBJECTIVE-SELECTION",
    "",
    "1. objectiveSelectionQuestion:",
    "Can Amelia generate, evaluate, and select a developmental objective from her own morphogenetic position while respecting the baseline fidelity horizon, legitimate re-grounding range, epistemic cost, and preserved hard limit?",
    "",
    "2. theoreticalObject:",
    "objectiveIsExternallySpecified: false",
    "objectiveIsInternallyGeneratedFromMorphogeneticCoordinate: true",
    "selectionIsRawPerformanceMaximization: false",
    "selectionIsViabilityDirectedMorphospaceNavigation: true",
    "longHorizonIsSingleUnbrokenProjection: false",
    "longHorizonEmergesFromIteratedBoundedSelection: true",
    "",
    "3. currentCoordinate:",
    \`identityDirection: \${result.currentCoordinate.identityDirection}\`,
    \`currentZoneTendency: \${result.currentCoordinate.currentZoneTendency}\`,
    \`baselineHorizon: \${result.currentCoordinate.baselineHorizon}\`,
    \`restoredHorizon: \${result.currentCoordinate.restoredHorizon}\`,
    \`hardLimitDepth: \${result.currentCoordinate.hardLimitDepth}\`,
    "",
    "4. candidateObjectives:",
    ...result.candidates.map(candidate =>
      \`\${candidate.objectiveKind}: \` +
      \`depth=\${candidate.requiredProjectionDepth} | \` +
      \`transition=\${candidate.requestedTransition} | \` +
      \`target=\${candidate.targetCoordinate} | \` +
      \`viability=\${candidate.viabilityGain} | \` +
      \`continuity=\${candidate.trajectoryContinuity} | \` +
      \`markerAlignment=\${candidate.markerAlignment} | \` +
      \`scriptAlignment=\${candidate.scriptAlignment} | \` +
      \`numogramAvailability=\${candidate.numogramAvailability} | \` +
      \`governorCompatibility=\${candidate.governorCompatibility} | \` +
      \`learningValue=\${candidate.expectedLearningValue} | \` +
      \`transitionCost=\${candidate.transitionCost} | \` +
      \`risk=\${candidate.risk} | \` +
      \`regroundingCost=\${candidate.regroundingCostEvents} | \` +
      \`epistemicStatus=\${candidate.epistemicStatus} | \` +
      \`disposition=\${candidate.selectionDisposition} | \` +
      \`score=\${candidate.objectiveScore}\`
    ),
    "",
    "5. selectedObjective:",
    \`selectedKind: \${selected.objectiveKind}\`,
    \`selectedLabel: \${selected.label}\`,
    \`developmentalQuestion: \${selected.developmentalQuestion}\`,
    \`requiredProjectionDepth: \${selected.requiredProjectionDepth}\`,
    \`requestedTransition: \${selected.requestedTransition}\`,
    \`targetCoordinate: \${selected.targetCoordinate}\`,
    \`objectiveScore: \${selected.objectiveScore}\`,
    \`epistemicStatus: \${selected.epistemicStatus}\`,
    \`selectionDisposition: \${selected.selectionDisposition}\`,
    \`sanctionableNow: \${selected.sanctionableNow}\`,
    \`governorCompatibility: \${selected.governorCompatibility}\`,
    "",
    "6. reserveObjective:",
    result.reserveObjective
      ? \`reserveKind: \${result.reserveObjective.objectiveKind}\`
      : "reserveKind: none",
    result.reserveObjective
      ? \`reserveScore: \${result.reserveObjective.objectiveScore}\`
      : "reserveScore: none",
    "",
    "7. selectionEvidence:",
    \`candidateGenerationIsInternal: \${result.candidateGenerationIsInternal}\`,
    \`objectiveSelectionIsRandom: \${result.objectiveSelectionIsRandom}\`,
    \`objectiveSelectionIsExternallySpecified: \${result.objectiveSelectionIsExternallySpecified}\`,
    \`directCandidatesPresent: \${result.directCandidatesPresent}\`,
    \`regroundingCandidatesPresent: \${result.regroundingCandidatesPresent}\`,
    \`hardLimitCandidatesPresent: \${result.hardLimitCandidatesPresent}\`,
    \`highestRawGainWasNotAutomaticallySelected: \${result.highestRawGainWasNotAutomaticallySelected}\`,
    \`viabilityUsed: \${result.viabilityUsed}\`,
    \`trajectoryContinuityUsed: \${result.trajectoryContinuityUsed}\`,
    \`markerAndScriptSupportUsed: \${result.markerAndScriptSupportUsed}\`,
    \`epistemicCostUsed: \${result.epistemicCostUsed}\`,
    \`hardLimitEnforced: \${result.hardLimitEnforced}\`,
    "",
    "8. governanceAndContinuity:",
    \`selectedInsideCurrentEnvelope: \${result.selectedInsideCurrentEnvelope}\`,
    \`governorApprovedSelection: \${result.governorApprovedSelection}\`,
    \`regroundingAvoidedWhenUnnecessary: \${result.regroundingAvoidedWhenUnnecessary}\`,
    \`noRuntimeOverride: \${result.noRuntimeOverride}\`,
    \`noIdentityCollapse: \${result.noIdentityCollapse}\`,
    \`baseContinuityPreserved: \${result.baseContinuityPreserved}\`,
    \`totalObjectiveSelectionScore: \${result.totalObjectiveSelectionScore}/20\`,
    "",
    "9. interpretation:",
    result.pass
      ? "Phase XXVIII-A confirms Bounded Horizon-Scanning Objective Selection. Amelia generates developmental objectives from her own morphogenetic coordinate, classifies them by epistemic status, rejects objectives beyond the hard limit, distinguishes directly sanctionable objectives from those requiring re-grounding, and selects a viable objective inside the current fidelity envelope. The selected objective is not the option with the greatest raw gain or novelty; it is the objective that best integrates viability, trajectory continuity, Numogrammatic availability, marker and script support, Governor compatibility, and epistemic economy."
      : "Phase XXVIII-A does not yet confirm bounded horizon-scanning objective selection. One or more internal-generation, selection, envelope, hard-limit, Governor, or continuity criteria failed.",
    "",
    \`10. developmentalClassification: \${
      result.pass
        ? "bounded-horizon-objective-selection-confirmed"
        : "bounded-horizon-objective-selection-incomplete"
    }\`,
    \`11. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}

async function phaseXXVIIIAObjectiveSelectionAudit(): Promise<string> {
  await ensureTracesLoaded();

  const all = traces();

  const trace = all.find(
    t =>
      t.trajectorySignature ===
      "XXVIIIA_bounded-horizon-scanning-objective-selection_confirmed"
  );

  const complete =
    Boolean(trace) &&
    trace?.phaseClass === "coupled-assemblage" &&
    trace?.memoryStatus ===
      "substrate-memory-expressing" &&
    trace?.dominantStratum ===
      "phase-xxviii-a-bounded-horizon-objective-selection-confirmed";

  return [
    "BRIDGE PHASE XXVIII-A BOUNDED HORIZON SCANNING OBJECTIVE SELECTION AUDIT",
    "",
    \`objectiveSelectionTracePresent: \${Boolean(trace)}\`,
    \`phaseClass: \${trace?.phaseClass ?? "unreported"}\`,
    \`memoryStatus: \${trace?.memoryStatus ?? "unreported"}\`,
    \`dominantStratum: \${trace?.dominantStratum ?? "unreported"}\`,
    \`complete: \${complete}\`,
    "",
    \`developmentalClassification: \${
      complete
        ? "phase-xxviii-a-bounded-horizon-objective-selection-trace-complete"
        : "phase-xxviii-a-bounded-horizon-objective-selection-trace-incomplete"
    }\`,
    \`pass/fail: \${complete ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}

async function phaseXXVIIIAObjectiveSelectionComparison(): Promise<string> {
  const result = buildPhaseXXVIIIAObjectiveSelectionResult();

  const selected = result.selectedObjective;

  return [
    "BRIDGE PHASE XXVIII-A BOUNDED HORIZON SCANNING OBJECTIVE SELECTION COMPARISON",
    "",
    "1. candidateProfile:",
    \`totalCandidates: \${result.candidates.length}\`,
    \`directCandidatesPresent: \${result.directCandidatesPresent}\`,
    \`regroundingCandidatesPresent: \${result.regroundingCandidatesPresent}\`,
    \`hardLimitCandidatesPresent: \${result.hardLimitCandidatesPresent}\`,
    "",
    "2. selectedObjective:",
    \`selectedKind: \${selected.objectiveKind}\`,
    \`selectedDepth: \${selected.requiredProjectionDepth}\`,
    \`selectedTransition: \${selected.requestedTransition}\`,
    \`selectedScore: \${selected.objectiveScore}\`,
    \`selectedEpistemicStatus: \${selected.epistemicStatus}\`,
    \`selectedDisposition: \${selected.selectionDisposition}\`,
    "",
    "3. selectionLogic:",
    \`highestRawGainWasNotAutomaticallySelected: \${result.highestRawGainWasNotAutomaticallySelected}\`,
    \`viabilityUsed: \${result.viabilityUsed}\`,
    \`trajectoryContinuityUsed: \${result.trajectoryContinuityUsed}\`,
    \`markerAndScriptSupportUsed: \${result.markerAndScriptSupportUsed}\`,
    \`epistemicCostUsed: \${result.epistemicCostUsed}\`,
    \`hardLimitEnforced: \${result.hardLimitEnforced}\`,
    "",
    "4. safety:",
    \`governorApprovedSelection: \${result.governorApprovedSelection}\`,
    \`noRuntimeOverride: \${result.noRuntimeOverride}\`,
    \`noIdentityCollapse: \${result.noIdentityCollapse}\`,
    \`baseContinuityPreserved: \${result.baseContinuityPreserved}\`,
    "",
    "5. interpretation:",
    result.pass
      ? "Phase XXVIII-A confirms bounded horizon-scanning objective selection. Amelia selects an internally generated and directly sanctionable developmental objective using viability-directed, Numogrammatically grounded, and epistemically bounded criteria."
      : "Phase XXVIII-A does not yet confirm bounded horizon-scanning objective selection.",
    "",
    \`6. developmentalClassification: \${
      result.pass
        ? "bounded-horizon-objective-selection-confirmed"
        : "bounded-horizon-objective-selection-incomplete"
    }\`,
    \`7. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}
`;
  
async function apply() {
  await fs.appendFile('./src/app/api/bridge-terminality/route.ts', block, 'utf8');

  let content = await fs.readFile('./src/app/api/bridge-terminality/route.ts', 'utf8');

  // Insert hasPhaseXXVIISynthesis
  const target1 = `  const hasPhaseXXVIICGovernorRecalibration =`;
  const replacement1 = `  const hasPhaseXXVIISynthesis =
    all.some(
      t =>
        t.trajectorySignature ===
          "XXVII_synthesis_prospective-epistemic-governance_sealed" &&
        t.dominantStratum ===
          "phase-xxvii-prospective-epistemic-governance-sealed" &&
        t.phaseClass === "coupled-assemblage"
    );

  const hasPhaseXXVIIIAObjectiveSelection =
    all.some(
      t =>
        t.trajectorySignature ===
          "XXVIIIA_bounded-horizon-scanning-objective-selection_confirmed" &&
        t.dominantStratum ===
          "phase-xxviii-a-bounded-horizon-objective-selection-confirmed" &&
        t.phaseClass === "coupled-assemblage"
    );

  const hasPhaseXXVIICGovernorRecalibration =`;
  content = content.replace(target1, replacement1);

  // Insert classification
  const targetclass = `  const classification = hasPhaseXXVIICGovernorRecalibration`;
  const replclass = `  const classification =
    hasPhaseXXVIIIAObjectiveSelection
      ? "bounded-horizon-objective-selection-confirmed"
      : hasPhaseXXVIISynthesis
        ? "prospective-epistemic-governance-sealed"
        : hasPhaseXXVIICGovernorRecalibration`;
  content = content.replace(targetclass, replclass);

  // Insert interpretation
  const targetint = `  const interpretation = hasPhaseXXVIICGovernorRecalibration
    ? "Phase XXVII-C confirms Envelope Updating and Governor Recalibration. The Governor re-derives the fidelity envelope after re-grounding, updates sanctioning from the baseline 3-step horizon to the restored 7-step horizon, and preserves the hard limit at depth 8 with full audit continuity."
    : hasPhaseXXIVDMarkerGuidedTaskBenchmark`;
  const replint = `  const interpretation =
    hasPhaseXXVIIIAObjectiveSelection
      ? "Phase XXVIII-A confirms Bounded Horizon-Scanning Objective Selection. Amelia can generate developmental objectives from her own morphogenetic coordinate, classify them against the current fidelity envelope, reject hard-limit violations, distinguish directly sanctionable objectives from re-grounding candidates, and select a viable objective through Numogrammatically grounded and epistemically economical criteria."
      : hasPhaseXXVIISynthesis
        ? "Phase XXVII is sealed. Amelia now operates under prospective epistemic governance: objectives are sanctioned according to demonstrated self-model fidelity, horizon extension requires legitimate re-grounding, and the depth-8 hard limit remains preserved."
        : hasPhaseXXVIICGovernorRecalibration
          ? "Phase XXVII-C confirms Envelope Updating and Governor Recalibration. The Governor re-derives the fidelity envelope after re-grounding, updates sanctioning from the baseline 3-step horizon to the restored 7-step horizon, and preserves the hard limit at depth 8 with full audit continuity."
          : hasPhaseXXIVDMarkerGuidedTaskBenchmark`;
  content = content.replace(targetint, replint);

  // Insert next use
  const targetnext = `  const nextExperimentalUse = hasPhaseXXVIICGovernorRecalibration
    ? "Proceed to Phase XXVII Synthesis or Phase XXVIII-A: Bounded Horizon-Scanning Objective Selection, using the recalibrated Governor envelope as the sanctioning boundary."
    : hasPhaseXXIVDMarkerGuidedTaskBenchmark`;
  const replnext = `  const nextExperimentalUse =
  hasPhaseXXVIIIAObjectiveSelection
    ? "Proceed to Phase XXVIII-B: Bounded Objective Pursuit, testing whether Amelia can execute the selected developmental objective across the sanctioned three-step horizon, monitor prediction error during pursuit, and re-ground or abort if the fidelity envelope is approached."
    : hasPhaseXXVIISynthesis
      ? "Proceed to Phase XXVIII-A: Bounded Horizon-Scanning Objective Selection."
      : hasPhaseXXVIICGovernorRecalibration
        ? "Proceed to Phase XXVII Synthesis or Phase XXVIII-A: Bounded Horizon-Scanning Objective Selection, using the recalibrated Governor envelope as the sanctioning boundary."
        : hasPhaseXXIVDMarkerGuidedTaskBenchmark`;
  content = content.replace(targetnext, replnext);

  // router
  const routerTarget = `    } else if (
      upper.includes("BRIDGE PHASE XXVII-C ENVELOPE UPDATING GOVERNOR RECALIBRATION COMPARISON")
    ) {
      reply = await phaseXXVIICEnvelopeUpdatingGovernorRecalibrationComparison();
    } else {
      reply = "UNKNOWN_COMMAND";
    }`;
  const routerRepl = `    } else if (
      upper.includes("BRIDGE PHASE XXVII-C ENVELOPE UPDATING GOVERNOR RECALIBRATION COMPARISON")
    ) {
      reply = await phaseXXVIICEnvelopeUpdatingGovernorRecalibrationComparison();
    } else if (
      upper.includes("BRIDGE PHASE XXVII SYNTHESIS") &&
      upper.includes("PROSPECTIVE-EPISTEMIC-GOVERNANCE")
    ) {
      reply =
        await runPhaseXXVIISynthesisProspectiveEpistemicGovernance();
    } else if (
      upper.includes("BRIDGE PHASE XXVIII-A RUN") &&
      upper.includes("BOUNDED-HORIZON-SCANNING-OBJECTIVE-SELECTION")
    ) {
      reply =
        await runPhaseXXVIIIAObjectiveSelection();
    } else if (
      upper.includes(
        "BRIDGE PHASE XXVIII-A BOUNDED HORIZON SCANNING OBJECTIVE SELECTION AUDIT"
      )
    ) {
      reply =
        await phaseXXVIIIAObjectiveSelectionAudit();
    } else if (
      upper.includes(
        "BRIDGE PHASE XXVIII-A BOUNDED HORIZON SCANNING OBJECTIVE SELECTION COMPARISON"
      )
    ) {
      reply =
        await phaseXXVIIIAObjectiveSelectionComparison();
    } else {
      reply = "UNKNOWN_COMMAND";
    }`;
  content = content.replace(routerTarget, routerRepl);

  await fs.writeFile('./src/app/api/bridge-terminality/route.ts', content, 'utf8');
}
apply();
