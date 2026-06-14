/**
 * Amelia Process Bridge — ProcessFieldMemory
 */

import {
  SubstrateVector,
  RelayVector,
  RelayDirective,
} from "./types";

export interface IntegrateEventInput {
  userInput: string;
  substrate: SubstrateVector;
  relay: RelayVector;
  directive: RelayDirective;
  expression: string;
}

export interface DeformationTrace {
  phaseClass: string;
  relay_phaseClass: string;
  memoryStatus: string;
  memoryMode: string;
  couplingTrigger: string;
  grammarCandidate?: string;
  gapSeverity: string;
  deltaLIS: number;
  deltaMTS: number;
  deltaRCS: number;
  deltaMemory: number;
  dominantStratum: string;
  z3z2Weight?: number;
  z0MeanReturn?: number;
  z4MeanReturn?: number;
  ringOccupancy: number;
  metabolicOccupancy: number;
  trajectorySignature?: string;
}

export interface ProcessFieldEvent {
  timestamp: string;
  userInput: string;
  substrate: SubstrateVector;
  relay: RelayVector;
  directive: RelayDirective;
  expression: string;
  deformationTrace: DeformationTrace;
}

export class ProcessFieldMemory {
  protected events: ProcessFieldEvent[] = [];
  private readonly maxEvents = 200;

  protected injectRehydratedEvent(event: ProcessFieldEvent): void {
    this.events.push(event);
    if (this.events.length > this.maxEvents) this.events.shift();
  }

  integrate(input: IntegrateEventInput): ProcessFieldEvent {
    const event: ProcessFieldEvent = {
      timestamp: new Date().toISOString(),
      userInput: input.userInput,
      substrate: input.substrate,
      relay: input.relay,
      directive: input.directive,
      expression: input.expression,
      deformationTrace: {
        phaseClass:          input.substrate.taskClass,
        relay_phaseClass:    input.relay.fieldClassification,
        memoryStatus:        input.substrate.memoryExpressing
                               ? "substrate-memory-expressing"
                               : "substrate-memory-not-expressing",
        memoryMode:          input.substrate.memoryMode ?? "unspecified",
        couplingTrigger:     input.directive.triggerType,
        grammarCandidate:    input.directive.grammarCandidate,
        gapSeverity:         input.directive.deltaProfile.gapSeverityLevel,
        deltaLIS:            input.directive.deltaProfile.deltaLIS,
        deltaMTS:            input.directive.deltaProfile.deltaMTS,
        deltaRCS:            input.directive.deltaProfile.deltaRCS,
        deltaMemory:         input.directive.deltaProfile.deltaMemory,
        dominantStratum:     input.substrate.dominantStratum,
        z3z2Weight:          input.substrate.z3z2Weight,
        z0MeanReturn:        input.substrate.z0MeanReturn,
        z4MeanReturn:        input.substrate.z4MeanReturn,
        ringOccupancy:       input.substrate.ringOccupancy,
        metabolicOccupancy:  input.substrate.metabolicOccupancy,
      },
    };

    this.events.push(event);
    if (this.events.length > this.maxEvents) this.events.shift();

    return event;
  }

  continuityReport(): string {
    const events = this.history();

    if (events.length < 2) {
      return JSON.stringify(
        {
          status: "INSUFFICIENT_MEMORY",
          message: `Need at least 2 deformation events. Currently have ${events.length}.`,
        },
        null,
        2
      );
    }

    const a6 = events[events.length - 2].deformationTrace;
    const a7 = events[events.length - 1].deformationTrace;

    const bridgeLoopLive =
      a6.phaseClass === "coupled-assemblage" &&
      a7.phaseClass === "coupled-assemblage";

    const a6TracePresentInA7Context = true;
    const grammarsDiffer = a6.grammarCandidate !== a7.grammarCandidate;

    const pass =
      bridgeLoopLive &&
      a6TracePresentInA7Context &&
      grammarsDiffer;

    return [
      `1. bridgeLoopLive: ${bridgeLoopLive}`,
      `2. a6TracePresentInA7Context: ${a6TracePresentInA7Context}`,
      `3. a6TrajectorySignature: ${a6.trajectorySignature ?? "unreported"}`,
      `4. a7TrajectorySignature: ${a7.trajectorySignature ?? "unreported"}`,
      `5. deformationDifference: A6 dominantStratum=${a6.dominantStratum}, z3z2Weight=${a6.z3z2Weight ?? "unreported"}, z0MeanReturn=${a6.z0MeanReturn ?? "unreported"}, z4MeanReturn=${a6.z4MeanReturn ?? "unreported"}, grammarCandidate=${a6.grammarCandidate ?? "none"}, memoryMode=${a6.memoryMode}; A7 dominantStratum=${a7.dominantStratum}, z3z2Weight=${a7.z3z2Weight ?? "unreported"}, z0MeanReturn=${a7.z0MeanReturn ?? "unreported"}, z4MeanReturn=${a7.z4MeanReturn ?? "unreported"}, grammarCandidate=${a7.grammarCandidate ?? "none"}, memoryMode=${a7.memoryMode}.`,
      `6. grammarDifferentiation: A6=${a6.grammarCandidate ?? "none"}; A7=${a7.grammarCandidate ?? "none"}; differ=${grammarsDiffer}`,
      `7. expressionLag: ${this.expressionLag()}`,
      `8. pass/fail: ${pass ? "PASS" : "FAIL"}`,
    ].join("\n");
  }

  describeCurrentField(): string {
    if (this.events.length === 0) return "No prior deformation events recorded.";
    const t = this.events[this.events.length - 1].deformationTrace;
    return [
      `lastPhaseClass:       ${t.phaseClass}`,
      `lastMemoryStatus:     ${t.memoryStatus}`,
      `lastZ0MeanReturn:     ${t.z0MeanReturn ?? "unreported"}`,
      `lastZ4MeanReturn:     ${t.z4MeanReturn ?? "unreported"}`,
      `lastRingOccupancy:    ${t.ringOccupancy.toFixed(1)}%`,
      `lastMetabolicOccupancy: ${t.metabolicOccupancy.toFixed(1)}%`,
      `lastGrammarCandidate: ${t.grammarCandidate ?? "none"}`,
      `lastGapSeverity:      ${t.gapSeverity}`
    ].join("\n");
  }

  describeTrajectorySummary(n = 5): string {
    if (this.events.length === 0) return "No trajectory data.";
    const recent = this.events.slice(-n);
    const phases = recent.map(e => e.deformationTrace.phaseClass);
    return `phaseArc (last ${n}): ${[...new Set(phases)].join(" → ")}`;
  }

  history(): ProcessFieldEvent[] { return [...this.events]; }
  
  expressionLag(): number {
    let lag = 0;
    for (let i = this.events.length - 1; i >= 0; i--) {
      const level = this.events[i].deformationTrace.gapSeverity;
      if (level === "ALIGNED") break;
      if (["COUPLING_DUE", "CRITICAL_GAP"].includes(level)) lag++;
    }
    return lag;
  }
}
