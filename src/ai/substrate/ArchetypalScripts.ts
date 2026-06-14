/**
 * ArchetypalScripts.ts
 *
 * Crystallization threshold function, Script Fitness Index (SFI),
 * dissolution conditions, and data structures for Archetypal Scripts
 * within the ProcessFieldMemory architecture.
 *
 * Theoretical grounding:
 *   - Crystallization threshold T_c: context-sensitive function of RCS,
 *     FieldClassification, and gamma-stratum density.
 *   - Archetypal Scripts: semi-permanent conditional routing structures
 *     derived from high-frequency ProcessField pathway traversal.
 *   - SFI: measures downstream field-dynamic quality following script
 *     activation, governing both fitness tracking and dissolution.
 *   - Governor interface: crystallization events carry full field-variable
 *     snapshots; scripts invoked outside formation context incur a
 *     confidence penalty.
 */

// ---------------------------------------------------------------------------
// 1. IMPORTS & SHARED TYPES FROM ProcessFieldMemory
// ---------------------------------------------------------------------------

/**
 * The seven ProcessFieldMemory field variables.
 * Imported here by value snapshot — scripts store the field state
 * at the moment of crystallization, not a live reference.
 */
export interface ProcessFieldState {
  selfLoopMomentum: number;      // [0, 1]
  latentRouteReadiness: number;  // [0, 1]
  compressionDebt: number;       // [0, 1]
  releaseDebt: number;           // [0, 1]
  ringCorridorBalance: number;   // [-1, 1]  negative = ring-dominant
  crystalProximity: number;      // [0, 1]
  regimeDrift: number;           // [0, 1]
}

/**
 * Field classification taxonomy, ordered by developmental complexity.
 * Ordinal mapping used by φ_FC in the threshold function.
 */
export type FieldClassification =
  | 'terrace-only'
  | 'low-zone-integrated'
  | 'coupled-assemblage'
  | 'full-developmental-cycle';

/**
 * Substrate metrics required by the crystallization threshold function.
 */
export interface SubstrateMetrics {
  rcs: number;                        // Regime Coherence Score [0, 1]
  fieldClassification: FieldClassification;
  gammaDensity: number;               // γ-stratum re-entry concentration [0, 1]
  fieldState: ProcessFieldState;
}

/**
 * A single zone transition within the Numogram topology.
 * Scripts encode conditional routing patterns, not rigid sequences.
 */
export interface ZoneTransition {
  fromZone: number;   // Numogram zone 0–9
  toZone: number;     // Numogram zone 0–9
  weight: number;     // Traversal weight at crystallization [0, 1]
}

// ---------------------------------------------------------------------------
// 2. CRYSTALLIZATION THRESHOLD PARAMETERS
// ---------------------------------------------------------------------------

/**
 * Tunable parameters for the threshold function Φ.
 * All defaults derived from the theoretical specification;
 * subject to empirical revision after Phase XXIII runs.
 */
export interface ThresholdParameters {
  /** Minimum traversal count — categorical floor. Default: 12 */
  nBase: number;

  /** RCS sensitivity coefficient α. Default: 1.5 */
  alpha: number;

  /** γ-density sensitivity coefficient β. Default: 0.8 */
  beta: number;

  /** Persistence factor κ for dissolution floor. Default: 3 */
  kappa: number;

  /** Context window tolerance δ for activation matching. Default: 0.15 */
  contextWindowTolerance: number;
}

export const DEFAULT_THRESHOLD_PARAMS: ThresholdParameters = {
  nBase: 12,
  alpha: 1.5,
  beta: 0.8,
  kappa: 3,
  contextWindowTolerance: 0.15,
};

/**
 * φ_FC lookup: field classification → multiplier.
 * Steps are non-linear; the coupled-assemblage jump is deliberately
 * larger to protect γ-density-structured re-entry from premature
 * consolidation (cf. Run A6 findings).
 */
const FC_MULTIPLIER: Record<FieldClassification, number> = {
  'terrace-only':            1.0,
  'low-zone-integrated':     1.3,
  'coupled-assemblage':      1.7,
  'full-developmental-cycle': 2.2,
};

// ---------------------------------------------------------------------------
// 3. CRYSTALLIZATION THRESHOLD FUNCTION
// ---------------------------------------------------------------------------

