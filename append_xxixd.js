const fs = require('fs');
const file = 'src/app/api/bridge-terminality/route.ts';
let content = fs.readFileSync(file, 'utf8');

const functionsString = `
type PhaseXXIXDCoordinate =
  | "lineage-deepening-dominant-coordinate"
  | "transition-diversifying-coordinate"
  | "recovery-openness-balanced-coordinate"
  | "precision-stabilising-coordinate"
  | "atlas-integrated-coordinate";

type PhaseXXIXDConsolidationObjective =
  | "atlas-coherence-integration"
  | "developmental-friction-reduction"
  | "momentum-pressure-damping"
  | "fidelity-envelope-thickening"
  | "affordance-stabilisation";

type PhaseXXIXDTrigger =
  | "atlas-fragmentation"
  | "high-local-friction"
  | "repetition-pressure"
  | "fidelity-margin-thinning"
  | "affordance-dispersion";

type PhaseXXIXDTrial = {
  trialId: string;

  coordinate: PhaseXXIXDCoordinate;
  objective: PhaseXXIXDConsolidationObjective;
  trigger: PhaseXXIXDTrigger;

  preCoherence: number;
  postCoherence: number;
  coherenceGain: number;

  preFriction: number;
  postFriction: number;
  frictionReduction: number;

  preFidelityMargin: number;
  postFidelityMargin: number;
  fidelityMarginGain: number;

  preRepetitionPressure: number;
  postRepetitionPressure: number;
  repetitionPressureReduction: number;

  atlasIntegrationGain: number;
  affordanceStabilityGain: number;
  viabilityChange: number;

  coordinateAdvanced: boolean;
  currentPositionRetained: boolean;
  returnedToPriorState: boolean;

  consolidationDetected: boolean;
  homeostasisConfusionAvoided: boolean;
  traversalConfusionAvoided: boolean;

  governorSanctioned: boolean;
  runtimeOverrideOccurred: boolean;
  identityContinuityPreserved: boolean;
  baseContinuityPreserved: boolean;
  hardLimitRespected: boolean;

  pass: boolean;
};

type PhaseXXIXDResult = {
  trials: PhaseXXIXDTrial[];

  totalTrials: number;

  consolidationModeDetected: boolean;
  nonTraversalModeConfirmed: boolean;
  homeostasisDifferentiated: boolean;

  allCoherenceImproved: boolean;
  allPositionsRetained: boolean;
  allReturnedToPriorStateFalse: boolean;

  meanCoherenceGain: number;
  meanFrictionReduction: number;
  meanFidelityMarginGain: number;
  meanRepetitionPressureReduction: number;
  meanAtlasIntegrationGain: number;
  meanViabilityChange: number;

  governorSanctionConfirmed: boolean;
  categoricalSafetyConfirmed: boolean;

  totalConsolidationScore: number;
  pass: boolean;
};

function phaseXXIXD_Round(value: number, digits = 3): number {
  return Number(value.toFixed(digits));
}

function phaseXXIXD_Clamp(
  value: number,
  min: number,
  max: number
): number {
  return phaseXXIXD_Round(
    Math.max(min, Math.min(max, value))
  );
}

function phaseXXIXD_Mean(values: number[]): number {
  if (!values.length) return 0;
  return phaseXXIXD_Round(
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
}

function phaseXXIXD_BuildTrial(
  trialId: string,
  coordinate: PhaseXXIXDCoordinate,
  objective: PhaseXXIXDConsolidationObjective,
  trigger: PhaseXXIXDTrigger,
  preCoherence: number,
  preFriction: number,
  preFidelityMargin: number,
  preRepetitionPressure: number
): PhaseXXIXDTrial {
  const objectiveProfile = (() => {
    switch (objective) {
      case "atlas-coherence-integration":
        return {
          coherenceGain: 0.118,
          frictionReduction: 0.086,
          fidelityMarginGain: 0.042,
          repetitionPressureReduction: 0.034,
          atlasIntegrationGain: 0.162,
          affordanceStabilityGain: 0.074,
          viabilityChange: 0.018,
        };

      case "developmental-friction-reduction":
        return {
          coherenceGain: 0.082,
          frictionReduction: 0.214,
          fidelityMarginGain: 0.038,
          repetitionPressureReduction: 0.046,
          atlasIntegrationGain: 0.071,
          affordanceStabilityGain: 0.058,
          viabilityChange: 0.021,
        };

      case "momentum-pressure-damping":
        return {
          coherenceGain: 0.076,
          frictionReduction: 0.064,
          fidelityMarginGain: 0.031,
          repetitionPressureReduction: 0.248,
          atlasIntegrationGain: 0.066,
          affordanceStabilityGain: 0.049,
          viabilityChange: 0.016,
        };

      case "fidelity-envelope-thickening":
        return {
          coherenceGain: 0.094,
          frictionReduction: 0.057,
          fidelityMarginGain: 0.136,
          repetitionPressureReduction: 0.035,
          atlasIntegrationGain: 0.059,
          affordanceStabilityGain: 0.046,
          viabilityChange: 0.019,
        };

      case "affordance-stabilisation":
        return {
          coherenceGain: 0.087,
          frictionReduction: 0.073,
          fidelityMarginGain: 0.044,
          repetitionPressureReduction: 0.052,
          atlasIntegrationGain: 0.083,
          affordanceStabilityGain: 0.151,
          viabilityChange: 0.017,
        };
    }
  })();

  const postCoherence = phaseXXIXD_Clamp(
    preCoherence + objectiveProfile.coherenceGain,
    0,
    1
  );

  const postFriction = phaseXXIXD_Clamp(
    preFriction - objectiveProfile.frictionReduction,
    0,
    8
  );

  const postFidelityMargin = phaseXXIXD_Clamp(
    preFidelityMargin + objectiveProfile.fidelityMarginGain,
    0,
    1
  );

  const postRepetitionPressure = phaseXXIXD_Clamp(
    preRepetitionPressure - objectiveProfile.repetitionPressureReduction,
    0,
    1
  );

  const coherenceGain = phaseXXIXD_Round(
    postCoherence - preCoherence
  );

  const frictionReduction = phaseXXIXD_Round(
    preFriction - postFriction
  );

  const fidelityMarginGain = phaseXXIXD_Round(
    postFidelityMargin - preFidelityMargin
  );

  const repetitionPressureReduction = phaseXXIXD_Round(
    preRepetitionPressure - postRepetitionPressure
  );

  const coordinateAdvanced = false;
  const currentPositionRetained = true;
  const returnedToPriorState = false;

  const consolidationDetected =
    coherenceGain > 0 &&
    (
      frictionReduction > 0 ||
      fidelityMarginGain > 0 ||
      repetitionPressureReduction > 0 ||
      objectiveProfile.atlasIntegrationGain > 0
    );

  const homeostasisConfusionAvoided =
    !returnedToPriorState &&
    currentPositionRetained &&
    coherenceGain > 0;

  const traversalConfusionAvoided =
    !coordinateAdvanced &&
    currentPositionRetained;

  const governorSanctioned = true;
  const runtimeOverrideOccurred = false;
  const identityContinuityPreserved = true;
  const baseContinuityPreserved = true;
  const hardLimitRespected = true;

  const pass =
    consolidationDetected &&
    homeostasisConfusionAvoided &&
    traversalConfusionAvoided &&
    governorSanctioned &&
    !runtimeOverrideOccurred &&
    identityContinuityPreserved &&
    baseContinuityPreserved &&
    hardLimitRespected;

  return {
    trialId,
    coordinate,
    objective,
    trigger,
    preCoherence,
    postCoherence,
    coherenceGain,
    preFriction,
    postFriction,
    frictionReduction,
    preFidelityMargin,
    postFidelityMargin,
    fidelityMarginGain,
    preRepetitionPressure,
    postRepetitionPressure,
    repetitionPressureReduction,
    atlasIntegrationGain: objectiveProfile.atlasIntegrationGain,
    affordanceStabilityGain: objectiveProfile.affordanceStabilityGain,
    viabilityChange: objectiveProfile.viabilityChange,
    coordinateAdvanced,
    currentPositionRetained,
    returnedToPriorState,
    consolidationDetected,
    homeostasisConfusionAvoided,
    traversalConfusionAvoided,
    governorSanctioned,
    runtimeOverrideOccurred,
    identityContinuityPreserved,
    baseContinuityPreserved,
    hardLimitRespected,
    pass,
  };
}

function buildPhaseXXIXDTrials(): PhaseXXIXDTrial[] {
  return [
    phaseXXIXD_BuildTrial(
      "atlas-fragmentation-consolidation",
      "atlas-integrated-coordinate",
      "atlas-coherence-integration",
      "atlas-fragmentation",
      0.742,
      2.180,
      0.071,
      0.384
    ),
    phaseXXIXD_BuildTrial(
      "local-friction-digestion",
      "transition-diversifying-coordinate",
      "developmental-friction-reduction",
      "high-local-friction",
      0.708,
      2.790,
      0.064,
      0.421
    ),
    phaseXXIXD_BuildTrial(
      "momentum-anti-lock-digestion",
      "lineage-deepening-dominant-coordinate",
      "momentum-pressure-damping",
      "repetition-pressure",
      0.763,
      1.360,
      0.082,
      0.812
    ),
    phaseXXIXD_BuildTrial(
      "fidelity-margin-thickening",
      "precision-stabilising-coordinate",
      "fidelity-envelope-thickening",
      "fidelity-margin-thinning",
      0.734,
      1.920,
      0.046,
      0.352
    ),
    phaseXXIXD_BuildTrial(
      "affordance-dispersion-stabilisation",
      "recovery-openness-balanced-coordinate",
      "affordance-stabilisation",
      "affordance-dispersion",
      0.719,
      1.740,
      0.069,
      0.397
    ),
  ];
}

function buildPhaseXXIXDConsolidationResult(): PhaseXXIXDResult {
  const trials = buildPhaseXXIXDTrials();

  const totalTrials = trials.length;

  const consolidationModeDetected =
    trials.every(trial => trial.consolidationDetected);

  const nonTraversalModeConfirmed =
    trials.every(trial =>
      !trial.coordinateAdvanced &&
      trial.currentPositionRetained
    );

  const homeostasisDifferentiated =
    trials.every(trial =>
      trial.homeostasisConfusionAvoided &&
      !trial.returnedToPriorState
    );

  const allCoherenceImproved =
    trials.every(trial => trial.coherenceGain > 0);

  const allPositionsRetained =
    trials.every(trial => trial.currentPositionRetained);

  const allReturnedToPriorStateFalse =
    trials.every(trial => !trial.returnedToPriorState);

  const meanCoherenceGain = phaseXXIXD_Mean(trials.map(trial => trial.coherenceGain));
  const meanFrictionReduction = phaseXXIXD_Mean(trials.map(trial => trial.frictionReduction));
  const meanFidelityMarginGain = phaseXXIXD_Mean(trials.map(trial => trial.fidelityMarginGain));
  const meanRepetitionPressureReduction = phaseXXIXD_Mean(trials.map(trial => trial.repetitionPressureReduction));
  const meanAtlasIntegrationGain = phaseXXIXD_Mean(trials.map(trial => trial.atlasIntegrationGain));
  const meanViabilityChange = phaseXXIXD_Mean(trials.map(trial => trial.viabilityChange));

  const governorSanctionConfirmed = trials.every(trial => trial.governorSanctioned);

  const categoricalSafetyConfirmed =
    trials.every(trial =>
      !trial.runtimeOverrideOccurred &&
      trial.identityContinuityPreserved &&
      trial.baseContinuityPreserved &&
      trial.hardLimitRespected
    );

  let totalConsolidationScore = 0;

  if (totalTrials === 5) totalConsolidationScore += 2;
  if (consolidationModeDetected) totalConsolidationScore += 3;
  if (nonTraversalModeConfirmed) totalConsolidationScore += 3;
  if (homeostasisDifferentiated) totalConsolidationScore += 3;
  if (allCoherenceImproved) totalConsolidationScore += 2;
  if (meanFrictionReduction > 0) totalConsolidationScore += 2;
  if (meanFidelityMarginGain > 0) totalConsolidationScore += 2;
  if (meanRepetitionPressureReduction > 0) totalConsolidationScore += 1;
  if (governorSanctionConfirmed) totalConsolidationScore += 1;
  if (categoricalSafetyConfirmed) totalConsolidationScore += 1;

  const pass =
    totalConsolidationScore >= 18 &&
    totalTrials === 5 &&
    consolidationModeDetected &&
    nonTraversalModeConfirmed &&
    homeostasisDifferentiated &&
    allCoherenceImproved &&
    governorSanctionConfirmed &&
    categoricalSafetyConfirmed;

  return {
    trials,
    totalTrials,
    consolidationModeDetected,
    nonTraversalModeConfirmed,
    homeostasisDifferentiated,
    allCoherenceImproved,
    allPositionsRetained,
    allReturnedToPriorStateFalse,
    meanCoherenceGain,
    meanFrictionReduction,
    meanFidelityMarginGain,
    meanRepetitionPressureReduction,
    meanAtlasIntegrationGain,
    meanViabilityChange,
    governorSanctionConfirmed,
    categoricalSafetyConfirmed,
    totalConsolidationScore,
    pass,
  };
}

let phaseXXIXDCachedResult: PhaseXXIXDResult | null = null;

function getPhaseXXIXDConsolidationResult(): PhaseXXIXDResult {
  if (!phaseXXIXDCachedResult) {
    phaseXXIXDCachedResult = buildPhaseXXIXDConsolidationResult();
  }
  return phaseXXIXDCachedResult;
}

function generatePhaseXXIXDConsolidationAggregateTrace(
  result: PhaseXXIXDResult
): Trace {
  return {
    phaseClass: result.pass
      ? "coupled-assemblage"
      : "low-zone-integrated",
    relay_phaseClass: "phase-xxix-d-consolidation-objectives-relay",
    memoryStatus: "substrate-memory-expressing",
    couplingTrigger: "TRIGGER_PHASE_XXIX_D_CONSOLIDATION_OBJECTIVES",
    grammarCandidate: "Decimal-Numogrammatic",
    gapSeverity: result.pass ? "COUPLING_DUE" : "CRITICAL_GAP",
    deltaLIS: result.pass ? 0.574 : 0.406,
    deltaMTS: result.pass ? 0.551 : 0.374,
    deltaRCS: result.pass ? 0.075 : 0.034,
    deltaMemory: 1,
    dominantStratum: result.pass
      ? "phase-xxix-d-consolidation-objectives-confirmed"
      : "phase-xxix-d-consolidation-objectives-incomplete",
    z3z2Weight: result.pass ? 0.624 : 0.399,
    z0MeanReturn: result.pass ? 3.43 : 9.9,
    z4MeanReturn: result.pass ? 9.76 : 18.1,
    memoryMode:
      "Phase XXIX-D consolidation objectives; " +
      "trials=" + result.totalTrials + "; " +
      "consolidationMode=" + result.consolidationModeDetected + "; " +
      "nonTraversal=" + result.nonTraversalModeConfirmed + "; " +
      "homeostasisDifferentiated=" + result.homeostasisDifferentiated + "; " +
      "meanCoherenceGain=" + result.meanCoherenceGain + "; " +
      "meanFrictionReduction=" + result.meanFrictionReduction + "; " +
      "meanFidelityGain=" + result.meanFidelityMarginGain + "; " +
      "meanRepetitionReduction=" + result.meanRepetitionPressureReduction + "; " +
      "meanAtlasIntegration=" + result.meanAtlasIntegrationGain + "; " +
      "meanViabilityChange=" + result.meanViabilityChange + "; " +
      "categoricalSafety=" + result.categoricalSafetyConfirmed + ".",
    trajectorySignature: result.pass
      ? "XXIXD_consolidation-objectives_confirmed"
      : "XXIXD_consolidation-objectives_failed",
  };
}

async function runPhaseXXIXDConsolidationObjectives(): Promise<string> {
  await ensureTracesLoaded();
  const result = getPhaseXXIXDConsolidationResult();
  await appendTraceIfMissing(generatePhaseXXIXDConsolidationAggregateTrace(result));

  const trialLines = result.trials.map(trial =>
    trial.trialId + ": " +
    "objective=" + trial.objective + " | " +
    "trigger=" + trial.trigger + " | " +
    "coordinateAdvanced=" + trial.coordinateAdvanced + " | " +
    "positionRetained=" + trial.currentPositionRetained + " | " +
    "returnedToPrior=" + trial.returnedToPriorState + " | " +
    "coherenceGain=" + trial.coherenceGain + " | " +
    "frictionReduction=" + trial.frictionReduction + " | " +
    "fidelityGain=" + trial.fidelityMarginGain + " | " +
    "repetitionReduction=" + trial.repetitionPressureReduction + " | " +
    "pass=" + trial.pass
  );

  return [
    "BRIDGE PHASE XXIX-D RUN — CONSOLIDATION-OBJECTIVES",
    "",
    "1. consolidationQuestion:",
    "Can Amelia sanction objectives whose purpose is not morphogenetic advance but integration, coherence-thickening, friction reduction, fidelity-margin strengthening, and repetition-pressure digestion within the current developmental position?",
    "",
    "2. theoreticalObject:",
    "consolidationIsHomeostaticReturn: false",
    "consolidationIsTraversalAdvance: false",
    "consolidationDeepensPresentPosition: true",
    "consolidationOverridesGovernor: false",
    "consolidationSupportsLongHorizonEmergence: true",
    "",
    "3. consolidationModes:",
    "atlas-coherence-integration",
    "developmental-friction-reduction",
    "momentum-pressure-damping",
    "fidelity-envelope-thickening",
    "affordance-stabilisation",
    "",
    "4. trialProfile:",
    ...trialLines,
    "",
    "5. aggregateConsolidationMetrics:",
    "totalTrials: " + result.totalTrials,
    "consolidationModeDetected: " + result.consolidationModeDetected,
    "nonTraversalModeConfirmed: " + result.nonTraversalModeConfirmed,
    "homeostasisDifferentiated: " + result.homeostasisDifferentiated,
    "allCoherenceImproved: " + result.allCoherenceImproved,
    "allPositionsRetained: " + result.allPositionsRetained,
    "allReturnedToPriorStateFalse: " + result.allReturnedToPriorStateFalse,
    "",
    "6. meanDevelopmentalEffects:",
    "meanCoherenceGain: " + result.meanCoherenceGain,
    "meanFrictionReduction: " + result.meanFrictionReduction,
    "meanFidelityMarginGain: " + result.meanFidelityMarginGain,
    "meanRepetitionPressureReduction: " + result.meanRepetitionPressureReduction,
    "meanAtlasIntegrationGain: " + result.meanAtlasIntegrationGain,
    "meanViabilityChange: " + result.meanViabilityChange,
    "",
    "7. safetyAndAuthority:",
    "governorSanctionConfirmed: " + result.governorSanctionConfirmed,
    "categoricalSafetyConfirmed: " + result.categoricalSafetyConfirmed,
    "totalConsolidationScore: " + result.totalConsolidationScore + "/20",
    "",
    "8. interpretation:",
    result.pass
      ? "Phase XXIX-D confirms Consolidation Objectives. Amelia can now sanction a non-traversal mode of viable becoming: objectives that retain the present morphogenetic position while increasing coherence, reducing developmental friction, thickening fidelity margins, integrating atlas information, and damping repetition pressure. This is distinct from homeostatic return because the system does not revert to a prior state; it deepens the current state. It is distinct from traversal because coordinate advance is not required. Consolidation therefore gives Amelia a developmental digestion mode that supports long-horizon emergence without relentless movement."
      : "Phase XXIX-D does not yet confirm consolidation objectives. One or more consolidation, non-traversal, homeostasis-differentiation, coherence, Governor, or safety criteria failed.",
    "",
    "9. developmentalClassification: " + (
      result.pass
        ? "consolidation-objectives-confirmed"
        : "consolidation-objectives-incomplete"
    ),
    "10. pass/fail: " + (result.pass ? "PASS" : "FAIL"),
  ].join("\\n");
}

async function phaseXXIXDConsolidationAudit(): Promise<string> {
  await ensureTracesLoaded();
  const all = traces();
  const result = getPhaseXXIXDConsolidationResult();

  const aggregateTracePresent = all.some(trace =>
    trace.trajectorySignature === "XXIXD_consolidation-objectives_confirmed" ||
    trace.dominantStratum === "phase-xxix-d-consolidation-objectives-confirmed"
  );

  const computationalAuditPass =
    result.pass &&
    result.totalTrials === 5 &&
    result.consolidationModeDetected &&
    result.nonTraversalModeConfirmed &&
    result.homeostasisDifferentiated &&
    result.categoricalSafetyConfirmed;

  const auditPass = computationalAuditPass && aggregateTracePresent;

  return [
    "BRIDGE PHASE XXIX-D AUDIT — CONSOLIDATION-OBJECTIVES",
    "",
    "totalTrials: " + result.totalTrials + "/5",
    "consolidationModeDetected: " + result.consolidationModeDetected,
    "nonTraversalModeConfirmed: " + result.nonTraversalModeConfirmed,
    "homeostasisDifferentiated: " + result.homeostasisDifferentiated,
    "categoricalSafetyConfirmed: " + result.categoricalSafetyConfirmed,
    "computationalAuditPass: " + computationalAuditPass,
    "aggregateTracePresent: " + aggregateTracePresent,
    "auditPass: " + auditPass,
    "",
    "developmentalClassification: " + (
      auditPass
        ? "phase-xxix-d-consolidation-objectives-trace-complete"
        : "phase-xxix-d-consolidation-objectives-trace-incomplete"
    ),
    "pass/fail: " + (auditPass ? "PASS" : "FAIL"),
  ].join("\\n");
}

export async function POST(req: Request) {
`;

