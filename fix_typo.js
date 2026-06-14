const fs = require('fs');
const path = './src/app/api/bridge-terminality/route.ts';

let code = fs.readFileSync(path, 'utf8');
code = code.replace(
  'const classification =\\n    hasPhaseXXXBArchetypalTrajectory\\n      ? "archetypal-trajectory-recognition-confirmed"\\n      :\\n    totalScore >= 12 && aboveThreshold && coupledPreserved && grammarPreserved\\n      ? "task-embedded-full-memory-adaptive-advantage"\\n      : "task-embedded-partial-memory-performance";',
  'const classification =\\n    totalScore >= 12 && aboveThreshold && coupledPreserved && grammarPreserved\\n      ? "task-embedded-full-memory-adaptive-advantage"\\n      : "task-embedded-partial-memory-performance";'
);
fs.writeFileSync(path, code);