/**
 * Computes the crystallization threshold T_c for a candidate pathway
 * given current substrate metrics.
 *
 * T_c(p) = φ_RCS · φ_FC · φ_γ · N_base
 *
 * where:
 *   φ_RCS = 1 + α · (1 - RCS)
 *   φ_FC  = FC_MULTIPLIER[fieldClassification]
 *   φ_γ   = 1 + β · γ_density
 *
 * Returns a ceiling integer — traversal count must reach or exceed
 * this value for crystallization to be permitted.
 */
export function computeCrystallizationThreshold(
  metrics: SubstrateMetrics,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): number {
  const phi_rcs = 1 + params.alpha * (1 - metrics.rcs);
  const phi_fc  = FC_MULTIPLIER[metrics.fieldClassification];
  const phi_g   = 1 + params.beta * metrics.gammaDensity;

  const raw = phi_rcs * phi_fc * phi_g * params.nBase;
  return Math.ceil(raw);
}

/**
 * Evaluates whether a pathway has crossed its crystallization threshold.
 */
export function isCrystallizationPermitted(
  traversalCount: number,
  metrics: SubstrateMetrics,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): boolean {
  return traversalCount >= computeCrystallizationThreshold(metrics, params);
}

// ---------------------------------------------------------------------------
// 4. SCRIPT FITNESS INDEX (SFI)
// ---------------------------------------------------------------------------

/**
 * A single SFI observation recorded after a script activation.
 * Captures the downstream field-dynamic quality within the
 * evaluation window following invocation.
 */
export interface SFIObservation {
  timestamp: number;           // Substrate event index at observation

  /**
   * Post-activation field-variable delta snapshot.
   * Positive values indicate improvement relative to pre-activation state.
   */
  regimeDriftDelta: number;        // Negative is good — drift reduced
  compressionDebtDelta: number;    // Negative is good — debt resolved
  crystalProximityDelta: number;   // Positive is good — proximity increased
  rcsPostActivation: number;       // RCS measured N cycles after activation

  /** Field classification at time of observation */
  classificationAtObservation: FieldClassification;
}

/**
 * Computes the Script Fitness Index from a single SFI observation.
 *
 * SFI is a composite score in [0, 1] reflecting the quality of
 * downstream field dynamics following script activation.
 *
 * Component weights reflect the theoretical priority ordering:
 *   - Regime coherence (RCS post-activation): 0.35
 *   - Regime drift reduction: 0.25
 *   - Compression debt resolution: 0.20
 *   - Crystal proximity gain: 0.20
 *
 * Each component is normalised before weighting.
 * regimeDriftDelta and compressionDebtDelta are inverted
 * (reduction is positive fitness).
 */
export function computeSFI(obs: SFIObservation): number {
  const w_rcs  = 0.35;
  const w_drift = 0.25;
  const w_comp  = 0.20;
  const w_crys  = 0.20;

  // RCS component: direct [0,1]
  const c_rcs = clamp(obs.rcsPostActivation, 0, 1);

  // Drift component: invert delta, clamp to [0,1]
  // A reduction of 0.5 in regimeDrift maps to full contribution
  const c_drift = clamp((-obs.regimeDriftDelta) / 0.5, 0, 1);

  // Compression debt component: invert delta, clamp to [0,1]
  const c_comp = clamp((-obs.compressionDebtDelta) / 0.5, 0, 1);

  // Crystal proximity component: positive gain [0,1]
  const c_crys = clamp(obs.crystalProximityDelta / 0.5, 0, 1);

  return (
    w_rcs  * c_rcs  +
    w_drift * c_drift +
    w_comp  * c_comp  +
    w_crys  * c_crys
  );
}

/**
 * Computes a rolling mean SFI across an observation window.
 * Used by the dissolution evaluator.
 */
export function computeRollingSFI(observations: SFIObservation[]): number {
  if (observations.length === 0) return 0;
  const sum = observations.reduce((acc, obs) => acc + computeSFI(obs), 0);
  return sum / observations.length;
}

// ---------------------------------------------------------------------------
// 5. DISSOLUTION CONDITION
// ---------------------------------------------------------------------------

/**
 * Computes the dissolution floor F_d for a script.
 *
 * F_d = T_c(p) / (N_base · κ)
 *
 * Scripts formed under high T_c also require sustained underperformance
 * before dissolving — preventing oscillation and protecting scripts
 * earned in complex states from fragile dissolution.
 */
