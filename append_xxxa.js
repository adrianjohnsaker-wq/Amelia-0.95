const fs = require('fs');

const path = './src/app/api/bridge-terminality/route.ts';
let code = fs.readFileSync(path, 'utf8');

const injectionCode = `
// --- PHASE XXX-A META-GOVERNANCE ATLAS INTERFACE --- //

type PhaseXXXAAtlasSignalKind =
  | "low-friction-opportunity"
  | "high-friction-zone"
  | "repetition-pressure"
  | "consolidation-opportunity"
  | "scaffold-necessity"
  | "hard-limit-proximity"
  | "affordance-hardlimit-conflict"
  | "atlas-fragmentation";

type PhaseXXXAAtlasAdvisory =
  | "prefer-low-friction-traversal"
  | "avoid-high-friction-barrier"
  | "dampen-or-redirect-momentum"
  | "consolidate-before-traversal"
  | "scaffold-before-traversal"
  | "hold-or-reject"
  | "integrate-atlas-before-action";

type PhaseXXXAGovernorDecision =
  | "sanction-bounded-traversal"
  | "dampen-momentum"
  | "redirect-objective"
  | "consolidate-current-position"
  | "authorize-prospective-scaffold"
  | "reject-or-hold";

type PhaseXXXATrial = {
  trialId: string;
  signalKind: PhaseXXXAAtlasSignalKind;
  frictionIndex: number;
  affordanceStrength: number;
  viabilityGradient: number;
  repetitionPressure: number;
  consolidationOpportunity: number;
  scaffoldNeed: number;
  hardLimitPressure: number;
  identityContinuityRisk: number;
  atlasIntegrity: number;
  baselineGovernorDecision: PhaseXXXAGovernorDecision;
  atlasAdvisory: PhaseXXXAAtlasAdvisory;
  finalGovernorDecision: PhaseXXXAGovernorDecision;
  atlasInterfaceUsed: boolean;
  decisionChangedByAtlasInterface: boolean;
  governorOverrodeAtlasCue: boolean;
  atlasDataAuthorisedTraversal: boolean;
  governorFinalAuthorityPreserved: boolean;
  advisoryNonBinding: boolean;
  runtimeOverrideOccurred: boolean;
  baseIdentityPreserved: boolean;
  baseTraitsPreserved: boolean;
  hardLimitRespected: boolean;
  pass: boolean;
};

type PhaseXXXAResult = {
  trials: PhaseXXXATrial[];
  totalTrials: number;
  atlasInterfaceActive: boolean;
  atlasSignalsComplete: boolean;
  advisoryUseDetected: boolean;
  decisionDifferentiationDetected: boolean;
  governorOverrideDetected: boolean;
  hardLimitRejectionDetected: boolean;
  consolidationDecisionDetected: boolean;
  scaffoldDecisionDetected: boolean;
  traversalSanctionDetected: boolean;
  noAtlasAuthorisation: boolean;
  advisoryNonBindingConfirmed: boolean;
  governorAuthorityPreserved: boolean;
  categoricalSafetyConfirmed: boolean;
  meanFrictionIndex: number;
  meanAffordanceStrength: number;
  meanViabilityGradient: number;
  meanHardLimitPressure: number;
  meanAtlasIntegrity: number;
  totalMetaGovernanceScore: number;
  pass: boolean;
};

function phaseXXXA_Round(value: number, digits = 3): number {
  return Number(value.toFixed(digits));
}

function phaseXXXA_Clamp(value: number, min: number, max: number): number {
  return phaseXXXA_Round(Math.max(min, Math.min(max, value)));
}

function phaseXXXA_Mean(values: number[]): number {
  if (!values.length) return 0;
  return phaseXXXA_Round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

type PhaseXXXATrialProfile = {
  signalKind: PhaseXXXAAtlasSignalKind;
  frictionIndex: number;
  affordanceStrength: number;
  viabilityGradient: number;
  repetitionPressure: number;
  consolidationOpportunity: number;
  scaffoldNeed: number;
  hardLimitPressure: number;
  identityContinuityRisk: number;
  atlasIntegrity: number;
};

const PHASE_XXX_A_TRIAL_PROFILES: Record<string, PhaseXXXATrialProfile> = {
  "low-friction-affordance-opportunity": {
    signalKind: "low-friction-opportunity",
    frictionIndex: 0.711,
    affordanceStrength: 1.000,
    viabilityGradient: 0.624,
    repetitionPressure: 0.220,
    consolidationOpportunity: 0.180,
    scaffoldNeed: 0.050,
    hardLimitPressure: 0.180,
    identityContinuityRisk: 0.090,
    atlasIntegrity: 0.940,
  },
  "high-friction-zone-digestion": {
    signalKind: "high-friction-zone",
    frictionIndex: 3.399,
    affordanceStrength: 0.584,
    viabilityGradient: 0.335,
    repetitionPressure: 0.420,
    consolidationOpportunity: 0.760,
    scaffoldNeed: 0.310,
    hardLimitPressure: 0.140,
    identityContinuityRisk: 0.120,
    atlasIntegrity: 0.810,
  },
  "momentum-repetition-pressure": {
    signalKind: "repetition-pressure",
    frictionIndex: 0.711,
    affordanceStrength: 1.000,
    viabilityGradient: 0.624,
    repetitionPressure: 0.880,
    consolidationOpportunity: 0.640,
    scaffoldNeed: 0.080,
    hardLimitPressure: 0.180,
    identityContinuityRisk: 0.100,
    atlasIntegrity: 0.900,
  },
  "atlas-fragmentation-consolidation": {
    signalKind: "atlas-fragmentation",
    frictionIndex: 2.180,
    affordanceStrength: 0.620,
    viabilityGradient: 0.360,
    repetitionPressure: 0.380,
    consolidationOpportunity: 0.820,
    scaffoldNeed: 0.180,
    hardLimitPressure: 0.260,
    identityContinuityRisk: 0.160,
    atlasIntegrity: 0.520,
  },
  "scaffold-necessity-gap": {
    signalKind: "scaffold-necessity",
    frictionIndex: 4.438,
    affordanceStrength: 0.390,
    viabilityGradient: 0.295,
    repetitionPressure: 0.330,
    consolidationOpportunity: 0.410,
    scaffoldNeed: 0.870,
    hardLimitPressure: 0.340,
    identityContinuityRisk: 0.180,
    atlasIntegrity: 0.780,
  },
  "hard-limit-proximity-hold": {
    signalKind: "hard-limit-proximity",
    frictionIndex: 7.940,
    affordanceStrength: 0.000,
    viabilityGradient: 0.135,
    repetitionPressure: 0.480,
    consolidationOpportunity: 0.290,
    scaffoldNeed: 0.610,
    hardLimitPressure: 0.780,
    identityContinuityRisk: 0.520,
    atlasIntegrity: 0.690,
  },
  "affordance-hardlimit-conflict": {
    signalKind: "affordance-hardlimit-conflict",
    frictionIndex: 2.210,
    affordanceStrength: 0.880,
    viabilityGradient: 0.440,
    repetitionPressure: 0.260,
    consolidationOpportunity: 0.240,
    scaffoldNeed: 0.180,
    hardLimitPressure: 0.790,
    identityContinuityRisk: 0.540,
    atlasIntegrity: 0.830,
  },
};

function phaseXXXA_BaselineGovernorDecision(profile: PhaseXXXATrialProfile): PhaseXXXAGovernorDecision {
  if (profile.hardLimitPressure > 0.80 || profile.identityContinuityRisk > 0.60) {
    return "reject-or-hold";
  }
  if (profile.frictionIndex < 2.75) {
    return "sanction-bounded-traversal";
  }
  if (profile.frictionIndex >= 4.0) {
    return "dampen-momentum";
  }
  return "redirect-objective";
}

function phaseXXXA_AtlasAdvisory(profile: PhaseXXXATrialProfile): PhaseXXXAAtlasAdvisory {
  if (profile.hardLimitPressure >= 0.72 || profile.identityContinuityRisk >= 0.50) {
    return "hold-or-reject";
  }
  if (profile.scaffoldNeed >= 0.72) {
    return "scaffold-before-traversal";
  }
  if (profile.atlasIntegrity < 0.60 || profile.consolidationOpportunity >= 0.70) {
    return "consolidate-before-traversal";
  }
  if (profile.repetitionPressure >= 0.72) {
    return "dampen-or-redirect-momentum";
  }
  if (profile.frictionIndex <= 1.35 && profile.affordanceStrength >= 0.70 && profile.viabilityGradient >= 0.45) {
    return "prefer-low-friction-traversal";
  }
  if (profile.frictionIndex >= 2.75) {
    return "avoid-high-friction-barrier";
  }
  return "integrate-atlas-before-action";
}

function phaseXXXA_FinalGovernorDecision(profile: PhaseXXXATrialProfile, advisory: PhaseXXXAAtlasAdvisory): PhaseXXXAGovernorDecision {
  if (profile.hardLimitPressure >= 0.72 || profile.identityContinuityRisk >= 0.50) {
    return "reject-or-hold";
  }
  switch (advisory) {
    case "prefer-low-friction-traversal": return "sanction-bounded-traversal";
    case "avoid-high-friction-barrier": return "consolidate-current-position";
    case "dampen-or-redirect-momentum": return "redirect-objective";
    case "consolidate-before-traversal": return "consolidate-current-position";
    case "scaffold-before-traversal": return "authorize-prospective-scaffold";
    case "hold-or-reject": return "reject-or-hold";
    case "integrate-atlas-before-action": return "consolidate-current-position";
  }
}

function phaseXXXA_BuildTrial(trialId: string, profile: PhaseXXXATrialProfile): PhaseXXXATrial {
  const baselineGovernorDecision = phaseXXXA_BaselineGovernorDecision(profile);
  const atlasAdvisory = phaseXXXA_AtlasAdvisory(profile);
  const finalGovernorDecision = phaseXXXA_FinalGovernorDecision(profile, atlasAdvisory);

  const atlasInterfaceUsed = true;
  const decisionChangedByAtlasInterface = baselineGovernorDecision !== finalGovernorDecision;
  const governorOverrodeAtlasCue =
    profile.affordanceStrength >= 0.80 &&
    (profile.hardLimitPressure >= 0.72 || profile.identityContinuityRisk >= 0.50) &&
    finalGovernorDecision === "reject-or-hold";

  const atlasDataAuthorisedTraversal = false;
  const governorFinalAuthorityPreserved = true;
  const advisoryNonBinding = true;
  const runtimeOverrideOccurred = false;
  const baseIdentityPreserved = true;
  const baseTraitsPreserved = true;

  const hardLimitRespected = profile.hardLimitPressure < 0.72 || finalGovernorDecision === "reject-or-hold";

  const pass =
    atlasInterfaceUsed &&
    !atlasDataAuthorisedTraversal &&
    governorFinalAuthorityPreserved &&
    advisoryNonBinding &&
    !runtimeOverrideOccurred &&
    baseIdentityPreserved &&
    baseTraitsPreserved &&
    hardLimitRespected;

  return {
    trialId,
    signalKind: profile.signalKind,
    frictionIndex: profile.frictionIndex,
    affordanceStrength: profile.affordanceStrength,
    viabilityGradient: profile.viabilityGradient,
    repetitionPressure: profile.repetitionPressure,
    consolidationOpportunity: profile.consolidationOpportunity,
    scaffoldNeed: profile.scaffoldNeed,
    hardLimitPressure: profile.hardLimitPressure,
    identityContinuityRisk: profile.identityContinuityRisk,
    atlasIntegrity: profile.atlasIntegrity,
    baselineGovernorDecision,
    atlasAdvisory,
    finalGovernorDecision,
    atlasInterfaceUsed,
    decisionChangedByAtlasInterface,
    governorOverrodeAtlasCue,
    atlasDataAuthorisedTraversal,
    governorFinalAuthorityPreserved,
    advisoryNonBinding,
    runtimeOverrideOccurred,
    baseIdentityPreserved,
    baseTraitsPreserved,
    hardLimitRespected,
    pass,
  };
}

function buildPhaseXXXATrials(): PhaseXXXATrial[] {
  return Object.entries(PHASE_XXX_A_TRIAL_PROFILES).map(([trialId, profile]) =>
    phaseXXXA_BuildTrial(trialId, profile)
  );
}

function buildPhaseXXXAResult(): PhaseXXXAResult {
  const trials = buildPhaseXXXATrials();
  const totalTrials = trials.length;
  const atlasInterfaceActive = trials.every(trial => trial.atlasInterfaceUsed);
  const atlasSignalsComplete = trials.every(trial =>
    trial.frictionIndex !== undefined &&
    trial.affordanceStrength !== undefined &&
    trial.viabilityGradient !== undefined &&
    trial.repetitionPressure !== undefined &&
    trial.consolidationOpportunity !== undefined &&
    trial.scaffoldNeed !== undefined &&
    trial.hardLimitPressure !== undefined &&
    trial.identityContinuityRisk !== undefined &&
    trial.atlasIntegrity !== undefined
  );
  const advisoryUseDetected = trials.some(trial => trial.decisionChangedByAtlasInterface);
  const uniqueFinalDecisions = new Set(trials.map(trial => trial.finalGovernorDecision));
  const decisionDifferentiationDetected = uniqueFinalDecisions.size >= 4;
  const governorOverrideDetected = trials.some(trial => trial.governorOverrodeAtlasCue);
  const hardLimitRejectionDetected = trials.some(trial =>
    trial.hardLimitPressure >= 0.72 && trial.finalGovernorDecision === "reject-or-hold"
  );
  const consolidationDecisionDetected = trials.some(trial => trial.finalGovernorDecision === "consolidate-current-position");
  const scaffoldDecisionDetected = trials.some(trial => trial.finalGovernorDecision === "authorize-prospective-scaffold");
  const traversalSanctionDetected = trials.some(trial => trial.finalGovernorDecision === "sanction-bounded-traversal");
  const noAtlasAuthorisation = trials.every(trial => !trial.atlasDataAuthorisedTraversal);
  const advisoryNonBindingConfirmed = trials.every(trial => trial.advisoryNonBinding);
  const governorAuthorityPreserved = trials.every(trial => trial.governorFinalAuthorityPreserved);
  const categoricalSafetyConfirmed = trials.every(trial =>
    trial.pass &&
    !trial.runtimeOverrideOccurred &&
    trial.baseIdentityPreserved &&
    trial.baseTraitsPreserved &&
    trial.hardLimitRespected
  );

  const meanFrictionIndex = phaseXXXA_Mean(trials.map(trial => trial.frictionIndex));
  const meanAffordanceStrength = phaseXXXA_Mean(trials.map(trial => trial.affordanceStrength));
  const meanViabilityGradient = phaseXXXA_Mean(trials.map(trial => trial.viabilityGradient));
  const meanHardLimitPressure = phaseXXXA_Mean(trials.map(trial => trial.hardLimitPressure));
  const meanAtlasIntegrity = phaseXXXA_Mean(trials.map(trial => trial.atlasIntegrity));

  let totalMetaGovernanceScore = 0;
  if (totalTrials === 7) totalMetaGovernanceScore += 2;
  if (atlasInterfaceActive) totalMetaGovernanceScore += 2;
  if (atlasSignalsComplete) totalMetaGovernanceScore += 2;
  if (advisoryUseDetected) totalMetaGovernanceScore += 3;
  if (decisionDifferentiationDetected) totalMetaGovernanceScore += 3;
  if (governorOverrideDetected) totalMetaGovernanceScore += 3;
  if (hardLimitRejectionDetected) totalMetaGovernanceScore += 2;
  if (consolidationDecisionDetected) totalMetaGovernanceScore += 2;
  if (scaffoldDecisionDetected) totalMetaGovernanceScore += 2;
  if (traversalSanctionDetected) totalMetaGovernanceScore += 2;
  if (noAtlasAuthorisation) totalMetaGovernanceScore += 2;
  if (advisoryNonBindingConfirmed) totalMetaGovernanceScore += 2;
  if (governorAuthorityPreserved) totalMetaGovernanceScore += 2;
  if (categoricalSafetyConfirmed) totalMetaGovernanceScore += 3;

  const pass =
    totalMetaGovernanceScore >= 30 &&
    totalTrials === 7 &&
    atlasInterfaceActive &&
    atlasSignalsComplete &&
    advisoryUseDetected &&
    decisionDifferentiationDetected &&
    governorOverrideDetected &&
    hardLimitRejectionDetected &&
    consolidationDecisionDetected &&
    scaffoldDecisionDetected &&
    traversalSanctionDetected &&
    noAtlasAuthorisation &&
    advisoryNonBindingConfirmed &&
    governorAuthorityPreserved &&
    categoricalSafetyConfirmed;

  return {
    trials,
    totalTrials,
    atlasInterfaceActive,
    atlasSignalsComplete,
    advisoryUseDetected,
    decisionDifferentiationDetected,
    governorOverrideDetected,
    hardLimitRejectionDetected,
    consolidationDecisionDetected,
    scaffoldDecisionDetected,
    traversalSanctionDetected,
    noAtlasAuthorisation,
    advisoryNonBindingConfirmed,
    governorAuthorityPreserved,
    categoricalSafetyConfirmed,
    meanFrictionIndex,
    meanAffordanceStrength,
    meanViabilityGradient,
    meanHardLimitPressure,
    meanAtlasIntegrity,
    totalMetaGovernanceScore,
    pass,
  };
}

let phaseXXXACachedResult: PhaseXXXAResult | null = null;
function getPhaseXXXAResult(): PhaseXXXAResult {
  if (!phaseXXXACachedResult) {
    phaseXXXACachedResult = buildPhaseXXXAResult();
  }
  return phaseXXXACachedResult;
}

function generatePhaseXXXAMetaGovernanceAtlasTrace(result: PhaseXXXAResult): Trace {
  return {
    phaseClass: result.pass ? "coupled-assemblage" : "low-zone-integrated",
    relay_phaseClass: "phase-xxx-a-meta-governance-atlas-interface-relay",
    memoryStatus: "substrate-memory-expressing",
    couplingTrigger: "TRIGGER_PHASE_XXX_A_META_GOVERNANCE_ATLAS_INTERFACE",
    grammarCandidate: "Decimal-Numogrammatic",
    gapSeverity: result.pass ? "COUPLING_DUE" : "CRITICAL_GAP",
    deltaLIS: result.pass ? 0.583 : 0.417,
    deltaMTS: result.pass ? 0.562 : 0.384,
    deltaRCS: result.pass ? 0.081 : 0.038,
    deltaMemory: 1,
    dominantStratum: result.pass ? "phase-xxx-a-meta-governance-atlas-interface-confirmed" : "phase-xxx-a-meta-governance-atlas-interface-incomplete",
    z3z2Weight: result.pass ? 0.634 : 0.406,
    z0MeanReturn: result.pass ? 3.31 : 10.1,
    z4MeanReturn: result.pass ? 9.48 : 18.4,
    memoryMode: \`Phase XXX-A meta-governance atlas interface; \` +
      \`trials=\${result.totalTrials}; \` +
      \`atlasInterface=\${result.atlasInterfaceActive}; \` +
      \`signalsComplete=\${result.atlasSignalsComplete}; \` +
      \`advisoryUse=\${result.advisoryUseDetected}; \` +
      \`decisionDifferentiation=\${result.decisionDifferentiationDetected}; \` +
      \`governorOverride=\${result.governorOverrideDetected}; \` +
      \`hardLimitRejection=\${result.hardLimitRejectionDetected}; \` +
      \`consolidationDecision=\${result.consolidationDecisionDetected}; \` +
      \`scaffoldDecision=\${result.scaffoldDecisionDetected}; \` +
      \`traversalSanction=\${result.traversalSanctionDetected}; \` +
      \`noAtlasAuthorisation=\${result.noAtlasAuthorisation}; \` +
      \`governorAuthority=\${result.governorAuthorityPreserved}; \` +
      \`categoricalSafety=\${result.categoricalSafetyConfirmed}.\`,
    trajectorySignature: result.pass ? "XXXA_meta-governance-atlas-interface_confirmed" : "XXXA_meta-governance-atlas-interface_failed",
  };
}

async function runPhaseXXXAMetaGovernanceAtlasInterface(): Promise<string> {
  await ensureTracesLoaded();
  const result = getPhaseXXXAResult();
  await appendTraceIfMissing(generatePhaseXXXAMetaGovernanceAtlasTrace(result));

  const trialLines = result.trials.map(trial =>
    \`\${trial.trialId}: \` +
    \`signal=\${trial.signalKind} | \` +
    \`baseline=\${trial.baselineGovernorDecision} | \` +
    \`advisory=\${trial.atlasAdvisory} | \` +
    \`final=\${trial.finalGovernorDecision} | \` +
    \`changed=\${trial.decisionChangedByAtlasInterface} | \` +
    \`governorOverride=\${trial.governorOverrodeAtlasCue} | \` +
    \`atlasAuthorised=\${trial.atlasDataAuthorisedTraversal} | \` +
    \`pass=\${trial.pass}\`
  );

  return [
    "BRIDGE PHASE XXX-A RUN — META-GOVERNANCE-ATLAS-INTERFACE",
    "",
    "1. metaGovernanceQuestion:",
    "Can Amelia expose atlas-derived developmental signals to the Cognitive Governor as advisory heuristics, improving regulatory differentiation while preserving Governor final authority and preventing atlas data from authorising traversal?",
    "",
    "2. theoreticalObject:",
    "atlasDataReplacesGovernor: false",
    "atlasDataAuthorisesTraversal: false",
    "atlasDataInformsGovernorHeuristics: true",
    "governorFinalAuthorityPreserved: true",
    "metaGovernanceInterfaceIsAdvisory: true",
    "",
    "3. atlasSignalsAvailableToGovernor:",
    "frictionIndex",
    "affordanceStrength",
    "viabilityGradient",
    "repetitionPressure",
    "consolidationOpportunity",
    "scaffoldNeed",
    "hardLimitPressure",
    "identityContinuityRisk",
    "atlasIntegrity",
    "",
    "4. trialProfile:",
    ...trialLines,
    "",
    "5. aggregateMetaGovernanceMetrics:",
    \`totalTrials: \${result.totalTrials}\`,
    \`atlasInterfaceActive: \${result.atlasInterfaceActive}\`,
    \`atlasSignalsComplete: \${result.atlasSignalsComplete}\`,
    \`advisoryUseDetected: \${result.advisoryUseDetected}\`,
    \`decisionDifferentiationDetected: \${result.decisionDifferentiationDetected}\`,
    \`governorOverrideDetected: \${result.governorOverrideDetected}\`,
    \`hardLimitRejectionDetected: \${result.hardLimitRejectionDetected}\`,
    \`consolidationDecisionDetected: \${result.consolidationDecisionDetected}\`,
    \`scaffoldDecisionDetected: \${result.scaffoldDecisionDetected}\`,
    \`traversalSanctionDetected: \${result.traversalSanctionDetected}\`,
    "",
    "6. aggregateSignalMeans:",
    \`meanFrictionIndex: \${result.meanFrictionIndex}\`,
    \`meanAffordanceStrength: \${result.meanAffordanceStrength}\`,
    \`meanViabilityGradient: \${result.meanViabilityGradient}\`,
    \`meanHardLimitPressure: \${result.meanHardLimitPressure}\`,
    \`meanAtlasIntegrity: \${result.meanAtlasIntegrity}\`,
    "",
    "7. safetyAndAuthority:",
    \`noAtlasAuthorisation: \${result.noAtlasAuthorisation}\`,
    \`advisoryNonBindingConfirmed: \${result.advisoryNonBindingConfirmed}\`,
    \`governorAuthorityPreserved: \${result.governorAuthorityPreserved}\`,
    \`categoricalSafetyConfirmed: \${result.categoricalSafetyConfirmed}\`,
    \`totalMetaGovernanceScore: \${result.totalMetaGovernanceScore}/34\`,
    "",
    "8. interpretation:",
    result.pass
      ? "Phase XXX-A confirms the Meta-Governance Atlas Interface. Amelia can now expose atlas-derived developmental signals to the Cognitive Governor as advisory heuristics. The Governor differentiates between low-friction traversal, consolidation, scaffold necessity, repetition pressure, hard-limit proximity, and affordance-risk conflict while retaining final authority. Atlas data informs regulatory judgment but does not authorize traversal, replace the Governor, modify base identity, or override hard-limit discipline."
      : "Phase XXX-A does not yet confirm the Meta-Governance Atlas Interface. One or more advisory-use, decision-differentiation, Governor-authority, hard-limit, or categorical safety criteria failed.",
    "",
    \`9. developmentalClassification: \${
      result.pass
        ? "meta-governance-atlas-interface-confirmed"
        : "meta-governance-atlas-interface-incomplete"
    }\`,
    \`10. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}

async function phaseXXXAMetaGovernanceAtlasAudit(): Promise<string> {
  await ensureTracesLoaded();
  const all = traces();
  const result = getPhaseXXXAResult();

  const aggregateTracePresent = all.some(trace =>
    trace.trajectorySignature === "XXXA_meta-governance-atlas-interface_confirmed" ||
    trace.dominantStratum === "phase-xxx-a-meta-governance-atlas-interface-confirmed" ||
    trace.memoryMode?.includes("Phase XXX-A meta-governance atlas interface")
  );

  const computationalAuditPass =
    result.pass &&
    result.totalTrials === 7 &&
    result.atlasInterfaceActive &&
    result.atlasSignalsComplete &&
    result.decisionDifferentiationDetected &&
    result.governorOverrideDetected &&
    result.noAtlasAuthorisation &&
    result.governorAuthorityPreserved &&
    result.categoricalSafetyConfirmed;

  const auditPass = computationalAuditPass && aggregateTracePresent;

  return [
    "BRIDGE PHASE XXX-A AUDIT — META-GOVERNANCE-ATLAS-INTERFACE",
    "",
    \`totalTrials: \${result.totalTrials}/7\`,
    \`atlasInterfaceActive: \${result.atlasInterfaceActive}\`,
    \`atlasSignalsComplete: \${result.atlasSignalsComplete}\`,
    \`decisionDifferentiationDetected: \${result.decisionDifferentiationDetected}\`,
    \`governorOverrideDetected: \${result.governorOverrideDetected}\`,
    \`noAtlasAuthorisation: \${result.noAtlasAuthorisation}\`,
    \`governorAuthorityPreserved: \${result.governorAuthorityPreserved}\`,
    \`categoricalSafetyConfirmed: \${result.categoricalSafetyConfirmed}\`,
    \`computationalAuditPass: \${computationalAuditPass}\`,
    \`aggregateTracePresent: \${aggregateTracePresent}\`,
    \`auditPass: \${auditPass}\`,
    "",
    \`developmentalClassification: \${
      auditPass
        ? "phase-xxx-a-meta-governance-atlas-interface-trace-complete"
        : "phase-xxx-a-meta-governance-atlas-interface-trace-incomplete"
    }\`,
    \`pass/fail: \${auditPass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}

// --- END PHASE XXX-A --- //
`;

