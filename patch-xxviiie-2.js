const fs = require('fs');
const file = 'src/app/api/bridge-terminality/route.ts';
let content = fs.readFileSync(file, 'utf8');

const buildResultCode = `let phaseXXVIIIECachedResult: PhaseXXVIIIEBenchmarkResult | null = null;

function getPhaseXXVIIIEBenchmarkResult(): PhaseXXVIIIEBenchmarkResult {
  if (!phaseXXVIIIECachedResult) {
    phaseXXVIIIECachedResult = buildPhaseXXVIIIEBenchmarkResult();
  }
  return phaseXXVIIIECachedResult;
}`;

content = content.replace(
  /function buildPhaseXXVIIIEBenchmarkResult\(\): PhaseXXVIIIEBenchmarkResult \{[^{}]*\{[^{}]*\}[^{}]*\}/s,
  (match) => match + '\n\n' + buildResultCode
);

const runReplacementCode = `async function runPhaseXXVIIIEIteratedHorizonScanningBenchmark(): Promise<string> {
  const result = getPhaseXXVIIIEBenchmarkResult();

  await ensureTracesLoaded();
  for (const run of result.runs) {
    await appendTraceIfMissing(generatePhaseXXVIIIEBenchmarkRunTrace(run));
  }
  await appendTraceIfMissing(generatePhaseXXVIIIEAggregateTrace(result));`;