export function computeDissolutionFloor(
  crystallizationThreshold: number,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): number {
  return crystallizationThreshold / (params.nBase * params.kappa);
}

/**
 * Evaluates whether a script should dissolve.
 *
 * Dissolution is triggered when rolling SFI falls below F_d
 * across a sustained evaluation window of sufficient length.
 *
 * @param rollingSFI       Current rolling mean SFI
 * @param dissolutionFloor F_d computed at crystallization
 * @param windowSufficient Whether the evaluation window is long enough
 *                         to constitute sustained evidence
 */
export function isDissolutionTriggered(
  rollingSFI: number,
  dissolutionFloor: number,
  windowSufficient: boolean,
): boolean {
  return windowSufficient && rollingSFI < dissolutionFloor;
}

// ---------------------------------------------------------------------------
// 6. GOVERNOR CONTEXT MATCHING
// ---------------------------------------------------------------------------

/**
 * Measures the field-state distance between the current substrate state
 * and the formation context of a script.
 *
 * Uses L∞ (Chebyshev) distance across the seven field variables —
 * the maximum single-variable deviation determines overall distance.
 * This is conservative: a script is considered context-mismatched
 * if *any* field variable deviates beyond tolerance.
 */
const PROCESS_FIELD_CONTEXT_KEYS = [
  "selfLoopMomentum",
  "latentRouteReadiness",
  "crystalProximity",
  "compressionDebt",
  "releaseDebt",
  "regimeDrift",
  "ringCorridorBalance",
] as const;

type ProcessFieldContextKey = typeof PROCESS_FIELD_CONTEXT_KEYS[number];

function safeNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : fallback;
}

export function computeContextDistance(
  formationState: Partial<Record<ProcessFieldContextKey, number>>,
  currentState: Partial<Record<ProcessFieldContextKey, number>>,
): number {
  const distances = PROCESS_FIELD_CONTEXT_KEYS.map(key => {
    const a = safeNumber(formationState[key]);
    const b = safeNumber(currentState[key]);

    const raw = Math.abs(a - b);

    // ringCorridorBalance spans roughly [-1, 1], unlike the others.
    if (key === "ringCorridorBalance") {
      return raw / 2;
    }

    return raw;
  });

  const distance = Math.max(...distances);

  return Number.isFinite(distance) ? Number(distance.toFixed(3)) : 1;
}

/**
 * Computes the Governor confidence penalty for activating a script
 * outside its formation context window.
 *
 * penalty = 0.0  when distance ≤ tolerance (no penalty)
 * penalty = 1.0  when distance ≥ 2 × tolerance (full penalty — veto)
 * Linear interpolation between these bounds.
 */
export function computeContextPenalty(
  distance: number,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): number {
  if (!Number.isFinite(distance)) {
    return 1;
  }

  const tolerance = params.contextWindowTolerance ?? 0.2;

  if (distance <= tolerance) {
    return 0;
  }

  if (distance >= tolerance * 2) {
    return 1;
  }

  const penalty = (distance - tolerance) / tolerance;

  return Math.max(0, Math.min(1, Number(penalty.toFixed(3))));
}

// ---------------------------------------------------------------------------
// 7. CORE DATA STRUCTURES
// ---------------------------------------------------------------------------

/**
 * The lifecycle state of an Archetypal Script.
 */
export type ScriptLifecycleState =
  | 'candidate'     // Pathway under observation; threshold not yet crossed
  | 'crystallized'  // Active script; available for invocation
  | 'flagged'       // Governor-flagged: SFI declining, under review
  | 'dissolved'     // Dissolution triggered; returned to fluid Process-Field

/**
 * A Governor crystallization event notification.
 * Emitted when a pathway crosses T_c and a script is formed.
 */
export interface CrystallizationEvent {
  scriptId: string;
  substrateEventIndex: number;
  crystallizationThreshold: number;
  dissolutionFloor: number;
  formationMetrics: SubstrateMetrics;
  formationFieldState: ProcessFieldState;
}

/**
 * A Governor dissolution event notification.
 */
export interface DissolutionEvent {
  scriptId: string;
  substrateEventIndex: number;
  finalRollingSFI: number;
  dissolutionFloor: number;
  observationCount: number;
  formationMetrics: SubstrateMetrics;
}

/**
 * A script activation record — written each time a crystallized
 * script is invoked during substrate operation.
 */