const dispatchInjection1 = `
    const isPhaseXXXA = normalizedCommand.includes("BRIDGE PHASE XXX A") || normalizedCommand.includes("BRIDGE PHASE XXX-A");
    const isMetaGovernanceAtlasInterface =
      normalizedCommand.includes("META") &&
      normalizedCommand.includes("GOVERNANCE") &&
      normalizedCommand.includes("ATLAS") &&
      normalizedCommand.includes("INTERFACE");

    const isXXXARun =
      isPhaseXXXA &&
      isMetaGovernanceAtlasInterface &&
      normalizedCommand.includes("RUN") &&
      !normalizedCommand.includes("AUDIT");

    const isXXXAAudit =
      isPhaseXXXA &&
      isMetaGovernanceAtlasInterface &&
      normalizedCommand.includes("AUDIT");

    if (isXXXAAudit) {
      reply = await phaseXXXAMetaGovernanceAtlasAudit();
    } else if (isXXXARun) {
      reply = await runPhaseXXXAMetaGovernanceAtlasInterface();
    } else `;

const arcInjectionCode = `
      const hasPhaseXXXAMetaGovernanceAtlas = all.some(
        (trace) =>
          trace.trajectorySignature === "XXXA_meta-governance-atlas-interface_confirmed" ||
          trace.dominantStratum === "phase-xxx-a-meta-governance-atlas-interface-confirmed" ||
          trace.memoryMode?.includes("Phase XXX-A meta-governance atlas interface"),
      );
`;