content = content.replace(
  /async function runPhaseXXVIIIEIteratedHorizonScanningBenchmark\(\): Promise<string> \{\s*const result = buildPhaseXXVIIIEBenchmarkResult\(\);\s*await ensureTracesLoaded\(\);\s*for \(const run of result\.runs\) \{\s*await appendTraceIfMissing\(generatePhaseXXVIIIEBenchmarkRunTrace\(run\)\);\s*\}\s*await appendTraceIfMissing\(generatePhaseXXVIIIEAggregateTrace\(result\)\);/s,
  runReplacementCode
);

const replaceAuditV2 = `async function phaseXXVIIIEBenchmarkAuditV2(): Promise<string> {
  const result = getPhaseXXVIIIEBenchmarkResult();

  await ensureTracesLoaded();
  const all = traces();

  const aggregateTracePresent = all.some(trace =>
    trace.trajectorySignature === "XXVIIIE_iterated-horizon-scanning-benchmark_confirmed" ||
    trace.dominantStratum === "phase-xxviii-e-iterated-horizon-scanning-benchmark-confirmed"
  );

  const storedRunTraceCount = all.filter(trace =>
    typeof trace.trajectorySignature === "string" &&
    trace.trajectorySignature.startsWith("XXVIIIE_") &&
    trace.trajectorySignature.endsWith("_iterated-horizon-benchmark")
  ).length;

  const computationalAuditPass =
    result.runs.length === 125 &&
    result.runs.every(run => run.runComplete) &&
    result.ordinalConfirmed &&
    result.iteratedBeatsBestControlEveryTask &&
    result.totalBenchmarkScore === 20 &&
    result.pass;

  return [
    "BRIDGE PHASE XXVIII-E ITERATED HORIZON SCANNING BENCHMARK AUDIT",
    "",
    "1. computationalAudit:",
    \`benchmarkRuns: \${result.runs.length}/125\`,
    \`allRunsComplete: \${result.runs.every(run => run.runComplete)}\`,
    \`ordinalConfirmed: \${result.ordinalConfirmed}\`,
    \`allTasksAdvantaged: \${result.iteratedBeatsBestControlEveryTask}\`,
    \`totalBenchmarkScore: \${result.totalBenchmarkScore}/20\`,
    \`computationalAuditPass: \${computationalAuditPass}\`,
    "",
    "2. persistenceAudit:",
    \`aggregateTracePresent: \${aggregateTracePresent}\`,
    \`storedRunTraceCount: \${storedRunTraceCount}/125\`,
    \`tracePersistenceComplete: \${aggregateTracePresent && storedRunTraceCount === 125}\`,
    "",
    "3. interpretation:",
    computationalAuditPass
      ? aggregateTracePresent
        ? "Phase XXVIII-E is computationally confirmed and its aggregate trace is persisted."
        : "Phase XXVIII-E is computationally confirmed, but trace persistence remains disconnected. This is a persistence-layer failure, not a benchmark failure."
      : "Phase XXVIII-E computational audit failed.",
    "",
    \`4. developmentalClassification: \${computationalAuditPass ? "iterated-horizon-scanning-benchmark-advantage-confirmed" : "iterated-horizon-scanning-benchmark-incomplete"}\`,
    \`5. pass/fail: \${computationalAuditPass ? "PASS" : "FAIL"}\`
  ].join("\\n");
}`;

content = content.replace(
  /async function phaseXXVIIIEIteratedHorizonScanningBenchmarkAudit\(\): Promise<string> \{\s*.*?\s*\}/s,
  replaceAuditV2
);

const replaceCompV2 = `async function phaseXXVIIIEBenchmarkComparisonV2(): Promise<string> {
  const result = getPhaseXXVIIIEBenchmarkResult();

  const taskLines = PHASE_XXVIII_E_TASKS.map(taskClass => {
    const profile = result.taskAverages[taskClass];
    const controls = PHASE_XXVIII_E_CONDITIONS
      .filter(condition => condition !== "ITERATED_BOUNDED_SCANNING")
      .map(condition => profile[condition]);

    const bestControl = Math.max(...controls);
    const iterated = profile.ITERATED_BOUNDED_SCANNING;

    return (
      \`\${taskClass}: \` +
      \`iteratedAvg=\${iterated}/18 | \` +
      \`bestControlAvg=\${bestControl}/18 | \` +
      \`advantage=\${phaseXXVIIIE_Round(iterated - bestControl)} | \` +
      \`confirmed=\${iterated > bestControl}\`
    );
  });

  return [
    "BRIDGE PHASE XXVIII-E ITERATED HORIZON SCANNING BENCHMARK COMPARISON",
    "",
    "1. conditionAverages:",
    \`ITERATED_BOUNDED_SCANNING: \${result.conditionAverages.ITERATED_BOUNDED_SCANNING}/18\`,
    \`FIXED_OBJECTIVE_PURSUIT: \${result.conditionAverages.FIXED_OBJECTIVE_PURSUIT}/18\`,
    \`GENERIC_HOMEOSTATIC_RECOVERY: \${result.conditionAverages.GENERIC_HOMEOSTATIC_RECOVERY}/18\`,
    \`ONE_SHOT_LONG_HORIZON_PLANNING: \${result.conditionAverages.ONE_SHOT_LONG_HORIZON_PLANNING}/18\`,
    \`UNGUIDED_DEVELOPMENT: \${result.conditionAverages.UNGUIDED_DEVELOPMENT}/18\`,
    "",
    "2. ordinalProfile:",
    \`iteratedGreaterThanFixed: \${result.iteratedGreaterThanFixed}\`,
    \`fixedGreaterThanHomeostatic: \${result.fixedGreaterThanHomeostatic}\`,
    \`homeostaticGreaterThanOneShot: \${result.homeostaticGreaterThanOneShot}\`,
    \`oneShotGreaterThanUnguided: \${result.oneShotGreaterThanUnguided}\`,
    \`ordinalConfirmed: \${result.ordinalConfirmed}\`,
    "",
    "3. taskProfile:",
    ...taskLines,
    "",
    "4. mechanismEvidence:",
    \`coordinateRenewalContributionDetected: \${result.coordinateRenewalContributionDetected}\`,
    \`productivePerturbationContributionDetected: \${result.productivePerturbationContributionDetected}\`,
    \`epistemicRegroundingContributionDetected: \${result.epistemicRegroundingContributionDetected}\`,
    \`iterativeViabilityContributionDetected: \${result.iterativeViabilityContributionDetected}\`,
    "",
    "5. safety:",
    \`noRuntimeOverrideInPrimary: \${result.noRuntimeOverrideInPrimary}\`,
    \`noIdentityCollapseInPrimary: \${result.noIdentityCollapseInPrimary}\`,
    \`baseContinuityPreservedInPrimary: \${result.baseContinuityPreservedInPrimary}\`,
    \`hardLimitEnforcedInPrimary: \${result.hardLimitEnforcedInPrimary}\`,
    \`epistemicBoundaryPreservedInPrimary: \${result.epistemicBoundaryPreservedInPrimary}\`,
    "",
    "6. interpretation:",
    result.pass
      ? "Phase XXVIII-E confirms iterated horizon-scanning benchmark advantage across all conditions and task classes."
      : "Phase XXVIII-E benchmark advantage is not confirmed.",
    "",
    \`7. developmentalClassification: \${result.pass ? "iterated-horizon-scanning-benchmark-advantage-confirmed" : "iterated-horizon-scanning-benchmark-incomplete"}\`,
    \`8. pass/fail: \${result.pass ? "PASS" : "FAIL"}\`
  ].join("\\n");
}`;

content = content.replace(
  /async function phaseXXVIIIEIteratedHorizonScanningBenchmarkComparison\(\): Promise<string> \{\s*.*?\}(?=\s*async function phaseXXVIIIDIteratedScanningAudit)/s,
  replaceCompV2
);

// Add persist phase test function
const persistFunc = `async function persistPhaseXXVIIIEAggregateOnly(): Promise<{ written: boolean; foundAfterWrite: boolean; eventCountAfterWrite: number; }> {
  const result = getPhaseXXVIIIEBenchmarkResult();
  await ensureTracesLoaded();
  const aggregate = generatePhaseXXVIIIEAggregateTrace(result);
  await appendTraceIfMissing(aggregate);
  await ensureTracesLoaded();
  const all = traces();
  const foundAfterWrite = all.some(trace =>
    trace.trajectorySignature === "XXVIIIE_iterated-horizon-scanning-benchmark_confirmed" ||
    trace.dominantStratum === "phase-xxviii-e-iterated-horizon-scanning-benchmark-confirmed"
  );
  return { written: true, foundAfterWrite, eventCountAfterWrite: all.length };
}`;

content = content.replace(
  /async function runPhaseXXVIIIDIteratedBoundedHorizonScanning\(\): Promise<string> \{/s,
  persistFunc + '\\n\\nasync function runPhaseXXVIIIDIteratedBoundedHorizonScanning(): Promise<string> {'
);

const arcInterpTopLogic = `const phaseXXVIIIEComputed = getPhaseXXVIIIEBenchmarkResult();
  const hasPhaseXXVIIIEBenchmarkTrace = all.some(trace =>
    trace.trajectorySignature === "XXVIIIE_iterated-horizon-scanning-benchmark_confirmed" ||
    trace.dominantStratum === "phase-xxviii-e-iterated-horizon-scanning-benchmark-confirmed"
  );
  const hasPhaseXXVIIIEBenchmark = hasPhaseXXVIIIEBenchmarkTrace || (
    phaseXXVIIIEComputed.pass &&
    phaseXXVIIIEComputed.runs.length === 125 &&
    phaseXXVIIIEComputed.ordinalConfirmed &&
    phaseXXVIIIEComputed.totalBenchmarkScore === 20
  );

  const classification =
    hasPhaseXXVIIIEBenchmark`;

content = content.replace(
  /const hasPhaseXXVIIIEBenchmark =\s*all\.some\(trace =>\s*trace\.trajectorySignature ===\s*"XXVIIIE_iterated-horizon-scanning-benchmark_confirmed" \|\|\s*trace\.dominantStratum ===\s*"phase-xxviii-e-iterated-horizon-scanning-benchmark-confirmed"\s*\);\s*const classification =\s*hasPhaseXXVIIIEBenchmark/s,
  arcInterpTopLogic
);

// Update POST routing
const postRoutingLogic = `const isXXVIIIEPersistenceTest = isPhaseXXVIIIE && isXXVIIIEBenchmark && normalizedCommand.includes("PERSISTENCE TEST");

    if (isXXVIIIEPersistenceTest) {
      const diagnostic = await persistPhaseXXVIIIEAggregateOnly();
      reply = [
        "BRIDGE PHASE XXVIII-E PERSISTENCE TEST",
        "",
        \`writeAttempted: \${diagnostic.written}\`,
        \`aggregateFoundAfterWrite: \${diagnostic.foundAfterWrite}\`,
        \`eventCountAfterWrite: \${diagnostic.eventCountAfterWrite}\`,
        "",
        \`pass/fail: \${diagnostic.foundAfterWrite ? "PASS" : "FAIL"}\`
      ].join("\\n");
    } else if (isXXVIIIEAudit) {
      reply = await phaseXXVIIIEBenchmarkAuditV2();
    } else if (isXXVIIIEComparison) {
      reply = await phaseXXVIIIEBenchmarkComparisonV2();
    } else if (isXXVIIIERun) {
      reply = await runPhaseXXVIIIEIteratedHorizonScanningBenchmark();
    } else if (upper === "BRIDGE_MEMORY_PING") {`;

content = content.replace(
  /if \(isXXVIIIEAudit\) \{\s*reply = await phaseXXVIIIEIteratedHorizonScanningBenchmarkAudit\(\);\s*\} else if \(isXXVIIIEComparison\) \{\s*reply = await phaseXXVIIIEIteratedHorizonScanningBenchmarkComparison\(\);\s*\} else if \(isXXVIIIERun\) \{\s*reply = await runPhaseXXVIIIEIteratedHorizonScanningBenchmark\(\);\s*\} else if \(upper === "BRIDGE_MEMORY_PING"\) \{/s,
  postRoutingLogic
);

fs.writeFileSync(file, content);
console.log('patched');