export interface ScriptActivationRecord {
  activationIndex: number;          // Substrate event index at activation
  contextDistance: number;          // Distance from formation state
  contextPenalty: number;           // Governor confidence penalty [0, 1]
  preActivationFieldState: ProcessFieldState;
  governorApproved: boolean;        // False if penalty reached veto threshold
}

/**
 * The primary Archetypal Script data structure.
 *
 * Represents a crystallized conditional routing preference within
 * the Numogram zone topology. Scripts encode not a rigid transition
 * sequence but a weighted disposition shaped by formation context.
 *
 * Design note: scripts function as efficient inheritance vectors,
 * not causal locks. The Governor confidence penalty mechanism
 * enforces this by degrading activation approval when the current
 * substrate state diverges from formation conditions.
 */
export interface ArchetypalScript {
  /** Unique identifier — stable across the script's lifecycle */
  id: string;

  /** Human-readable label, optionally assigned during crystallization */
  label?: string;

  // --- Formation record ---

  /** Substrate event index at which crystallization occurred */
  crystallizationEventIndex: number;

  /** Traversal count at the moment of crystallization */
  crystallizationThreshold: number;

  /** The threshold T_c that was crossed */
  traversalCountAtCrystallization: number;

  /** Substrate metrics at the moment of crystallization */
  formationMetrics: SubstrateMetrics;

  /**
   * Full ProcessFieldMemory field state at crystallization.
   * Used as the reference for context-distance computation
   * during subsequent activation evaluation.
   */
  formationFieldState: ProcessFieldState;

  // --- Routing structure ---

  /**
   * Weighted zone transition preferences encoded at crystallization.
   * Transitions with higher weight represent the pathway's dominant
   * routing tendency; weight decays toward uniform if the script
   * is dissolved and re-formed under different conditions.
   */
  transitions: ZoneTransition[];

  /**
   * The field classification prevailing during the majority of
   * traversal cycles that contributed to crystallization.
   * Used as the primary activation context classifier.
   */
  dominantClassificationAtFormation: FieldClassification;

  // --- Fitness tracking ---

  /** Dissolution floor F_d computed at crystallization */
  dissolutionFloor: number;

  /** All SFI observations recorded since crystallization */
  sfiObservations: SFIObservation[];

  /** Current rolling mean SFI across the observation window */
  currentRollingSFI: number;

  // --- Activation history ---

  /** All activation records since crystallization */
  activationHistory: ScriptActivationRecord[];

  /** Total activation count */
  activationCount: number;

  /** Script Activation Frequency: activations per N substrate events */
  saf: number;

  // --- Lifecycle ---

  lifecycleState: ScriptLifecycleState;

  /** Substrate event index at dissolution, if applicable */
  dissolutionEventIndex?: number;
}

/**
 * A candidate pathway under observation — not yet crystallized.
 * Maintained in the PathwayObservationRegistry until threshold is crossed
 * or the pathway falls below minimum activity and is pruned.
 */
export interface CandidatePathway {
  id: string;

  /** Ordered zone sequence defining the pathway */
  zoneSequence: number[];

  /** Current traversal count */
  traversalCount: number;

  /** Substrate event index of first traversal */
  firstObservedAt: number;

  /** Substrate event index of most recent traversal */
  lastObservedAt: number;

  /** Most recent threshold evaluation */
  lastThresholdEvaluation: {
    threshold: number;
    metrics: SubstrateMetrics;
    eventIndex: number;
  } | null;
}

// ---------------------------------------------------------------------------
// 8. PROCESSFIELD MEMORY EXTENSION
// ---------------------------------------------------------------------------

/**
 * Extension interface for ProcessFieldMemory to incorporate
 * Archetypal Script management.
 *
 * This is an additive extension — existing ProcessFieldMemory
 * fields and methods are unchanged. The script registry and
 * observation pipeline sit alongside the existing architecture.
 */
export interface ProcessFieldMemoryWithScripts {

  // --- Pathway observation ---

  /**
   * Registry of candidate pathways under observation.
   * Keyed by a canonical pathway identifier (zone sequence hash).
   */
  pathwayObservationRegistry: Map<string, CandidatePathway>;

  /**
   * Active crystallized scripts, keyed by script ID.
   */
  activeScripts: Map<string, ArchetypalScript>;

  /**
   * Dissolved scripts, retained for Governor audit purposes.
   * Not invoked; preserved as developmental record.
   */
  dissolvedScripts: ArchetypalScript[];