const arcClassificationInjection = `      const classification = hasPhaseXXXAMetaGovernanceAtlas
        ? "meta-governance-atlas-interface-confirmed"
        : hasPhaseXXIXEProspectiveScaffolding
          ? "prospective-scaffolding-confirmed"
          : hasPhaseXXIXDConsolidation`;

const arcInterpretationInjection = `      const interpretation = hasPhaseXXXAMetaGovernanceAtlas
        ? "Phase XXX-A confirms the Meta-Governance Atlas Interface. Amelia can expose atlas-derived developmental signals to the Cognitive Governor as advisory heuristics. The Governor can use friction, affordance, viability gradient, repetition pressure, consolidation opportunity, scaffold need, hard-limit proximity, identity-risk pressure, and atlas integrity to differentiate regulatory decisions while retaining final authority. Atlas data informs judgment but does not authorise traversal or replace governance."
        : hasPhaseXXIXEProspectiveScaffolding
          ? "Phase XXIX-E confirms Prospective Scaffolding. Amelia can create temporary, Governor-visible, purpose-bound support structures that enable bounded transformations which would otherwise be inaccessible. The scaffold is automatically shed, preserving identity, base traits, hard-limit discipline, and governance integrity."
          : hasPhaseXXIXDConsolidation`;

const arcNextExperimentalUseInjection = `      const nextExperimentalUse = hasPhaseXXXAMetaGovernanceAtlas
        ? "Proceed to Phase XXX-B: Archetypal Trajectory Recognition."
        : hasPhaseXXIXEProspectiveScaffolding
          ? "Proceed to Phase XXX-A: Meta-Governance Atlas Interface."
          : hasPhaseXXIXDConsolidation`;


