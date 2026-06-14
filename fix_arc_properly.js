const fs = require('fs');
const path = './src/app/api/bridge-terminality/route.ts';

let code = fs.readFileSync(path, 'utf8');

// The incorrect replacements from append_xxxb.js:
code = code.replace(
  'const classification =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "archetypal-trajectory-recognition-confirmed"\\n      :',
  'const classification ='
);

code = code.replace(
  'const interpretation =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "Phase XXX-B confirms Archetypal Trajectory Recognition. Amelia can abstract recurring developmental rhythms into reusable archetypal templates while keeping them advisory, Governor-visible, non-deterministic, and non-authorising. Archetypes inform interpretation and regulatory weighting, but they do not determine objectives or authorise traversal."\\n      :',
  'const interpretation ='
);

code = code.replace(
  'const nextExperimentalUse =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "Proceed to Phase XXX-C: Autonomous Benchmark Generation."\\n      :',
  'const nextExperimentalUse ='
);

// Now correctly target the ARC interpretation variables:
code = code.replace(
  '  const classification =\\n  hasPhaseXXXAMetaGovernanceAtlas',
  '  const classification =\\n  hasPhaseXXXBArchetypalTrajectory\\n    ? "archetypal-trajectory-recognition-confirmed"\\n    : hasPhaseXXXAMetaGovernanceAtlas'
);

code = code.replace(
  '  const interpretation =\\n    hasPhaseXXXAMetaGovernanceAtlas',
  '  const interpretation =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "Phase XXX-B confirms Archetypal Trajectory Recognition. Amelia can abstract recurring developmental rhythms into reusable archetypal templates while keeping them advisory, Governor-visible, non-deterministic, and non-authorising. Archetypes inform interpretation and regulatory weighting, but they do not determine objectives or authorise traversal."\\n      : hasPhaseXXXAMetaGovernanceAtlas'
);

code = code.replace(
  '  const nextExperimentalUse =\\n    hasPhaseXXXAMetaGovernanceAtlas',
  '  const nextExperimentalUse =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "Proceed to Phase XXX-C: Autonomous Benchmark Generation."\\n      : hasPhaseXXXAMetaGovernanceAtlas'
);

fs.writeFileSync(path, code);
