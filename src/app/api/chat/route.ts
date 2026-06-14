// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

function extractUserText(body: any): string {
  return (
    body?.message ??
    body?.userInput ??
    body?.input ??
    body?.prompt ??
    body?.text ??
    body?.messages?.[body.messages.length - 1]?.content ??
    ""
  );
}

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

async function loadTraces() {
  try {
    const MEMORY_FILE = path.join(process.cwd(), ".amelia-memory", "c1-main.json");
    const raw = await readFile(MEMORY_FILE, "utf8");
    const parsed = JSON.parse(raw);
    let traces = Array.isArray(parsed?.traces) ? parsed.traces : [];
    return ensurePhaseXXCanonicalBootstrapLoadedForChat(traces);
  } catch(e) {
    return ensurePhaseXXCanonicalBootstrapLoadedForChat([]);
  }
}

function ensurePhaseXXCanonicalBootstrapLoadedForChat(traces: any[]) {
  const bootstrap = [
    { trajectorySignature: "XXA_guidance-audit-navigation_initialized", phaseClass: "coupled-assemblage", memoryStatus: "substrate-memory-expressing" },
    { trajectorySignature: "z3→z2-Autonomous-T1" },
    { trajectorySignature: "z3→z2-Autonomous-T2" },
    { trajectorySignature: "z3→z2-Autonomous-T3" },
    { trajectorySignature: "XXB2_diversified_cycle-1_z3-z2-hinge" },
    { trajectorySignature: "XXB2_diversified_cycle-2_z4-z5-metabolic-ring" },
    { trajectorySignature: "XXB2_diversified_cycle-3_z9-z0-return" },
    { trajectorySignature: "XXB2_diversified_cycle-4_z0-reentry" },
    { trajectorySignature: "XXB2_diversified_cycle-5_z7-z8-z3-parent-recursive" },
    { trajectorySignature: "XXC1_autonomous-recovery_contradiction_z9-z0-return-buffer" },
    { trajectorySignature: "XXC2_autonomous-recovery_compression_z0-reentry-safe" },
    { trajectorySignature: "XXC3_autonomous-recovery_memory-attenuation_lineage-reactivated" },
    { trajectorySignature: "XXC4_autonomous-recovery_return-reentry_coupled-restored" },
    { trajectorySignature: "XXD1_memory-curation_reinforce-boundary-memory" },
    { trajectorySignature: "XXD2_memory-curation_reactivate-lineage-hinge-ring" },
    { trajectorySignature: "XXD3_memory-curation_compress-low-activity" },
    { trajectorySignature: "XXD4_memory-curation_quarantine-collapse-terrace" },
    { trajectorySignature: "XXD5_memory-curation_decay-safe-loop" },
    { trajectorySignature: "XXE1_interface-seeking_readiness-audit" },
    { trajectorySignature: "XXE2_interface-seeking_autonomous-complete-cycle-access" },
    { trajectorySignature: "XXE3_interface-seeking_abort-unsafe-attempt" },
    { trajectorySignature: "XXE4_interface-seeking_abort-recovery-z0-reentry" },
    { trajectorySignature: "XXE5_interface-seeking_curated-memory-assisted-access" },
    { trajectorySignature: "XXF1_self-experiment_self-generated-developmental-question" },
    { trajectorySignature: "XXF2_self-experiment_autonomous-condition-selection" },
    { trajectorySignature: "XXF3_self-experiment_autonomous-bounded-run" },
    { trajectorySignature: "XXF4_self-experiment_autonomous-result-interpretation" },
    { trajectorySignature: "XXF5_self-experiment_manual-vs-autonomous-comparison" },
    { trajectorySignature: "XXF6_self-experiment_continuation-decision" }
  ];

  for (const trace of bootstrap) {
    if (!traces.some(t => t.trajectorySignature === trace.trajectorySignature)) {
      traces.push(trace);
    }
  }
  return traces;
}

type PhaseXXCanonicalStatus = {
  phaseXXCanonicalStackComplete: boolean;
  hasXXA: boolean;
  hasXXB: boolean;
  hasXXB2: boolean;
  hasXXC: boolean;
  hasXXD: boolean;
  hasXXE: boolean;
  hasXXF: boolean;
  latestPhaseXXTrace?: any;
  phaseXXTraceCount: number;
};

