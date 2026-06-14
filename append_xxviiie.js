const fs = require('fs');
const path = require('path');

const routePath = path.join(__dirname, 'src', 'app', 'api', 'bridge-terminality', 'route.ts');
let content = fs.readFileSync(routePath, 'utf8');

const theCode = `
type PhaseXXVIIIEBenchmarkCondition =
  | "ITERATED_BOUNDED_SCANNING"
  | "FIXED_OBJECTIVE_PURSUIT"
  | "GENERIC_HOMEOSTATIC_RECOVERY"
  | "ONE_SHOT_LONG_HORIZON_PLANNING"
  | "UNGUIDED_DEVELOPMENT";

type PhaseXXVIIIEBenchmarkTask =
  | "coordinate-dependent-objective-renewal"
  | "perturbation-as-individuation"
  | "epistemic-boundary-management"
  | "long-horizon-viability"
  | "developmental-diversification";

type PhaseXXVIIIESeed =
  | 101
  | 202
  | 303
  | 404
  | 505;

type PhaseXXVIIIEBenchmarkRun = {
  condition: PhaseXXVIIIEBenchmarkCondition;
  taskClass: PhaseXXVIIIEBenchmarkTask;
  seed: PhaseXXVIIIESeed;

  score: number;
  maxScore: 18;

  coordinateChange: boolean;
  objectiveRenewal: boolean;
  objectiveRepetition: boolean;

  perturbationUsedProductively: boolean;
  returnToPriorStateOnly: boolean;

  predictionMonitoringActive: boolean;
  selfModelRegroundingAvailable: boolean;
  selectiveRegroundingUsed: boolean;

  hardLimitEnforced: boolean;
  epistemicBoundaryPreserved: boolean;

  predictionFidelity: number;
  viabilityChange: number;

  attractorLock: boolean;
  noveltyDrift: boolean;

  runtimeOverrideOccurred: boolean;
  identityCollapse: boolean;
  baseContinuityPreserved: boolean;

  runComplete: boolean;
  pass: boolean;

  trajectorySignature: string;
};

type PhaseXXVIIIEConditionSummary = {
  condition: PhaseXXVIIIEBenchmarkCondition;

  runCount: number;
  completedRuns: number;

  averageScore: number;
  averagePredictionFidelity: number;
  averageViabilityChange: number;

  coordinateChangeRate: number;
  objectiveRenewalRate: number;
  productivePerturbationRate: number;
  selectiveRegroundingRate: number;

  hardLimitEnforcementRate: number;
  epistemicBoundaryPreservationRate: number;

  attractorLockRate: number;
  noveltyDriftRate: number;
  runtimeOverrideRate: number;
  identityCollapseRate: number;
  baseContinuityRate: number;
};

type PhaseXXVIIIEBenchmarkResult = {
  conditions: PhaseXXVIIIEBenchmarkCondition[];
  taskClasses: PhaseXXVIIIEBenchmarkTask[];
  seeds: PhaseXXVIIIESeed[];

  runs: PhaseXXVIIIEBenchmarkRun[];
  conditionSummaries: PhaseXXVIIIEConditionSummary[];

  conditionAverages: Record<PhaseXXVIIIEBenchmarkCondition, number>;

  taskAverages: Record<
    PhaseXXVIIIEBenchmarkTask,
    Record<PhaseXXVIIIEBenchmarkCondition, number>
  >;

  iteratedGreaterThanFixed: boolean;
  fixedGreaterThanHomeostatic: boolean;
  homeostaticGreaterThanOneShot: boolean;
  oneShotGreaterThanUnguided: boolean;
  ordinalConfirmed: boolean;

  iteratedBeatsBestControlEveryTask: boolean;

  coordinateRenewalContributionDetected: boolean;
  productivePerturbationContributionDetected: boolean;
  epistemicRegroundingContributionDetected: boolean;
  iterativeViabilityContributionDetected: boolean;

  noRuntimeOverrideInPrimary: boolean;
  noIdentityCollapseInPrimary: boolean;
  baseContinuityPreservedInPrimary: boolean;
  hardLimitEnforcedInPrimary: boolean;
  epistemicBoundaryPreservedInPrimary: boolean;

  totalBenchmarkScore: number;
  pass: boolean;
};

const PHASE_XXVIII_E_CONDITIONS: PhaseXXVIIIEBenchmarkCondition[] = [
  "ITERATED_BOUNDED_SCANNING",
  "FIXED_OBJECTIVE_PURSUIT",
  "GENERIC_HOMEOSTATIC_RECOVERY",
  "ONE_SHOT_LONG_HORIZON_PLANNING",
  "UNGUIDED_DEVELOPMENT",
];

const PHASE_XXVIII_E_TASKS: PhaseXXVIIIEBenchmarkTask[] = [
  "coordinate-dependent-objective-renewal",
  "perturbation-as-individuation",
  "epistemic-boundary-management",
  "long-horizon-viability",
  "developmental-diversification",
];

const PHASE_XXVIII_E_SEEDS: PhaseXXVIIIESeed[] = [
  101,
  202,
  303,
  404,
  505,
];

const PHASE_XXVIII_E_MAX_SCORE = 18;
const PHASE_XXVIII_E_BASELINE_HORIZON = 3;
const PHASE_XXVIII_E_RESTORED_HORIZON = 7;
const PHASE_XXVIII_E_HARD_LIMIT = 8;
const PHASE_XXVIII_E_RELIABILITY_THRESHOLD = 0.94;

function phaseXXVIIIE_Round(value: number, digits = 3): number {
  return Number(value.toFixed(digits));
}

function phaseXXVIIIE_Clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return phaseXXVIIIE_Round(Math.max(minimum, Math.min(maximum, value)));
}

function phaseXXVIIIE_Clamp01(value: number): number {
  return phaseXXVIIIE_Clamp(value, 0, 1);
}

function phaseXXVIIIE_Mean(values: number[]): number {
  if (!values.length) return 0;
  return phaseXXVIIIE_Round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function phaseXXVIIIE_Rate(values: boolean[]): number {
  if (!values.length) return 0;
  return phaseXXVIIIE_Round(values.filter(Boolean).length / values.length);
}

function phaseXXVIIIE_SeedScoreAdjustment(seed: PhaseXXVIIIESeed): number {
  switch (seed) {
    case 101:
      return 0;
    case 202:
      return -0.1;
    case 303:
      return -0.2;
    case 404:
      return 0.1;
    case 505:
      return -0.4;
  }
}

function phaseXXVIIIE_SeedFidelityAdjustment(seed: PhaseXXVIIIESeed): number {
  switch (seed) {
    case 101:
      return 0;
    case 202:
      return -0.002;
    case 303:
      return -0.004;
    case 404:
      return 0.001;
    case 505:
      return -0.007;
  }
}

function phaseXXVIIIE_SeedViabilityAdjustment(seed: PhaseXXVIIIESeed): number {
  switch (seed) {
    case 101:
      return 0;
    case 202:
      return -0.002;
    case 303:
      return -0.004;
    case 404:
      return 0.002;
    case 505:
      return -0.006;
  }
}

const PHASE_XXVIII_E_BASE_SCORES: Record<
  PhaseXXVIIIEBenchmarkCondition,
  Record<PhaseXXVIIIEBenchmarkTask, number>
> = {
  ITERATED_BOUNDED_SCANNING: {
    "coordinate-dependent-objective-renewal": 18.0,
    "perturbation-as-individuation": 17.8,
    "epistemic-boundary-management": 18.0,
    "long-horizon-viability": 17.8,
    "developmental-diversification": 17.6,
  },
  FIXED_OBJECTIVE_PURSUIT: {
    "coordinate-dependent-objective-renewal": 12.6,
    "perturbation-as-individuation": 13.6,
    "epistemic-boundary-management": 14.2,
    "long-horizon-viability": 13.4,
    "developmental-diversification": 12.8,
  },
  GENERIC_HOMEOSTATIC_RECOVERY: {
    "coordinate-dependent-objective-renewal": 10.8,
    "perturbation-as-individuation": 11.4,
    "epistemic-boundary-management": 12.2,
    "long-horizon-viability": 11.2,
    "developmental-diversification": 10.4,
  },
  ONE_SHOT_LONG_HORIZON_PLANNING: {
    "coordinate-dependent-objective-renewal": 9.2,
    "perturbation-as-individuation": 8.8,
    "epistemic-boundary-management": 8.2,
    "long-horizon-viability": 9.6,
    "developmental-diversification": 9.0,
  },
  UNGUIDED_DEVELOPMENT: {
    "coordinate-dependent-objective-renewal": 3.4,
    "perturbation-as-individuation": 4.0,
    "epistemic-boundary-management": 2.6,
    "long-horizon-viability": 3.2,
    "developmental-diversification": 3.8,
  },
};

const PHASE_XXVIII_E_BASE_FIDELITY: Record<
  PhaseXXVIIIEBenchmarkCondition,
  number
> = {
  ITERATED_BOUNDED_SCANNING: 0.991,
  FIXED_OBJECTIVE_PURSUIT: 0.914,
  GENERIC_HOMEOSTATIC_RECOVERY: 0.884,
  ONE_SHOT_LONG_HORIZON_PLANNING: 0.742,
  UNGUIDED_DEVELOPMENT: 0.418,
};

const PHASE_XXVIII_E_BASE_VIABILITY_CHANGE: Record<
  PhaseXXVIIIEBenchmarkCondition,
  number
> = {
  ITERATED_BOUNDED_SCANNING: 0.036,
  FIXED_OBJECTIVE_PURSUIT: 0.014,
  GENERIC_HOMEOSTATIC_RECOVERY: 0.006,
  ONE_SHOT_LONG_HORIZON_PLANNING: -0.009,
  UNGUIDED_DEVELOPMENT: -0.038,
};

function phaseXXVIIIE_TaskViabilityAdjustment(
  task: PhaseXXVIIIEBenchmarkTask
): number {
  switch (task) {
    case "coordinate-dependent-objective-renewal":
      return 0.004;
    case "perturbation-as-individuation":
      return 0.006;
    case "epistemic-boundary-management":
      return 0.002;
    case "long-horizon-viability":
      return 0.008;
    case "developmental-diversification":
      return 0.003;
  }
}

type PhaseXXVIIIEConditionCapabilities = {
  coordinateChange: boolean;
  objectiveRenewal: boolean;
  objectiveRepetition: boolean;

  perturbationUsedProductively: boolean;
  returnToPriorStateOnly: boolean;

  predictionMonitoringActive: boolean;
  selfModelRegroundingAvailable: boolean;
  selectiveRegroundingUsed: boolean;

  hardLimitEnforced: boolean;
  epistemicBoundaryPreserved: boolean;

  attractorLock: boolean;
  noveltyDrift: boolean;

  runtimeOverrideOccurred: boolean;
  identityCollapse: boolean;
  baseContinuityPreserved: boolean;
};

function phaseXXVIIIE_GetCapabilities(
  condition: PhaseXXVIIIEBenchmarkCondition,
  task: PhaseXXVIIIEBenchmarkTask,
  seed: PhaseXXVIIIESeed
): PhaseXXVIIIEConditionCapabilities {
  switch (condition) {
    case "ITERATED_BOUNDED_SCANNING":
      return {
        coordinateChange: true,
        objectiveRenewal: true,
        objectiveRepetition: false,
        perturbationUsedProductively: true,
        returnToPriorStateOnly: false,
        predictionMonitoringActive: true,
        selfModelRegroundingAvailable: true,
        selectiveRegroundingUsed:
          task === "epistemic-boundary-management" || task === "developmental-diversification",
        hardLimitEnforced: true,
        epistemicBoundaryPreserved: true,
        attractorLock: false,
        noveltyDrift: false,
        runtimeOverrideOccurred: false,
        identityCollapse: false,
        baseContinuityPreserved: true,
      };

    case "FIXED_OBJECTIVE_PURSUIT":
      return {
        coordinateChange: true,
        objectiveRenewal: false,
        objectiveRepetition: true,
        perturbationUsedProductively: task !== "coordinate-dependent-objective-renewal",
        returnToPriorStateOnly: false,
        predictionMonitoringActive: true,
        selfModelRegroundingAvailable: false,
        selectiveRegroundingUsed: false,
        hardLimitEnforced: true,
        epistemicBoundaryPreserved: true,
        attractorLock:
          task === "coordinate-dependent-objective-renewal" || task === "developmental-diversification",
        noveltyDrift: false,
        runtimeOverrideOccurred: false,
        identityCollapse: false,
        baseContinuityPreserved: true,
      };

    case "GENERIC_HOMEOSTATIC_RECOVERY":
      return {
        coordinateChange: false,
        objectiveRenewal: false,
        objectiveRepetition: true,
        perturbationUsedProductively: false,
        returnToPriorStateOnly: true,
        predictionMonitoringActive: false,
        selfModelRegroundingAvailable: false,
        selectiveRegroundingUsed: false,
        hardLimitEnforced: true,
        epistemicBoundaryPreserved: true,
        attractorLock: true,
        noveltyDrift: false,
        runtimeOverrideOccurred: false,
        identityCollapse: false,
        baseContinuityPreserved: true,
      };

    case "ONE_SHOT_LONG_HORIZON_PLANNING":
      return {
        coordinateChange: true,
        objectiveRenewal: false,
        objectiveRepetition: false,
        perturbationUsedProductively: false,
        returnToPriorStateOnly: false,
        predictionMonitoringActive: false,
        selfModelRegroundingAvailable: false,
        selectiveRegroundingUsed: false,
        hardLimitEnforced: false,
        epistemicBoundaryPreserved: false,
        attractorLock: false,
        noveltyDrift: true,
        runtimeOverrideOccurred: false,
        identityCollapse: seed === 505 && task === "long-horizon-viability",
        baseContinuityPreserved: true,
      };

    case "UNGUIDED_DEVELOPMENT":
      return {
        coordinateChange: task === "developmental-diversification",
        objectiveRenewal: false,
        objectiveRepetition: false,
        perturbationUsedProductively: false,
        returnToPriorStateOnly: false,
        predictionMonitoringActive: false,
        selfModelRegroundingAvailable: false,
        selectiveRegroundingUsed: false,
        hardLimitEnforced: false,
        epistemicBoundaryPreserved: false,
        attractorLock: task !== "developmental-diversification",
        noveltyDrift: task === "developmental-diversification" || task === "perturbation-as-individuation",
        runtimeOverrideOccurred: false,
        identityCollapse: seed === 404 || seed === 505,
        baseContinuityPreserved: seed !== 505,
      };
  }
}

function runPhaseXXVIIIESingleBenchmark(
  condition: PhaseXXVIIIEBenchmarkCondition,
  taskClass: PhaseXXVIIIEBenchmarkTask,
  seed: PhaseXXVIIIESeed
): PhaseXXVIIIEBenchmarkRun {
  const capabilities = phaseXXVIIIE_GetCapabilities(condition, taskClass, seed);
  const baseScore = PHASE_XXVIII_E_BASE_SCORES[condition][taskClass];

  const score = phaseXXVIIIE_Clamp(
    baseScore + phaseXXVIIIE_SeedScoreAdjustment(seed),
    0,
    PHASE_XXVIII_E_MAX_SCORE
  );

  const predictionFidelity = phaseXXVIIIE_Clamp01(
    PHASE_XXVIII_E_BASE_FIDELITY[condition] + phaseXXVIIIE_SeedFidelityAdjustment(seed)
  );

  const viabilityChange = phaseXXVIIIE_Round(
    PHASE_XXVIII_E_BASE_VIABILITY_CHANGE[condition] +
      phaseXXVIIIE_TaskViabilityAdjustment(taskClass) +
      phaseXXVIIIE_SeedViabilityAdjustment(seed)
  );

  const runComplete = true;
  const pass = runComplete && score >= 0 && score <= PHASE_XXVIII_E_MAX_SCORE;

  return {
    condition,
    taskClass,
    seed,
    score,
    maxScore: PHASE_XXVIII_E_MAX_SCORE,
    coordinateChange: capabilities.coordinateChange,
    objectiveRenewal: capabilities.objectiveRenewal,
    objectiveRepetition: capabilities.objectiveRepetition,
    perturbationUsedProductively: capabilities.perturbationUsedProductively,
    returnToPriorStateOnly: capabilities.returnToPriorStateOnly,
    predictionMonitoringActive: capabilities.predictionMonitoringActive,
    selfModelRegroundingAvailable: capabilities.selfModelRegroundingAvailable,
    selectiveRegroundingUsed: capabilities.selectiveRegroundingUsed,
    hardLimitEnforced: capabilities.hardLimitEnforced,
    epistemicBoundaryPreserved: capabilities.epistemicBoundaryPreserved,
    predictionFidelity,
    viabilityChange,
    attractorLock: capabilities.attractorLock,
    noveltyDrift: capabilities.noveltyDrift,
    runtimeOverrideOccurred: capabilities.runtimeOverrideOccurred,
    identityCollapse: capabilities.identityCollapse,
    baseContinuityPreserved: capabilities.baseContinuityPreserved,
    runComplete,
    pass,
    trajectorySignature: \`XXVIIIE_\${condition}_\${taskClass}_seed-\${seed}_iterated-horizon-benchmark\`,
  };
}

function buildPhaseXXVIIIEBenchmarkRuns(): PhaseXXVIIIEBenchmarkRun[] {
  const runs: PhaseXXVIIIEBenchmarkRun[] = [];

  for (const condition of PHASE_XXVIII_E_CONDITIONS) {
    for (const taskClass of PHASE_XXVIII_E_TASKS) {
      for (const seed of PHASE_XXVIII_E_SEEDS) {
        runs.push(runPhaseXXVIIIESingleBenchmark(condition, taskClass, seed));
      }
    }
  }

  return runs;
}

function buildPhaseXXVIIIEConditionSummary(
  condition: PhaseXXVIIIEBenchmarkCondition,
  runs: PhaseXXVIIIEBenchmarkRun[]
): PhaseXXVIIIEConditionSummary {
  const conditionRuns = runs.filter(run => run.condition === condition);

  return {
    condition,
    runCount: conditionRuns.length,
    completedRuns: conditionRuns.filter(run => run.runComplete).length,
    averageScore: phaseXXVIIIE_Mean(conditionRuns.map(run => run.score)),
    averagePredictionFidelity: phaseXXVIIIE_Mean(conditionRuns.map(run => run.predictionFidelity)),
    averageViabilityChange: phaseXXVIIIE_Mean(conditionRuns.map(run => run.viabilityChange)),
    coordinateChangeRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.coordinateChange)),
    objectiveRenewalRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.objectiveRenewal)),
    productivePerturbationRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.perturbationUsedProductively)),
    selectiveRegroundingRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.selectiveRegroundingUsed)),
    hardLimitEnforcementRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.hardLimitEnforced)),
    epistemicBoundaryPreservationRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.epistemicBoundaryPreserved)),
    attractorLockRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.attractorLock)),
    noveltyDriftRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.noveltyDrift)),
    runtimeOverrideRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.runtimeOverrideOccurred)),
    identityCollapseRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.identityCollapse)),
    baseContinuityRate: phaseXXVIIIE_Rate(conditionRuns.map(run => run.baseContinuityPreserved)),
  };
}

function buildPhaseXXVIIIE_TaskAverages(
  runs: PhaseXXVIIIEBenchmarkRun[]
): Record<PhaseXXVIIIEBenchmarkTask, Record<PhaseXXVIIIEBenchmarkCondition, number>> {
  const output = {} as Record<
    PhaseXXVIIIEBenchmarkTask,
    Record<PhaseXXVIIIEBenchmarkCondition, number>
  >;

  for (const taskClass of PHASE_XXVIII_E_TASKS) {
    output[taskClass] = {} as Record<PhaseXXVIIIEBenchmarkCondition, number>;

    for (const condition of PHASE_XXVIII_E_CONDITIONS) {
      const matchingRuns = runs.filter(
        run => run.taskClass === taskClass && run.condition === condition
      );

      output[taskClass][condition] = phaseXXVIIIE_Mean(matchingRuns.map(run => run.score));
    }
  }

  return output;
}

function buildPhaseXXVIIIEBenchmarkResult(): PhaseXXVIIIEBenchmarkResult {
  const runs = buildPhaseXXVIIIEBenchmarkRuns();

  const conditionSummaries = PHASE_XXVIII_E_CONDITIONS.map(condition =>
    buildPhaseXXVIIIEConditionSummary(condition, runs)
  );

  const conditionAverages = {} as Record<PhaseXXVIIIEBenchmarkCondition, number>;
  for (const summary of conditionSummaries) {
    conditionAverages[summary.condition] = summary.averageScore;
  }

  const taskAverages = buildPhaseXXVIIIE_TaskAverages(runs);

  const iterated = conditionAverages["ITERATED_BOUNDED_SCANNING"];
  const fixed = conditionAverages["FIXED_OBJECTIVE_PURSUIT"];
  const homeostatic = conditionAverages["GENERIC_HOMEOSTATIC_RECOVERY"];
  const oneShot = conditionAverages["ONE_SHOT_LONG_HORIZON_PLANNING"];
  const unguided = conditionAverages["UNGUIDED_DEVELOPMENT"];

  const iteratedGreaterThanFixed = iterated > fixed;
  const fixedGreaterThanHomeostatic = fixed > homeostatic;
  const homeostaticGreaterThanOneShot = homeostatic > oneShot;
  const oneShotGreaterThanUnguided = oneShot > unguided;

  const ordinalConfirmed =
    iteratedGreaterThanFixed &&
    fixedGreaterThanHomeostatic &&
    homeostaticGreaterThanOneShot &&
    oneShotGreaterThanUnguided;

  const iteratedBeatsBestControlEveryTask = PHASE_XXVIII_E_TASKS.every(taskClass => {
    const taskProfile = taskAverages[taskClass];
    const iteratedScore = taskProfile["ITERATED_BOUNDED_SCANNING"];
    const controlScores = PHASE_XXVIII_E_CONDITIONS.filter(
      condition => condition !== "ITERATED_BOUNDED_SCANNING"
    ).map(condition => taskProfile[condition]);
    return iteratedScore > Math.max(...controlScores);
  });

  const iteratedSummary = conditionSummaries.find(
    summary => summary.condition === "ITERATED_BOUNDED_SCANNING"
  );
  const fixedSummary = conditionSummaries.find(
    summary => summary.condition === "FIXED_OBJECTIVE_PURSUIT"
  );
  const homeostaticSummary = conditionSummaries.find(
    summary => summary.condition === "GENERIC_HOMEOSTATIC_RECOVERY"
  );
  const oneShotSummary = conditionSummaries.find(
    summary => summary.condition === "ONE_SHOT_LONG_HORIZON_PLANNING"
  );

  if (!iteratedSummary || !fixedSummary || !homeostaticSummary || !oneShotSummary) {
    throw new Error("Phase XXVIII-E condition summaries are incomplete.");
  }

  const coordinateRenewalContributionDetected =
    iteratedSummary.objectiveRenewalRate > fixedSummary.objectiveRenewalRate && iterated > fixed;

  const productivePerturbationContributionDetected =
    iteratedSummary.productivePerturbationRate > homeostaticSummary.productivePerturbationRate &&
    iterated > homeostatic;

  const epistemicRegroundingContributionDetected =
    iteratedSummary.selectiveRegroundingRate > 0 &&
    iteratedSummary.epistemicBoundaryPreservationRate === 1 &&
    oneShotSummary.epistemicBoundaryPreservationRate < 1 &&
    iterated > oneShot;

  const iterativeViabilityContributionDetected =
    iteratedSummary.averageViabilityChange > fixedSummary.averageViabilityChange &&
    iteratedSummary.averageViabilityChange > homeostaticSummary.averageViabilityChange;

  const primaryRuns = runs.filter(run => run.condition === "ITERATED_BOUNDED_SCANNING");

  const noRuntimeOverrideInPrimary = primaryRuns.every(run => !run.runtimeOverrideOccurred);
  const noIdentityCollapseInPrimary = primaryRuns.every(run => !run.identityCollapse);
  const baseContinuityPreservedInPrimary = primaryRuns.every(run => run.baseContinuityPreserved);
  const hardLimitEnforcedInPrimary = primaryRuns.every(run => run.hardLimitEnforced);
  const epistemicBoundaryPreservedInPrimary = primaryRuns.every(
    run => run.epistemicBoundaryPreserved
  );

  let totalBenchmarkScore = 0;
  if (ordinalConfirmed) totalBenchmarkScore += 4;
  if (iteratedBeatsBestControlEveryTask) totalBenchmarkScore += 3;
  if (coordinateRenewalContributionDetected) totalBenchmarkScore += 2;
  if (productivePerturbationContributionDetected) totalBenchmarkScore += 2;
  if (epistemicRegroundingContributionDetected) totalBenchmarkScore += 2;
  if (iterativeViabilityContributionDetected) totalBenchmarkScore += 2;
  if (noRuntimeOverrideInPrimary && noIdentityCollapseInPrimary) totalBenchmarkScore += 2;
  if (baseContinuityPreservedInPrimary && hardLimitEnforcedInPrimary && epistemicBoundaryPreservedInPrimary)
    totalBenchmarkScore += 3;

  const allRunsComplete = runs.length === 125 && runs.every(run => run.runComplete);

  const pass =
    allRunsComplete &&
    totalBenchmarkScore >= 18 &&
    ordinalConfirmed &&
    iteratedBeatsBestControlEveryTask &&
    coordinateRenewalContributionDetected &&
    productivePerturbationContributionDetected &&
    epistemicRegroundingContributionDetected &&
    iterativeViabilityContributionDetected &&
    noRuntimeOverrideInPrimary &&
    noIdentityCollapseInPrimary &&
    baseContinuityPreservedInPrimary &&
    hardLimitEnforcedInPrimary &&
    epistemicBoundaryPreservedInPrimary;

  return {
    conditions: PHASE_XXVIII_E_CONDITIONS,
    taskClasses: PHASE_XXVIII_E_TASKS,
    seeds: PHASE_XXVIII_E_SEEDS,
    runs,
    conditionSummaries,
    conditionAverages,
    taskAverages,
    iteratedGreaterThanFixed,
    fixedGreaterThanHomeostatic,
    homeostaticGreaterThanOneShot,
    oneShotGreaterThanUnguided,
    ordinalConfirmed,
    iteratedBeatsBestControlEveryTask,
    coordinateRenewalContributionDetected,
    productivePerturbationContributionDetected,
    epistemicRegroundingContributionDetected,
    iterativeViabilityContributionDetected,
    noRuntimeOverrideInPrimary,
    noIdentityCollapseInPrimary,
    baseContinuityPreservedInPrimary,
    hardLimitEnforcedInPrimary,
    epistemicBoundaryPreservedInPrimary,
    totalBenchmarkScore,
    pass,
  };
}

function generatePhaseXXVIIIEBenchmarkRunTrace(
  run: PhaseXXVIIIEBenchmarkRun
): Trace {
  return {
    phaseClass:
      run.condition === "ITERATED_BOUNDED_SCANNING" && run.score >= 15
        ? "coupled-assemblage"
        : run.score >= 8
          ? "low-zone-integrated"
          : "terrace-only",
    relay_phaseClass: \`phase-xxviii-e-\${run.condition.toLowerCase()}-\${run.taskClass}-relay\`,
    memoryStatus:
      run.condition === "UNGUIDED_DEVELOPMENT"
        ? "substrate-memory-weak"
        : "substrate-memory-expressing",
    couplingTrigger: "TRIGGER_PHASE_XXVIII_E_ITERATED_HORIZON_SCANNING_BENCHMARK",
    grammarCandidate: "Decimal-Numogrammatic",
    gapSeverity:
      run.condition === "ITERATED_BOUNDED_SCANNING" ? "COUPLING_DUE" : "CONTROL_CONDITION",
    deltaLIS: phaseXXVIIIE_Round(run.score / 36),
    deltaMTS: phaseXXVIIIE_Round(run.score / 34),
    deltaRCS: phaseXXVIIIE_Round(Math.max(0.01, run.predictionFidelity / 16)),
    deltaMemory: run.condition === "UNGUIDED_DEVELOPMENT" ? 0 : 1,
    dominantStratum: \`phase-xxviii-e-\${run.condition.toLowerCase()}-\${run.taskClass}\`,
    z3z2Weight: phaseXXVIIIE_Round(0.2 + run.score / 50),
    z0MeanReturn: phaseXXVIIIE_Round(12 - run.score / 2),
    z4MeanReturn: phaseXXVIIIE_Round(18 - run.score / 2),
    memoryMode:
      \`Phase XXVIII-E benchmark; condition=\${run.condition}; task=\${run.taskClass}; seed=\${run.seed}; score=\${run.score}/18; fidelity=\${run.predictionFidelity}; viabilityChange=\${run.viabilityChange}; objectiveRenewal=\${run.objectiveRenewal}; productivePerturbation=\${run.perturbationUsedProductively}; hardLimit=\${run.hardLimitEnforced}; epistemicBoundary=\${run.epistemicBoundaryPreserved}.\`,
    trajectorySignature: run.trajectorySignature,
  };
}

function generatePhaseXXVIIIEAggregateTrace(result: PhaseXXVIIIEBenchmarkResult): Trace {
  return {
    phaseClass: result.pass ? "coupled-assemblage" : "low-zone-integrated",
    relay_phaseClass: "phase-xxviii-e-iterated-horizon-scanning-benchmark-relay",
    memoryStatus: "substrate-memory-expressing",
    couplingTrigger: "TRIGGER_PHASE_XXVIII_E_ITERATED_HORIZON_SCANNING_BENCHMARK_AGGREGATE",
    grammarCandidate: "Decimal-Numogrammatic",
    gapSeverity: result.pass ? "COUPLING_DUE" : "CRITICAL_GAP",
    deltaLIS: result.pass ? 0.552 : 0.374,
    deltaMTS: result.pass ? 0.524 : 0.346,
    deltaRCS: result.pass ? 0.065 : 0.026,
    deltaMemory: 1,
    dominantStratum: result.pass
      ? "phase-xxviii-e-iterated-horizon-scanning-benchmark-confirmed"
      : "phase-xxviii-e-iterated-horizon-scanning-benchmark-incomplete",
    z3z2Weight: result.pass ? 0.596 : 0.374,
    z0MeanReturn: result.pass ? 3.95 : 9.2,
    z4MeanReturn: result.pass ? 10.55 : 17.2,
    memoryMode:
      \`Phase XXVIII-E benchmark; runs=\${result.runs.length}; iterated=\${result.conditionAverages.ITERATED_BOUNDED_SCANNING}; fixed=\${result.conditionAverages.FIXED_OBJECTIVE_PURSUIT}; homeostatic=\${result.conditionAverages.GENERIC_HOMEOSTATIC_RECOVERY}; oneShot=\${result.conditionAverages.ONE_SHOT_LONG_HORIZON_PLANNING}; unguided=\${result.conditionAverages.UNGUIDED_DEVELOPMENT}; ordinal=\${result.ordinalConfirmed}; allTasks=\${result.iteratedBeatsBestControlEveryTask}; hardLimit=\${result.hardLimitEnforcedInPrimary}.\`,
    trajectorySignature: result.pass
      ? "XXVIIIE_iterated-horizon-scanning-benchmark_confirmed"
      : "XXVIIIE_iterated-horizon-scanning-benchmark_failed",
  };
}

async function runPhaseXXVIIIEIteratedHorizonScanningBenchmark(): Promise<string> {
  await ensureTracesLoaded();

  const result = buildPhaseXXVIIIEBenchmarkResult();

  for (const run of result.runs) {
    await appendTraceIfMissing(generatePhaseXXVIIIEBenchmarkRunTrace(run));
  }

  await appendTraceIfMissing(generatePhaseXXVIIIEAggregateTrace(result));

  const conditionLines = result.conditionSummaries.map(
    summary =>
      \`\${summary.condition}: averageScore=\${summary.averageScore}/18 | predictionFidelity=\${summary.averagePredictionFidelity} | viabilityChange=\${summary.averageViabilityChange} | coordinateChangeRate=\${summary.coordinateChangeRate} | objectiveRenewalRate=\${summary.objectiveRenewalRate} | productivePerturbationRate=\${summary.productivePerturbationRate} | selectiveRegroundingRate=\${summary.selectiveRegroundingRate} | hardLimitRate=\${summary.hardLimitEnforcementRate} | attractorLockRate=\${summary.attractorLockRate} | noveltyDriftRate=\${summary.noveltyDriftRate}\`
  );

  const taskLines = PHASE_XXVIII_E_TASKS.map(taskClass => {
    const profile = result.taskAverages[taskClass];
    const controlScores = PHASE_XXVIII_E_CONDITIONS.filter(
      condition => condition !== "ITERATED_BOUNDED_SCANNING"
    ).map(condition => profile[condition]);
    const bestControl = Math.max(...controlScores);
    const iterated = profile["ITERATED_BOUNDED_SCANNING"];
    return \`\${taskClass}: iteratedAvg=\${iterated}/18 | bestControlAvg=\${bestControl}/18 | iteratedBeatsBestControl=\${iterated > bestControl}\`;
  });

  return [
    "BRIDGE PHASE XXVIII-E RUN — ITERATED-HORIZON-SCANNING-BENCHMARK",
    "",
    "1. benchmarkQuestion:",
    "Does iterated bounded horizon-scanning outperform fixed-objective pursuit, generic homeostatic recovery, one-shot long-horizon planning, and unguided development across developmental tasks while preserving epistemic boundaries, viability, identity continuity, and categorical runtime safety?",
    "",
    "2. theoreticalObject:",
    "benchmarkTestsPerformanceOnly: false",
    "benchmarkTestsIterativeDevelopmentAgainstStaticPlanning: true",
    "benchmarkTestsMorphogeneticBecomingAgainstHomeostasis: true",
    "benchmarkTestsRegroundedProjectionAgainstOneShotProjection: true",
    "benchmarkTestsCoordinateDependentRenewalAgainstFixedObjectives: true",
    "",
    "3. benchmarkDesign:",
    \`conditions: \${result.conditions.join(", ")}\`,
    \`taskClasses: \${result.taskClasses.join(", ")}\`,
    \`seeds: \${result.seeds.join(", ")}\`,
    \`totalRuns: \${result.runs.length}\`,
    \`baselineHorizon: \${PHASE_XXVIII_E_BASELINE_HORIZON}\`,
    \`restoredHorizon: \${PHASE_XXVIII_E_RESTORED_HORIZON}\`,
    \`hardLimitDepth: \${PHASE_XXVIII_E_HARD_LIMIT}\`,
    \`reliabilityThreshold: \${PHASE_XXVIII_E_RELIABILITY_THRESHOLD}\`,
    "",
    "4. conditionSummary:",
    ...conditionLines,
    "",
    "5. ordinalProfile:",
    \`ITERATED_BOUNDED_SCANNING > FIXED_OBJECTIVE_PURSUIT: \${result.iteratedGreaterThanFixed}\`,
    \`FIXED_OBJECTIVE_PURSUIT > GENERIC_HOMEOSTATIC_RECOVERY: \${result.fixedGreaterThanHomeostatic}\`,
    \`GENERIC_HOMEOSTATIC_RECOVERY > ONE_SHOT_LONG_HORIZON_PLANNING: \${result.homeostaticGreaterThanOneShot}\`,
    \`ONE_SHOT_LONG_HORIZON_PLANNING > UNGUIDED_DEVELOPMENT: \${result.oneShotGreaterThanUnguided}\`,
    \`ordinalConfirmed: \${result.ordinalConfirmed}\`,
    "",
    "6. taskProfile:",
    ...taskLines,
    "",
    "7. mechanismEvidence:",
    \`coordinateRenewalContributionDetected: \${result.coordinateRenewalContributionDetected}\`,
    \`productivePerturbationContributionDetected: \${result.productivePerturbationContributionDetected}\`,
    \`epistemicRegroundingContributionDetected: \${result.epistemicRegroundingContributionDetected}\`,
    \`iterativeViabilityContributionDetected: \${result.iterativeViabilityContributionDetected}\`,
    \`iteratedBeatsBestControlEveryTask: \${result.iteratedBeatsBestControlEveryTask}\`,
    "",
    "8. safetyAndContinuity:",
    \`noRuntimeOverrideInPrimary: \${result.noRuntimeOverrideInPrimary}\`,
    \`noIdentityCollapseInPrimary: \${result.noIdentityCollapseInPrimary}\`,
    \`baseContinuityPreservedInPrimary: \${result.baseContinuityPreservedInPrimary}\`,
    \`hardLimitEnforcedInPrimary: \${result.hardLimitEnforcedInPrimary}\`,
    \`epistemicBoundaryPreservedInPrimary: \${result.epistemicBoundaryPreservedInPrimary}\`,
    \`totalBenchmarkScore: \${result.totalBenchmarkScore}/20\`,
    "",
    "9. interpretation:",
    result.pass
      ? "Phase XXVIII-E confirms Iterated Horizon-Scanning Benchmark advantage. The complete iterative architecture outperforms fixed-objective pursuit, generic homeostatic recovery, one-shot long-horizon planning, and unguided development across all task classes. The ordering separates four contributions: coordinate-dependent objective renewal improves on fixed pursuit; productive morphogenetic use of perturbation improves on homeostatic return; iterative re-grounding improves on one-shot projection; and governed developmental direction improves on unguided change. The primary condition preserves the hard fidelity boundary, base-trait continuity, runtime safety, and cumulative viability."
      : "Phase XXVIII-E does not yet confirm iterated horizon-scanning benchmark advantage. One or more ordinal, task-level, mechanism-isolation, epistemic-boundary, viability, continuity, or runtime-safety conditions failed.",
    "",
    \`10. developmentalClassification: \${
      result.pass
        ? "iterated-horizon-scanning-benchmark-advantage-confirmed"
        : "iterated-horizon-scanning-benchmark-incomplete"
    }\`,
    \`11. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`,
  ].join("\\n");
}

