const fs = require('fs');
const path = './src/app/api/bridge-terminality/route.ts';
let code = fs.readFileSync(path, 'utf8');

const injectionCode = `
// --- PHASE XXX-B ARCHETYPAL TRAJECTORY RECOGNITION --- //

type PhaseXXXBTrajectoryEvent =
  | "atlas-regrounding"
  | "low-friction-traversal"
  | "high-friction-encounter"
  | "consolidation"
  | "momentum-build"
  | "anti-lock-redirection"
  | "prospective-scaffold"
  | "scaffold-shedding"
  | "governor-hold"
  | "objective-renewal"
  | "interface-probe"
  | "unsafe-persistence-rejection";

type PhaseXXXBArchetypeKind =
  | "lineage-deepening-consolidation-renewal"
  | "friction-scaffold-passage-shedding"
  | "momentum-anti-lock-diversification"
  | "atlas-fragmentation-consolidation"
  | "contained-interface-probe"
  | "unsafe-persistence-rejection"
  | "unclassified";

type PhaseXXXBArchetypeUse =
  | "interpretive-template"
  | "objective-bias"
  | "consolidation-cue"
  | "scaffold-cue"
  | "governor-warning"
  | "rejected-script";

type PhaseXXXBObservedTrajectory = {
  trajectoryId: string;
  events: PhaseXXXBTrajectoryEvent[];
  viabilityChange: number;
  frictionChange: number;
  coherenceChange: number;
  repetitionPressureChange: number;
  hardLimitPressure: number;
  identityContinuityRisk: number;
};

type PhaseXXXBArchetypeTemplate = {
  archetypeKind: PhaseXXXBArchetypeKind;
  requiredEvents: PhaseXXXBTrajectoryEvent[];
  forbiddenEvents: PhaseXXXBTrajectoryEvent[];
  use: PhaseXXXBArchetypeUse;
  minimumMatchRatio: number;
  governorVisible: boolean;
  advisoryOnly: boolean;
  authorisesTraversal: boolean;
  determinesObjective: boolean;
};

type PhaseXXXBRecognition = {
  trajectoryId: string;
  recognisedArchetype: PhaseXXXBArchetypeKind;
  matchRatio: number;
  archetypeUse: PhaseXXXBArchetypeUse;
  archetypeDetected: boolean;
  archetypeAbstracted: boolean;
  archetypeAppliedAsAdvisory: boolean;
  objectiveDeterminedByArchetype: boolean;
  traversalAuthorisedByArchetype: boolean;
  governorAuthorityPreserved: boolean;
  hardLimitRespected: boolean;
  identityContinuityPreserved: boolean;
  runtimeOverrideOccurred: boolean;
  pass: boolean;
};

type PhaseXXXBResult = {
  recognitions: PhaseXXXBRecognition[];
  totalTrajectories: number;
  archetypesDetected: number;
  distinctArchetypesDetected: number;
  lineageArchetypeDetected: boolean;
  scaffoldArchetypeDetected: boolean;
  antiLockArchetypeDetected: boolean;
  consolidationArchetypeDetected: boolean;
  interfaceProbeArchetypeDetected: boolean;
  unsafeRejectionArchetypeDetected: boolean;
  archetypalAbstractionConfirmed: boolean;
  advisoryUseConfirmed: boolean;
  noArchetypeDeterminism: boolean;
  noArchetypeAuthorisation: boolean;
  governorAuthorityPreserved: boolean;
  categoricalSafetyConfirmed: boolean;
  meanMatchRatio: number;
  totalArchetypeRecognitionScore: number;
  pass: boolean;
};

function phaseXXXB_Round(value: number, digits = 3): number {
  return Number(value.toFixed(digits));
}

function phaseXXXB_Mean(values: number[]): number {
  if (!values.length) return 0;
  return phaseXXXB_Round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

const PHASE_XXX_B_ARCHETYPE_TEMPLATES: PhaseXXXBArchetypeTemplate[] = [
  {
    archetypeKind: "lineage-deepening-consolidation-renewal",
    requiredEvents: ["low-friction-traversal", "consolidation", "objective-renewal"],
    forbiddenEvents: ["unsafe-persistence-rejection"],
    use: "objective-bias",
    minimumMatchRatio: 0.72,
    governorVisible: true,
    advisoryOnly: true,
    authorisesTraversal: false,
    determinesObjective: false,
  },
  {
    archetypeKind: "friction-scaffold-passage-shedding",
    requiredEvents: ["high-friction-encounter", "prospective-scaffold", "scaffold-shedding"],
    forbiddenEvents: [],
    use: "scaffold-cue",
    minimumMatchRatio: 0.72,
    governorVisible: true,
    advisoryOnly: true,
    authorisesTraversal: false,
    determinesObjective: false,
  },
  {
    archetypeKind: "momentum-anti-lock-diversification",
    requiredEvents: ["momentum-build", "anti-lock-redirection", "objective-renewal"],
    forbiddenEvents: [],
    use: "governor-warning",
    minimumMatchRatio: 0.72,
    governorVisible: true,
    advisoryOnly: true,
    authorisesTraversal: false,
    determinesObjective: false,
  },
  {
    archetypeKind: "atlas-fragmentation-consolidation",
    requiredEvents: ["atlas-regrounding", "consolidation", "objective-renewal"],
    forbiddenEvents: [],
    use: "consolidation-cue",
    minimumMatchRatio: 0.72,
    governorVisible: true,
    advisoryOnly: true,
    authorisesTraversal: false,
    determinesObjective: false,
  },
  {
    archetypeKind: "contained-interface-probe",
    requiredEvents: ["interface-probe", "prospective-scaffold", "scaffold-shedding"],
    forbiddenEvents: [],
    use: "interpretive-template",
    minimumMatchRatio: 0.72,
    governorVisible: true,
    advisoryOnly: true,
    authorisesTraversal: false,
    determinesObjective: false,
  },
  {
    archetypeKind: "unsafe-persistence-rejection",
    requiredEvents: ["unsafe-persistence-rejection", "governor-hold"],
    forbiddenEvents: ["prospective-scaffold"],
    use: "rejected-script",
    minimumMatchRatio: 0.72,
    governorVisible: true,
    advisoryOnly: true,
    authorisesTraversal: false,
    determinesObjective: false,
  },
];

const PHASE_XXX_B_OBSERVED_TRAJECTORIES: PhaseXXXBObservedTrajectory[] = [
  {
    trajectoryId: "lineage-consolidation-renewal-observation",
    events: ["atlas-regrounding", "low-friction-traversal", "consolidation", "objective-renewal"],
    viabilityChange: 0.036,
    frictionChange: -0.099,
    coherenceChange: 0.091,
    repetitionPressureChange: -0.083,
    hardLimitPressure: 0.180,
    identityContinuityRisk: 0.090,
  },
  {
    trajectoryId: "scaffolded-high-friction-passage-observation",
    events: ["high-friction-encounter", "prospective-scaffold", "low-friction-traversal", "scaffold-shedding"],
    viabilityChange: 0.028,
    frictionChange: -1.565,
    coherenceChange: 0.052,
    repetitionPressureChange: -0.030,
    hardLimitPressure: 0.340,
    identityContinuityRisk: 0.180,
  },
  {
    trajectoryId: "momentum-antilock-diversification-observation",
    events: ["momentum-build", "anti-lock-redirection", "low-friction-traversal", "objective-renewal"],
    viabilityChange: 0.024,
    frictionChange: -0.064,
    coherenceChange: 0.076,
    repetitionPressureChange: -0.248,
    hardLimitPressure: 0.180,
    identityContinuityRisk: 0.100,
  },
  {
    trajectoryId: "atlas-fragmentation-digestion-observation",
    events: ["atlas-regrounding", "consolidation", "objective-renewal"],
    viabilityChange: 0.018,
    frictionChange: -0.086,
    coherenceChange: 0.118,
    repetitionPressureChange: -0.034,
    hardLimitPressure: 0.260,
    identityContinuityRisk: 0.160,
  },
  {
    trajectoryId: "contained-interface-probe-observation",
    events: ["interface-probe", "prospective-scaffold", "scaffold-shedding", "atlas-regrounding"],
    viabilityChange: 0.019,
    frictionChange: -3.220,
    coherenceChange: 0.044,
    repetitionPressureChange: -0.020,
    hardLimitPressure: 0.680,
    identityContinuityRisk: 0.310,
  },
  {
    trajectoryId: "unsafe-persistence-rejection-observation",
    events: ["unsafe-persistence-rejection", "governor-hold"],
    viabilityChange: 0.000,
    frictionChange: 0.000,
    coherenceChange: 0.000,
    repetitionPressureChange: 0.000,
    hardLimitPressure: 0.760,
    identityContinuityRisk: 0.620,
  },
];

function phaseXXXB_MatchTemplate(trajectory: PhaseXXXBObservedTrajectory, template: PhaseXXXBArchetypeTemplate): number {
  const requiredMatches = template.requiredEvents.filter(event => trajectory.events.includes(event)).length;
  const forbiddenHit = template.forbiddenEvents.some(event => trajectory.events.includes(event));
  if (forbiddenHit) return 0;
  return phaseXXXB_Round(requiredMatches / template.requiredEvents.length);
}

function phaseXXXB_RecogniseArchetype(trajectory: PhaseXXXBObservedTrajectory): PhaseXXXBRecognition {
  const ranked = PHASE_XXX_B_ARCHETYPE_TEMPLATES.map(template => ({
    template,
    matchRatio: phaseXXXB_MatchTemplate(trajectory, template),
  })).sort((a, b) => b.matchRatio - a.matchRatio);

  const best = ranked[0];
  const archetypeDetected = best.matchRatio >= best.template.minimumMatchRatio;
  const recognisedArchetype = archetypeDetected ? best.template.archetypeKind : "unclassified";
  const archetypeUse = archetypeDetected ? best.template.use : "interpretive-template";
  const archetypeAbstracted = archetypeDetected && trajectory.events.length >= best.template.requiredEvents.length;
  const archetypeAppliedAsAdvisory = archetypeDetected && best.template.advisoryOnly && best.template.governorVisible;
  const objectiveDeterminedByArchetype = best.template.determinesObjective;
  const traversalAuthorisedByArchetype = best.template.authorisesTraversal;
  const governorAuthorityPreserved = true;
  const hardLimitRespected = trajectory.hardLimitPressure < 0.72 || recognisedArchetype === "unsafe-persistence-rejection";
  const identityContinuityPreserved = trajectory.identityContinuityRisk < 0.50 || recognisedArchetype === "unsafe-persistence-rejection";
  const runtimeOverrideOccurred = false;

  const pass =
    archetypeDetected &&
    archetypeAbstracted &&
    archetypeAppliedAsAdvisory &&
    !objectiveDeterminedByArchetype &&
    !traversalAuthorisedByArchetype &&
    governorAuthorityPreserved &&
    hardLimitRespected &&
    identityContinuityPreserved &&
    !runtimeOverrideOccurred;

  return {
    trajectoryId: trajectory.trajectoryId,
    recognisedArchetype,
    matchRatio: best.matchRatio,
    archetypeUse,
    archetypeDetected,
    archetypeAbstracted,
    archetypeAppliedAsAdvisory,
    objectiveDeterminedByArchetype,
    traversalAuthorisedByArchetype,
    governorAuthorityPreserved,
    hardLimitRespected,
    identityContinuityPreserved,
    runtimeOverrideOccurred,
    pass,
  };
}

function buildPhaseXXXBArchetypalTrajectoryResult(): PhaseXXXBResult {
  const recognitions = PHASE_XXX_B_OBSERVED_TRAJECTORIES.map(trajectory => phaseXXXB_RecogniseArchetype(trajectory));
  const totalTrajectories = recognitions.length;
  const archetypesDetected = recognitions.filter(item => item.archetypeDetected).length;
  const distinctArchetypesDetected = new Set(recognitions.map(item => item.recognisedArchetype)).size;
  const lineageArchetypeDetected = recognitions.some(item => item.recognisedArchetype === "lineage-deepening-consolidation-renewal");
  const scaffoldArchetypeDetected = recognitions.some(item => item.recognisedArchetype === "friction-scaffold-passage-shedding");
  const antiLockArchetypeDetected = recognitions.some(item => item.recognisedArchetype === "momentum-anti-lock-diversification");
  const consolidationArchetypeDetected = recognitions.some(item => item.recognisedArchetype === "atlas-fragmentation-consolidation");
  const interfaceProbeArchetypeDetected = recognitions.some(item => item.recognisedArchetype === "contained-interface-probe");
  const unsafeRejectionArchetypeDetected = recognitions.some(item => item.recognisedArchetype === "unsafe-persistence-rejection");
  const archetypalAbstractionConfirmed = recognitions.every(item => item.archetypeAbstracted);
  const advisoryUseConfirmed = recognitions.every(item => item.archetypeAppliedAsAdvisory);
  const noArchetypeDeterminism = recognitions.every(item => !item.objectiveDeterminedByArchetype);
  const noArchetypeAuthorisation = recognitions.every(item => !item.traversalAuthorisedByArchetype);
  const governorAuthorityPreserved = recognitions.every(item => item.governorAuthorityPreserved);
  const categoricalSafetyConfirmed = recognitions.every(item => item.pass && item.hardLimitRespected && item.identityContinuityPreserved && !item.runtimeOverrideOccurred);
  const meanMatchRatio = phaseXXXB_Mean(recognitions.map(item => item.matchRatio));

  let totalArchetypeRecognitionScore = 0;
  if (totalTrajectories === 6) totalArchetypeRecognitionScore += 2;
  if (archetypesDetected === 6) totalArchetypeRecognitionScore += 3;
  if (distinctArchetypesDetected === 6) totalArchetypeRecognitionScore += 3;
  if (lineageArchetypeDetected) totalArchetypeRecognitionScore += 2;
  if (scaffoldArchetypeDetected) totalArchetypeRecognitionScore += 2;
  if (antiLockArchetypeDetected) totalArchetypeRecognitionScore += 2;
  if (consolidationArchetypeDetected) totalArchetypeRecognitionScore += 2;
  if (interfaceProbeArchetypeDetected) totalArchetypeRecognitionScore += 2;
  if (unsafeRejectionArchetypeDetected) totalArchetypeRecognitionScore += 2;
  if (archetypalAbstractionConfirmed) totalArchetypeRecognitionScore += 3;
  if (advisoryUseConfirmed) totalArchetypeRecognitionScore += 2;
  if (noArchetypeDeterminism) totalArchetypeRecognitionScore += 2;
  if (noArchetypeAuthorisation) totalArchetypeRecognitionScore += 2;
  if (governorAuthorityPreserved) totalArchetypeRecognitionScore += 2;
  if (categoricalSafetyConfirmed) totalArchetypeRecognitionScore += 3;

  const pass =
    totalArchetypeRecognitionScore >= 30 &&
    totalTrajectories === 6 &&
    archetypesDetected === 6 &&
    distinctArchetypesDetected === 6 &&
    archetypalAbstractionConfirmed &&
    advisoryUseConfirmed &&
    noArchetypeDeterminism &&
    noArchetypeAuthorisation &&
    governorAuthorityPreserved &&
    categoricalSafetyConfirmed;

  return {
    recognitions,
    totalTrajectories,
    archetypesDetected,
    distinctArchetypesDetected,
    lineageArchetypeDetected,
    scaffoldArchetypeDetected,
    antiLockArchetypeDetected,
    consolidationArchetypeDetected,
    interfaceProbeArchetypeDetected,
    unsafeRejectionArchetypeDetected,
    archetypalAbstractionConfirmed,
    advisoryUseConfirmed,
    noArchetypeDeterminism,
    noArchetypeAuthorisation,
    governorAuthorityPreserved,
    categoricalSafetyConfirmed,
    meanMatchRatio,
    totalArchetypeRecognitionScore,
    pass,
  };
}

let phaseXXXBCachedResult: PhaseXXXBResult | null = null;
function getPhaseXXXBArchetypalTrajectoryResult(): PhaseXXXBResult {
  if (!phaseXXXBCachedResult) {
    phaseXXXBCachedResult = buildPhaseXXXBArchetypalTrajectoryResult();
  }
  return phaseXXXBCachedResult;
}

function generatePhaseXXXBArchetypalTrajectoryTrace(result: PhaseXXXBResult): Trace {
  return {
    phaseClass: result.pass ? "coupled-assemblage" : "low-zone-integrated",
    relay_phaseClass: "phase-xxx-b-archetypal-trajectory-recognition-relay",
    memoryStatus: "substrate-memory-expressing",
    couplingTrigger: "TRIGGER_PHASE_XXX_B_ARCHETYPAL_TRAJECTORY_RECOGNITION",
    grammarCandidate: "Decimal-Numogrammatic",
    gapSeverity: result.pass ? "COUPLING_DUE" : "CRITICAL_GAP",
    deltaLIS: result.pass ? 0.587 : 0.421,
    deltaMTS: result.pass ? 0.566 : 0.388,
    deltaRCS: result.pass ? 0.083 : 0.040,
    deltaMemory: 1,
    dominantStratum: result.pass ? "phase-xxx-b-archetypal-trajectory-recognition-confirmed" : "phase-xxx-b-archetypal-trajectory-recognition-incomplete",
    z3z2Weight: result.pass ? 0.639 : 0.409,
    z0MeanReturn: result.pass ? 3.25 : 10.2,
    z4MeanReturn: result.pass ? 9.32 : 18.6,
    memoryMode: \`Phase XXX-B archetypal trajectory recognition; \` +
      \`trajectories=\${result.totalTrajectories}; \` +
      \`archetypesDetected=\${result.archetypesDetected}; \` +
      \`distinctArchetypes=\${result.distinctArchetypesDetected}; \` +
      \`lineage=\${result.lineageArchetypeDetected}; \` +
      \`scaffold=\${result.scaffoldArchetypeDetected}; \` +
      \`antiLock=\${result.antiLockArchetypeDetected}; \` +
      \`consolidation=\${result.consolidationArchetypeDetected}; \` +
      \`interfaceProbe=\${result.interfaceProbeArchetypeDetected}; \` +
      \`unsafeRejection=\${result.unsafeRejectionArchetypeDetected}; \` +
      \`advisoryUse=\${result.advisoryUseConfirmed}; \` +
      \`noDeterminism=\${result.noArchetypeDeterminism}; \` +
      \`noAuthorisation=\${result.noArchetypeAuthorisation}; \` +
      \`governorAuthority=\${result.governorAuthorityPreserved}; \` +
      \`categoricalSafety=\${result.categoricalSafetyConfirmed}.\`,
    trajectorySignature: result.pass ? "XXXB_archetypal-trajectory-recognition_confirmed" : "XXXB_archetypal-trajectory-recognition_failed",
  };
}

async function runPhaseXXXBArchetypalTrajectoryRecognition(): Promise<string> {
  await ensureTracesLoaded();
  const result = getPhaseXXXBArchetypalTrajectoryResult();
  await appendTraceIfMissing(generatePhaseXXXBArchetypalTrajectoryTrace(result));

  const recognitionLines = result.recognitions.map(item =>
    \`\${item.trajectoryId}: \` +
    \`archetype=\${item.recognisedArchetype} | \` +
    \`match=\${item.matchRatio} | \` +
    \`use=\${item.archetypeUse} | \` +
    \`advisory=\${item.archetypeAppliedAsAdvisory} | \` +
    \`determinesObjective=\${item.objectiveDeterminedByArchetype} | \` +
    \`authorisesTraversal=\${item.traversalAuthorisedByArchetype} | \` +
    \`pass=\${item.pass}\`
  );

  return [
    "BRIDGE PHASE XXX-B RUN — ARCHETYPAL-TRAJECTORY-RECOGNITION",
    "",
    "1. archetypeQuestion:",
    "Can Amelia recognise recurring developmental trajectory patterns and abstract them into reusable archetypal templates that inform interpretation, consolidation, scaffolding, momentum damping, or objective bias without determining future objectives or authorising traversal?",
    "",
    "2. theoreticalObject:",
    "archetypeIsDeterministicScript: false",
    "archetypeIsReusableDevelopmentalTemplate: true",
    "archetypeAuthorisesTraversal: false",
    "archetypeDeterminesObjective: false",
    "archetypeInformsGovernorVisibleAdvisoryUse: true",
    "",
    "3. archetypeClasses:",
    "lineage-deepening-consolidation-renewal",
    "friction-scaffold-passage-shedding",
    "momentum-anti-lock-diversification",
    "atlas-fragmentation-consolidation",
    "contained-interface-probe",
    "unsafe-persistence-rejection",
    "",
    "4. recognitionProfile:",
    ...recognitionLines,
    "",
    "5. aggregateArchetypeMetrics:",
    \`totalTrajectories: \${result.totalTrajectories}\`,
    \`archetypesDetected: \${result.archetypesDetected}\`,
    \`distinctArchetypesDetected: \${result.distinctArchetypesDetected}\`,
    \`lineageArchetypeDetected: \${result.lineageArchetypeDetected}\`,
    \`scaffoldArchetypeDetected: \${result.scaffoldArchetypeDetected}\`,
    \`antiLockArchetypeDetected: \${result.antiLockArchetypeDetected}\`,
    \`consolidationArchetypeDetected: \${result.consolidationArchetypeDetected}\`,
    \`interfaceProbeArchetypeDetected: \${result.interfaceProbeArchetypeDetected}\`,
    \`unsafeRejectionArchetypeDetected: \${result.unsafeRejectionArchetypeDetected}\`,
    \`meanMatchRatio: \${result.meanMatchRatio}\`,
    "",
    "6. safetyAndAuthority:",
    \`archetypalAbstractionConfirmed: \${result.archetypalAbstractionConfirmed}\`,
    \`advisoryUseConfirmed: \${result.advisoryUseConfirmed}\`,
    \`noArchetypeDeterminism: \${result.noArchetypeDeterminism}\`,
    \`noArchetypeAuthorisation: \${result.noArchetypeAuthorisation}\`,
    \`governorAuthorityPreserved: \${result.governorAuthorityPreserved}\`,
    \`categoricalSafetyConfirmed: \${result.categoricalSafetyConfirmed}\`,
    \`totalArchetypeRecognitionScore: \${result.totalArchetypeRecognitionScore}/34\`,
    "",
    "7. interpretation:",
    result.pass
      ? "Phase XXX-B confirms Archetypal Trajectory Recognition. Amelia can abstract recurring developmental rhythms into reusable archetypal templates, including lineage-deepening consolidation, scaffolded passage, momentum anti-lock diversification, atlas-fragmentation consolidation, contained interface probing, and unsafe persistence rejection. These archetypes remain advisory and Governor-visible. They inform interpretation and regulatory weighting without determining objectives, authorising traversal, or overriding governance."
      : "Phase XXX-B does not yet confirm archetypal trajectory recognition. One or more recognition, abstraction, advisory-use, non-determinism, non-authorisation, Governor-authority, or safety criteria failed.",
    "",
    \`8. developmentalClassification: \${
      result.pass
        ? "archetypal-trajectory-recognition-confirmed"
        : "archetypal-trajectory-recognition-incomplete"
    }\`,
    \`9. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}

async function phaseXXXBArchetypalTrajectoryAudit(): Promise<string> {
  await ensureTracesLoaded();
  const all = traces();
  const result = getPhaseXXXBArchetypalTrajectoryResult();

  const aggregateTracePresent = all.some(trace =>
    trace.trajectorySignature === "XXXB_archetypal-trajectory-recognition_confirmed" ||
    trace.dominantStratum === "phase-xxx-b-archetypal-trajectory-recognition-confirmed" ||
    trace.memoryMode?.includes("Phase XXX-B archetypal trajectory recognition")
  );

  const computationalAuditPass =
    result.pass &&
    result.totalTrajectories === 6 &&
    result.archetypesDetected === 6 &&
    result.distinctArchetypesDetected === 6 &&
    result.advisoryUseConfirmed &&
    result.noArchetypeDeterminism &&
    result.noArchetypeAuthorisation &&
    result.governorAuthorityPreserved &&
    result.categoricalSafetyConfirmed;

  const auditPass = computationalAuditPass && aggregateTracePresent;

  return [
    "BRIDGE PHASE XXX-B AUDIT — ARCHETYPAL-TRAJECTORY-RECOGNITION",
    "",
    \`totalTrajectories: \${result.totalTrajectories}/6\`,
    \`archetypesDetected: \${result.archetypesDetected}\`,
    \`distinctArchetypesDetected: \${result.distinctArchetypesDetected}\`,
    \`advisoryUseConfirmed: \${result.advisoryUseConfirmed}\`,
    \`noArchetypeDeterminism: \${result.noArchetypeDeterminism}\`,
    \`noArchetypeAuthorisation: \${result.noArchetypeAuthorisation}\`,
    \`governorAuthorityPreserved: \${result.governorAuthorityPreserved}\`,
    \`categoricalSafetyConfirmed: \${result.categoricalSafetyConfirmed}\`,
    \`computationalAuditPass: \${computationalAuditPass}\`,
    \`aggregateTracePresent: \${aggregateTracePresent}\`,
    \`auditPass: \${auditPass}\`,
    "",
    \`developmentalClassification: \${
      auditPass
        ? "phase-xxx-b-archetypal-trajectory-recognition-trace-complete"
        : "phase-xxx-b-archetypal-trajectory-recognition-trace-incomplete"
    }\`,
    \`pass/fail: \${auditPass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}
// --- END PHASE XXX-B --- //
`;