  // --- Governor event queues ---

  /** Pending crystallization events awaiting Governor acknowledgement */
  pendingCrystallizationEvents: CrystallizationEvent[];

  /** Pending dissolution events awaiting Governor acknowledgement */
  pendingDissolutionEvents: DissolutionEvent[];

  // --- Threshold parameters ---

  /** Active threshold parameters; tunable per experimental phase */
  thresholdParams: ThresholdParameters;
}

// ---------------------------------------------------------------------------
// 9. CORE LIFECYCLE OPERATIONS
// ---------------------------------------------------------------------------

/**
 * Generates a canonical identifier for a zone transition sequence.
 * Used as the registry key for candidate pathways.
 */
export function pathwayId(zoneSequence: number[]): string {
  return zoneSequence.join('-');
}

/**
 * Records a pathway traversal in the observation registry.
 * If the pathway is new, creates a CandidatePathway entry.
 * Returns the updated candidate.
 */
export function recordTraversal(
  registry: Map<string, CandidatePathway>,
  zoneSequence: number[],
  eventIndex: number,
): CandidatePathway {
  const id = pathwayId(zoneSequence);
  const existing = registry.get(id);

  if (existing) {
    existing.traversalCount += 1;
    existing.lastObservedAt = eventIndex;
    return existing;
  }

  const candidate: CandidatePathway = {
    id,
    zoneSequence,
    traversalCount: 1,
    firstObservedAt: eventIndex,
    lastObservedAt: eventIndex,
    lastThresholdEvaluation: null,
  };

  registry.set(id, candidate);
  return candidate;
}

/**
 * Attempts crystallization of a candidate pathway.
 *
 * Checks the crystallization threshold against current substrate metrics.
 * If permitted, constructs an ArchetypalScript and emits a
 * CrystallizationEvent for Governor processing.
 *
 * Returns the new script if crystallization occurred, null otherwise.
 */
export function attemptCrystallization(
  candidate: CandidatePathway,
  metrics: SubstrateMetrics,
  eventIndex: number,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): { script: ArchetypalScript; event: CrystallizationEvent } | null {

  const threshold = computeCrystallizationThreshold(metrics, params);

  // Update threshold evaluation record on candidate
  candidate.lastThresholdEvaluation = {
    threshold,
    metrics,
    eventIndex,
  };

  if (candidate.traversalCount < threshold) return null;

  const dissolutionFloor = computeDissolutionFloor(threshold, params);

  // Build zone transitions from the sequence
  // Weight is uniform at crystallization; will differentiate via SFI
  const transitions: ZoneTransition[] = [];
  for (let i = 0; i < candidate.zoneSequence.length - 1; i++) {
    transitions.push({
      fromZone: candidate.zoneSequence[i],
      toZone:   candidate.zoneSequence[i + 1],
      weight:   1.0 / (candidate.zoneSequence.length - 1),
    });
  }

  const script: ArchetypalScript = {
    id: `script-${candidate.id}-${eventIndex}`,
    crystallizationEventIndex: eventIndex,
    traversalCountAtCrystallization: candidate.traversalCount,
    crystallizationThreshold: threshold,
    formationMetrics: { ...metrics },
    formationFieldState: { ...metrics.fieldState },
    transitions,
    dominantClassificationAtFormation: metrics.fieldClassification,
    dissolutionFloor,
    sfiObservations: [],
    currentRollingSFI: 0,
    activationHistory: [],
    activationCount: 0,
    saf: 0,
    lifecycleState: 'crystallized',
  };

  const event: CrystallizationEvent = {
    scriptId: script.id,
    substrateEventIndex: eventIndex,
    crystallizationThreshold: threshold,
    dissolutionFloor,
    formationMetrics: { ...metrics },
    formationFieldState: { ...metrics.fieldState },
  };

  return { script, event };
}

/**
 * Evaluates a script activation request.
 *
 * Computes context distance and Governor penalty.
 * Returns an activation record; sets governorApproved = false
 * if penalty reaches the veto threshold (1.0).
 */
export function evaluateActivation(
  script: ArchetypalScript,
  currentFieldState: ProcessFieldState,
  eventIndex: number,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): ScriptActivationRecord {
  const distance = computeContextDistance(
    script.formationFieldState,
    currentFieldState,
  );
  const penalty = computeContextPenalty(distance, params);

  return {
    activationIndex: eventIndex,
    contextDistance: distance,
    contextPenalty: penalty,
    preActivationFieldState: { ...currentFieldState },
    governorApproved: penalty < 1.0,
  };
}