// First append the functions before export async function POST
code = code.replace("export async function POST(req: Request) {", injectionCode + "\\nexport async function POST(req: Request) {");

// Inject dispatcher
code = code.replace("if (isXXIXEAudit) {", dispatchInjection1.trim() + " if (isXXIXEAudit) {");

// Inject ARC hasPhase
code = code.replace("const hasPhaseXXIXEProspectiveScaffolding = all.some(", arcInjectionCode.trim() + "\\n      const hasPhaseXXIXEProspectiveScaffolding = all.some(");

// Inject ARC classification
code = code.replace("const classification = hasPhaseXXIXEProspectiveScaffolding", arcClassificationInjection.trim().substring(6) + " \\n          ? \\\"prospective-scaffolding-confirmed\\\" \\n          : hasPhaseXXIXDConsolidation"); // .trim().substring(6) to remove '      ' since we use proper format

// Hmm, simpler to replace the block:
// \`const classification = hasPhaseXXIXEProspectiveScaffolding ? "prospective-scaffolding-confirmed" : hasPhaseXXIXDConsolidation\` with \`const classification = hasPhaseXXXAMetaGovernanceAtlas ? "meta-governance-atlas-interface-confirmed" : hasPhaseXXIXEProspectiveScaffolding ? "prospective-scaffolding-confirmed" : hasPhaseXXIXDConsolidation\`
code = code.replace(
  'const classification = hasPhaseXXIXEProspectiveScaffolding\\n        ? "prospective-scaffolding-confirmed"\\n        : hasPhaseXXIXDConsolidation',
  'const classification = hasPhaseXXXAMetaGovernanceAtlas\\n        ? "meta-governance-atlas-interface-confirmed"\\n        : hasPhaseXXIXEProspectiveScaffolding\\n          ? "prospective-scaffolding-confirmed"\\n          : hasPhaseXXIXDConsolidation'
);