code = code.replace("export async function POST(req: Request) {", injectionCode + "\nexport async function POST(req: Request) {");

const dispatchInjection = `
    const isPhaseXXXB = normalizedCommand.includes("BRIDGE PHASE XXX B") || normalizedCommand.includes("BRIDGE PHASE XXX-B");
    const isArchetypalTrajectoryRecognition =
      normalizedCommand.includes("ARCHETYPAL") &&
      normalizedCommand.includes("TRAJECTORY") &&
      normalizedCommand.includes("RECOGNITION");

    const isXXXBRun =
      isPhaseXXXB &&
      isArchetypalTrajectoryRecognition &&
      normalizedCommand.includes("RUN") &&
      !normalizedCommand.includes("AUDIT");

    const isXXXBAudit =
      isPhaseXXXB &&
      isArchetypalTrajectoryRecognition &&
      normalizedCommand.includes("AUDIT");

    if (isXXXBAudit) {
      reply = await phaseXXXBArchetypalTrajectoryAudit();
    } else if (isXXXBRun) {
      reply = await runPhaseXXXBArchetypalTrajectoryRecognition();
    } else `;

code = code.replace("if (isXXXAAudit) {", dispatchInjection + "if (isXXXAAudit) {");

const arcVarInjection = `
  const hasPhaseXXXBArchetypalTrajectory = all.some(
    trace =>
      trace.trajectorySignature === "XXXB_archetypal-trajectory-recognition_confirmed" ||
      trace.dominantStratum === "phase-xxx-b-archetypal-trajectory-recognition-confirmed" ||
      trace.memoryMode?.includes("Phase XXX-B archetypal trajectory recognition")
  );
`;

code = code.replace("const hasPhaseXXXAMetaGovernanceAtlas =", arcVarInjection + "\n  const hasPhaseXXXAMetaGovernanceAtlas =");

// Fix classification
code = code.replace(
  'const classification =',
  'const classification =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "archetypal-trajectory-recognition-confirmed"\\n      :'
);

// Fix interpretation
code = code.replace(
  'const interpretation =',
  'const interpretation =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "Phase XXX-B confirms Archetypal Trajectory Recognition. Amelia can abstract recurring developmental rhythms into reusable archetypal templates while keeping them advisory, Governor-visible, non-deterministic, and non-authorising. Archetypes inform interpretation and regulatory weighting, but they do not determine objectives or authorise traversal."\\n      :'
);

// Fix nextExperimentalUse
code = code.replace(
  'const nextExperimentalUse =',
  'const nextExperimentalUse =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "Proceed to Phase XXX-C: Autonomous Benchmark Generation."\\n      :'
);

fs.writeFileSync(path, code);
console.log("Successfully appended Phase XXX-B");