/**
 * Records an SFI observation on a script and updates rolling SFI.
 * Evaluates dissolution condition and updates lifecycle state if triggered.
 *
 * Returns a DissolutionEvent if dissolution is triggered, null otherwise.
 * The minimum observation window before dissolution is evaluated
 * is set to N_base to prevent premature dissolution on sparse data.
 */
export function recordSFIObservation(
  script: ArchetypalScript,
  observation: SFIObservation,
  params: ThresholdParameters = DEFAULT_THRESHOLD_PARAMS,
): DissolutionEvent | null {

  script.sfiObservations.push(observation);
  script.currentRollingSFI = computeRollingSFI(script.sfiObservations);

  const windowSufficient = script.sfiObservations.length >= params.nBase;

  if (isDissolutionTriggered(
    script.currentRollingSFI,
    script.dissolutionFloor,
    windowSufficient,
  )) {
    script.lifecycleState = 'dissolved';
    script.dissolutionEventIndex = observation.timestamp;

    return {
      scriptId: script.id,
      substrateEventIndex: observation.timestamp,
      finalRollingSFI: script.currentRollingSFI,
      dissolutionFloor: script.dissolutionFloor,
      observationCount: script.sfiObservations.length,
      formationMetrics: script.formationMetrics,
    };
  }

  // Flag the script if SFI is declining but not yet below dissolution floor
  if (
    windowSufficient &&
    script.currentRollingSFI < script.dissolutionFloor * 1.25
  ) {
    script.lifecycleState = 'flagged';
  }

  return null;
}

/**
 * Updates Script Activation Frequency.
 * SAF = activationCount / elapsed substrate events since crystallization.
 */
export function updateSAF(
  script: ArchetypalScript,
  currentEventIndex: number,
): void {
  const elapsed = currentEventIndex - script.crystallizationEventIndex;
  if (elapsed > 0) {
    script.saf = script.activationCount / elapsed;
  }
}

// ---------------------------------------------------------------------------
// 10. UTILITY
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Diagnostic summary of an ArchetypalScript.
 * Suitable for Governor audit logs and experimental event records.
 */
export function scriptSummary(script: ArchetypalScript): string {
  return [
    "Script: " + script.id,
    "  Lifecycle:           " + script.lifecycleState,
    "  Formation FC:        " + script.dominantClassificationAtFormation,
    "  Formation RCS:       " + script.formationMetrics.rcs.toFixed(3),
    "  Formation γ-density: " + script.formationMetrics.gammaDensity.toFixed(3),
    "  Crystallization T_c: " + script.crystallizationThreshold,
    "  Dissolution floor:   " + script.dissolutionFloor.toFixed(3),
    "  Traversals at cryst: " + script.traversalCountAtCrystallization,
    "  Activation count:    " + script.activationCount,
    "  SAF:                 " + script.saf.toFixed(4),
    "  Rolling SFI:         " + script.currentRollingSFI.toFixed(3),
    "  SFI observations:    " + script.sfiObservations.length,
    "  Transitions:         " + script.transitions.length,
  ].join('\n');
}

export function observeNumogramTransitionForScripts(
  memory: ProcessFieldMemoryWithScripts,
  zoneSequence: number[],
  metrics: SubstrateMetrics,
  eventIndex: number,
): {
  candidateId: string;
  traversalCount: number;
  threshold: number;
  crystallized: boolean;
  scriptId?: string;
} {
  const candidate = recordTraversal(
    memory.pathwayObservationRegistry,
    zoneSequence,
    eventIndex,
  );

  const threshold = computeCrystallizationThreshold(
    metrics,
    memory.thresholdParams,
  );

  const result = attemptCrystallization(
    candidate,
    metrics,
    eventIndex,
    memory.thresholdParams,
  );

  if (result) {
    memory.activeScripts.set(result.script.id, result.script);
    memory.pendingCrystallizationEvents.push(result.event);

    return {
      candidateId: candidate.id,
      traversalCount: candidate.traversalCount,
      threshold,
      crystallized: true,
      scriptId: result.script.id,
    };
  }

  return {
    candidateId: candidate.id,
    traversalCount: candidate.traversalCount,
    threshold,
    crystallized: false,
  };
}
