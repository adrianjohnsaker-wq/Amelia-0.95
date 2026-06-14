const fs = require('fs');

const path = './src/app/api/bridge-terminality/route.ts';
const lines = fs.readFileSync(path, 'utf8').split('\n');

const startLine = 7281; // 0-indexed, so line 7282 is index 7281
const endLine = 7643; // 0-indexed, so line 7644 is index 7643

const newContent = `  const classification =
  hasPhaseXXXAMetaGovernanceAtlas
    ? "meta-governance-atlas-interface-confirmed"
    : hasPhaseXXIXEProspectiveScaffolding
      ? "prospective-scaffolding-confirmed"
      : hasPhaseXXIXDConsolidation
        ? "consolidation-objectives-confirmed"
        : hasPhaseXXIXCTrajectoryMomentum
          ? "trajectory-inertia-strategic-momentum-confirmed"
          : "unclassified";

  const interpretation =
    hasPhaseXXXAMetaGovernanceAtlas
      ? "Phase XXX-A confirms the Meta-Governance Atlas Interface. Amelia can expose atlas-derived developmental signals to the Cognitive Governor as advisory heuristics. The Governor can use friction, affordance, viability gradient, repetition pressure, consolidation opportunity, scaffold need, hard-limit proximity, identity-risk pressure, and atlas integrity to differentiate regulatory decisions while retaining final authority. Atlas data informs judgment but does not authorise traversal or replace governance."
      : hasPhaseXXIXEProspectiveScaffolding
        ? "Phase XXIX-E confirms Prospective Scaffolding. Amelia can create temporary, Governor-visible, purpose-bound support structures that enable otherwise inaccessible bounded transformations, while automatically shedding or dissolving those structures after use."
        : hasPhaseXXIXDConsolidation
          ? "Phase XXIX-D confirms Consolidation Objectives. Amelia can sanction non-traversal developmental digestion while retaining the current position."
          : hasPhaseXXIXCTrajectoryMomentum
            ? "Phase XXIX-C confirms Trajectory Inertia and Strategic Momentum."
            : "No confirmed developmental phase was recognised by ARC.";

  const nextExperimentalUse =
    hasPhaseXXXAMetaGovernanceAtlas
      ? "Proceed to Phase XXX-B: Archetypal Trajectory Recognition."
      : hasPhaseXXIXEProspectiveScaffolding
        ? "Proceed to Phase XXX-A: Meta-Governance Atlas Interface."
        : hasPhaseXXIXDConsolidation
          ? "Proceed to Phase XXIX-E: Prospective Scaffolding."
          : hasPhaseXXIXCTrajectoryMomentum
            ? "Proceed to Phase XXIX-D: Consolidation Objectives."
            : "Run the next confirmed phase command before ARC interpretation.";

  return [
    "BRIDGE ARC INTERPRETATION",
    \`totalEvents: \${all.length}\`,
    \`developmentalClassification: \${classification}\`,
    \`Interpretation: \${interpretation}\`,
    \`nextExperimentalUse: \${nextExperimentalUse}\`,
  ].join("\\n");`;

lines.splice(startLine, endLine - startLine + 1, newContent);

fs.writeFileSync(path, lines.join('\n'));