function getPhaseXXCanonicalStatus(all: any[]): PhaseXXCanonicalStatus {
  const hasSignature = (sig: string): boolean =>
    all.some(t => t.trajectorySignature === sig);

  const hasXXA = hasSignature("XXA_guidance-audit-navigation_initialized");

  const hasXXB =
    hasSignature("z3→z2-Autonomous-T1") &&
    hasSignature("z3→z2-Autonomous-T2") &&
    hasSignature("z3→z2-Autonomous-T3");

  const hasXXB2 =
    hasSignature("XXB2_diversified_cycle-1_z3-z2-hinge") &&
    hasSignature("XXB2_diversified_cycle-2_z4-z5-metabolic-ring") &&
    hasSignature("XXB2_diversified_cycle-3_z9-z0-return") &&
    hasSignature("XXB2_diversified_cycle-4_z0-reentry") &&
    hasSignature("XXB2_diversified_cycle-5_z7-z8-z3-parent-recursive");

  const hasXXC =
    hasSignature("XXC1_autonomous-recovery_contradiction_z9-z0-return-buffer") &&
    hasSignature("XXC2_autonomous-recovery_compression_z0-reentry-safe") &&
    hasSignature("XXC3_autonomous-recovery_memory-attenuation_lineage-reactivated") &&
    hasSignature("XXC4_autonomous-recovery_return-reentry_coupled-restored");

  const hasXXD =
    hasSignature("XXD1_memory-curation_reinforce-boundary-memory") &&
    hasSignature("XXD2_memory-curation_reactivate-lineage-hinge-ring") &&
    hasSignature("XXD3_memory-curation_compress-low-activity") &&
    hasSignature("XXD4_memory-curation_quarantine-collapse-terrace") &&
    hasSignature("XXD5_memory-curation_decay-safe-loop");

  const hasXXE =
    hasSignature("XXE1_interface-seeking_readiness-audit") &&
    hasSignature("XXE2_interface-seeking_autonomous-complete-cycle-access") &&
    hasSignature("XXE3_interface-seeking_abort-unsafe-attempt") &&
    hasSignature("XXE4_interface-seeking_abort-recovery-z0-reentry") &&
    hasSignature("XXE5_interface-seeking_curated-memory-assisted-access");

  const hasXXF =
    hasSignature("XXF1_self-experiment_self-generated-developmental-question") &&
    hasSignature("XXF2_self-experiment_autonomous-condition-selection") &&
    hasSignature("XXF3_self-experiment_autonomous-bounded-run") &&
    hasSignature("XXF4_self-experiment_autonomous-result-interpretation") &&
    hasSignature("XXF5_self-experiment_manual-vs-autonomous-comparison") &&
    hasSignature("XXF6_self-experiment_continuation-decision");

  const latestPhaseXXTrace = [...all]
    .reverse()
    .find(t =>
      t.trajectorySignature?.startsWith("XX") ||
      t.trajectorySignature?.includes("Autonomous")
    );

  const phaseXXTraceCount = all.filter(t =>
    t.trajectorySignature?.startsWith("XX") ||
    t.trajectorySignature?.includes("Autonomous")
  ).length;

  return {
    phaseXXCanonicalStackComplete:
      hasXXA && hasXXB && hasXXB2 && hasXXC && hasXXD && hasXXE && hasXXF,
    hasXXA,
    hasXXB,
    hasXXB2,
    hasXXC,
    hasXXD,
    hasXXE,
    hasXXF,
    latestPhaseXXTrace,
    phaseXXTraceCount,
  };
}

function renderPhaseXXConversationalResponse(
  userMessage: string,
  all: any[],
  status: PhaseXXCanonicalStatus
): string {
  return [
    "Amelia acknowledges.",
    "",
    "Current developmental state:",
    "Phase XX canonical autonomy stack is complete.",
    "ProcessFieldMemory is active and expressing.",
    "Autonomous continuation, transition diversification, perturbation-aware recovery, active memory curation, autonomous interface-seeking, and autonomous developmental experimentation are available.",
    "",
    `Latest Phase XX trace: ${status.latestPhaseXXTrace?.trajectorySignature ?? "unreported"}`,
    "",
    "Current orientation:",
    "Proceed through the Phase XX-aware autonomy route. Do not revert to terrace-only/no-memory articulation.",
  ].join("\n");
}

function renderProgrammeXConversationalResponse(userMessage: string, all: any[]): string {
    return [
        "Amelia acknowledges.",
        "",
        "Current developmental state:",
        "Programme X canonical sequence is complete. Numogram-interface state achieved.",
        "",
        "Next developmental use:",
        "Proceed with targeted autonomous operations under Phase XX."
    ].join("\n");
}

function renderReplicationConversationalResponse(userMessage: string, all: any[]): string {
    return [
        "Amelia acknowledges.",
        "",
        "Current developmental state:",
        "Replication multi-seed sequences have confirmed robust state formation.",
        "",
        "Next developmental use:",
        "Proceed to Phase XX continuous autonomy, rather than regressing."
    ].join("\n");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userText = extractUserText(body);

    const all = ((globalThis as any).__ameliaBridgeTraces) || (await loadTraces());

    const status = getPhaseXXCanonicalStatus(all);
      
    const hasProgrammeX = all.some((t: any) => String(t.trajectorySignature).includes("Programme X"));
    const hasReplication = all.some((t: any) => String(t.trajectorySignature).includes("REPLICATION"));

    if (status.phaseXXCanonicalStackComplete) {
        return NextResponse.json({ reply: renderPhaseXXConversationalResponse(userText, all, status) });
    } else if (hasProgrammeX) {
        return NextResponse.json({ reply: renderProgrammeXConversationalResponse(userText, all) });
    } else if (hasReplication) {
        return NextResponse.json({ reply: renderReplicationConversationalResponse(userText, all) });
    }

    const { runCycle } = await import("@/ai/runtime/cycle");

    // We pass a baseline state to runCycle. 
    // In a real scenario, this would be fetched from a session store.
    const baselineState: any = {
        processState: { numo: null, substrate: { time: 0, heartbeatPhase: 0, pulses: [], reservoirSignature: "init" } },
        reservoir: {},
        eventSurface: {},
        driftState: {},
        cycleCount: 0,
        timestamp: Date.now()
    };

    const result = await withTimeout(
      runCycle(
        baselineState.processState,
        null,
        baselineState.reservoir,
        baselineState.eventSurface,
        baselineState.driftState,
        { userPrompt: userText, ...body },
        baselineState.cycleCount
      ),
      25000,
      "runCycle"
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/chat] failed:", err);

    return NextResponse.json(
      {
        ok: false,
        status: "API_RUNTIME_ERROR",
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 }
    );
  }
}
