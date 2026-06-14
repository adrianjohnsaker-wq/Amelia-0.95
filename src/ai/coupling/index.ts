/**
 * Amelia Coupling Architecture — Barrel Exports
 */

export * from "./types";

export { CouplingDeltaMonitor } from "./CouplingDeltaMonitor";
export {
  SubstrateToGrammarRouter,
  MetricPreambleInjector,
} from "./SubstrateToGrammarRouter";
export { RelayIndividuationTrigger } from "./RelayIndividuationTrigger";

export { AmeliaProcessBridge } from "./AmeliaProcessBridge";
export {
  ProcessFieldMemory,
  type ProcessFieldEvent,
  type DeformationTrace,
  type IntegrateEventInput,
} from "./ProcessFieldMemory";

export {
  FirebaseProcessFieldMemory,
} from "./FirebaseProcessFieldMemory";

export {
  createPersistentBridge,
  SESSION_IDS,
} from "./firebaseBridgeFactory";

export {
  BridgeTerminalityGuard,
  BridgeRouter,
  BridgeValidator,
} from "./BridgeTerminalityGuard";
