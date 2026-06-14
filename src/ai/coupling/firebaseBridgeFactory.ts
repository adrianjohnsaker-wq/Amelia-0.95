// src/ai/coupling/firebaseBridgeFactory.ts

import type { Firestore } from "firebase/firestore";
import { AmeliaProcessBridge } from "./AmeliaProcessBridge";
import { FirebaseProcessFieldMemory } from "./FirebaseProcessFieldMemory";
import { CouplingConfig } from "./types";

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function createPersistentBridge(
  db: Firestore,
  sessionId: string,
  config: Partial<CouplingConfig> = {}
): Promise<AmeliaProcessBridge> {
  const memory = new FirebaseProcessFieldMemory(db, sessionId);
  
  // CouplingArchitecture is now handled via InternalCouplingStub in AmeliaProcessBridge
  const bridge = new AmeliaProcessBridge(undefined, memory);

  try {
    await withTimeout(
      memory.loadFromFirestore(),
      4000,
      "FirebaseProcessFieldMemory.loadFromFirestore"
    );
  } catch (err) {
    console.error("[createPersistentBridge] Firestore load failed/timeout:", err);
    // Continue with empty memory. Do not block the relay route.
  }

  console.log(
    `[createPersistentBridge] Bridge ready. Session=${sessionId}. ` +
    `Loaded ${memory.history().length} traces.`
  );

  return bridge;
}

export const SESSION_IDS = {
  C1_MAIN: "amelia-c1-main-series",
  C1_PRE: "amelia-c1-pre-validation",
  A_SERIES: "amelia-a-series",
  DEVELOPMENT: "amelia-development",
} as const;