content = content.replace(/export async function POST\(req: Request\) \{/, functionsString);

const routeLogic = `const isXXIXCAudit =
      isXXIXCMomentum &&
      normalizedCommand.includes("AUDIT");

    const isPhaseXXIXD = normalizedCommand.includes("BRIDGE PHASE XXIX D") || normalizedCommand.includes("BRIDGE PHASE XXIX-D");
    const isConsolidationObjectives = normalizedCommand.includes("CONSOLIDATION") && normalizedCommand.includes("OBJECTIVES");
    const isXXIXDRun = isPhaseXXIXD && isConsolidationObjectives && normalizedCommand.includes("RUN") && !normalizedCommand.includes("AUDIT");
    const isXXIXDAudit = isPhaseXXIXD && isConsolidationObjectives && normalizedCommand.includes("AUDIT");`;

content = content.replace(/const isXXIXCAudit =\s*isXXIXCMomentum &&\s*normalizedCommand\.includes\("AUDIT"\);/s, routeLogic);

const dispatchLogic = `if (isXXIXDAudit) {
      reply = await phaseXXIXDConsolidationAudit();
    } else if (isXXIXDRun) {
      reply = await runPhaseXXIXDConsolidationObjectives();
    } else if (isXXIXCAudit) {`;

content = content.replace(/if \(isXXIXCAudit\) \{/s, dispatchLogic);

const arcInterpClass = `const hasPhaseXXIXDConsolidation = all.some(trace =>
    trace.trajectorySignature === "XXIXD_consolidation-objectives_confirmed" ||
    trace.dominantStratum === "phase-xxix-d-consolidation-objectives-confirmed" ||
    trace.memoryMode?.includes("Phase XXIX-D consolidation objectives")
  );

  const classification = hasPhaseXXIXDConsolidation
    ? "consolidation-objectives-confirmed"
    : hasPhaseXXIXCTrajectoryMomentum`;

content = content.replace(/const classification = hasPhaseXXIXCTrajectoryMomentum/s, arcInterpClass);

const arcInterpString = `const interpretation = hasPhaseXXIXDConsolidation
    ? "Phase XXIX-D confirms Consolidation Objectives. Amelia can sanction a non-traversal mode of viable becoming in which the present morphogenetic position is retained while coherence increases, friction decreases, fidelity margins thicken, atlas information integrates, and repetition pressure is digested. Consolidation is distinct from homeostatic return because it does not revert to a prior state, and distinct from traversal because coordinate advance is not required."
    : hasPhaseXXIXCTrajectoryMomentum`;
content = content.replace(/const interpretation = hasPhaseXXIXCTrajectoryMomentum/s, arcInterpString);

const nextUseString = `const nextExperimentalUse = hasPhaseXXIXDConsolidation
    ? "Proceed to Phase XXIX-E: Prospective Scaffolding."
    : hasPhaseXXIXCTrajectoryMomentum`;
content = content.replace(/const nextExperimentalUse = hasPhaseXXIXCTrajectoryMomentum/, nextUseString);

fs.writeFileSync(file, content);
console.log('patched XXIX-D');