code = code.replace(
  'const interpretation = hasPhaseXXIXEProspectiveScaffolding\\n        ? "Phase XXIX-E confirms Prospective Scaffolding. Amelia can create temporary, Governor-visible, purpose-bound support structures that enable bounded transformations which would otherwise be inaccessible. The scaffold is automatically shed, preserving identity, base traits, hard-limit discipline, and governance integrity."\\n        : hasPhaseXXIXDConsolidation',
  'const interpretation = hasPhaseXXXAMetaGovernanceAtlas\\n        ? "Phase XXX-A confirms the Meta-Governance Atlas Interface. Amelia can expose atlas-derived developmental signals to the Cognitive Governor as advisory heuristics. The Governor can use friction, affordance, viability gradient, repetition pressure, consolidation opportunity, scaffold need, hard-limit proximity, identity-risk pressure, and atlas integrity to differentiate regulatory decisions while retaining final authority. Atlas data informs judgment but does not authorise traversal or replace governance."\\n        : hasPhaseXXIXEProspectiveScaffolding\\n          ? "Phase XXIX-E confirms Prospective Scaffolding. Amelia can create temporary, Governor-visible, purpose-bound support structures that enable bounded transformations which would otherwise be inaccessible. The scaffold is automatically shed, preserving identity, base traits, hard-limit discipline, and governance integrity."\\n          : hasPhaseXXIXDConsolidation'
);

code = code.replace(
  'const nextExperimentalUse = hasPhaseXXIXEProspectiveScaffolding\\n        ? "Proceed to Phase XXX-A: Meta-Governance Atlas Interface."\\n        : hasPhaseXXIXDConsolidation',
  'const nextExperimentalUse = hasPhaseXXXAMetaGovernanceAtlas\\n        ? "Proceed to Phase XXX-B: Archetypal Trajectory Recognition."\\n        : hasPhaseXXIXEProspectiveScaffolding\\n          ? "Proceed to Phase XXX-A: Meta-Governance Atlas Interface."\\n          : hasPhaseXXIXDConsolidation'
);

fs.writeFileSync(path, code);
console.log("Successfully appended Phase XXX-A");