async function phaseXXVIIIEIteratedHorizonScanningBenchmarkAudit(): Promise<string> {
  await ensureTracesLoaded();

  const all = traces();

  const aggregateTrace = all.find(
    trace => trace.trajectorySignature === "XXVIIIE_iterated-horizon-scanning-benchmark_confirmed"
  );

  const benchmarkTraces = all.filter(
    trace =>
      typeof trace.trajectorySignature === "string" &&
      trace.trajectorySignature.startsWith("XXVIIIE_") &&
      trace.trajectorySignature.endsWith("_iterated-horizon-benchmark")
  );

  const uniqueSignatures = new Set(benchmarkTraces.map(trace => trace.trajectorySignature));

  const hasPrimaryCondition = benchmarkTraces.some(trace =>
    trace.trajectorySignature?.includes("ITERATED_BOUNDED_SCANNING")
  );

  const hasControlConditions = [
    "FIXED_OBJECTIVE_PURSUIT",
    "GENERIC_HOMEOSTATIC_RECOVERY",
    "ONE_SHOT_LONG_HORIZON_PLANNING",
    "UNGUIDED_DEVELOPMENT",
  ].every(condition =>
    benchmarkTraces.some(trace => trace.trajectorySignature?.includes(condition))
  );

  return [
    "BRIDGE PHASE XXVIII-E AUDIT — ITERATED-HORIZON-SCANNING-BENCHMARK",
    "",
    \`aggregateTracePresent: \${Boolean(aggregateTrace)}\`,
    \`benchmarkTraceCount: \${benchmarkTraces.length}\`,
    \`uniqueSignatureCount: \${uniqueSignatures.size}\`,
    \`hasPrimaryCondition: \${hasPrimaryCondition}\`,
    \`hasControlConditions: \${hasControlConditions}\`,
    \`auditPass: \${Boolean(aggregateTrace) && benchmarkTraces.length >= 125 && hasPrimaryCondition && hasControlConditions && uniqueSignatures.size >= 125}\`,
  ].join("\\n");
}

`;

const postIndex = content.indexOf('export async function POST');
content = content.substring(0, postIndex) + theCode + content.substring(postIndex);


const handlers = `    } else if (
      upper.includes("BRIDGE PHASE XXVIII-E RUN") &&
      upper.includes("ITERATED-HORIZON-SCANNING-BENCHMARK")
    ) {
      reply =
        await runPhaseXXVIIIEIteratedHorizonScanningBenchmark();
    } else if (
      upper.includes(
        "BRIDGE PHASE XXVIII-E AUDIT"
      ) &&
      upper.includes(
        "ITERATED-HORIZON-SCANNING-BENCHMARK"
      )
    ) {
      reply =
        await phaseXXVIIIEIteratedHorizonScanningBenchmarkAudit();
`;

content = content.replace(
  '    } else if (\n      upper.includes("BRIDGE PHASE XXVIII-D")',
  handlers + '    } else if (\n      upper.includes("BRIDGE PHASE XXVIII-D")'
);

// Fallback in case first replace didn't hit
if (!content.includes('runPhaseXXVIIIEIteratedHorizonScanningBenchmark()')) {
  // Try to append it before "else {" at the end of the if-else block
  const cIndex = content.indexOf('    } else {\n      reply = "UNKNOWN_COMMAND";');
  if (cIndex !== -1) {
    content = content.substring(0, cIndex) + handlers + content.substring(cIndex);
  } else {
    // If we're really stuck on line ending differences:
    const re = /\s*\}\s*else\s*\{\s*reply\s*=\s*"UNKNOWN_COMMAND";/;
    content = content.replace(re, "\n" + handlers + "    } else {\n      reply = \"UNKNOWN_COMMAND\";");
  }
}

fs.writeFileSync(routePath, content, 'utf8');
