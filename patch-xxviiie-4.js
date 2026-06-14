const fs = require('fs');
let content = fs.readFileSync('src/app/api/bridge-terminality/route.ts', 'utf8');

content = content.replace(
  /appendTrace\(\{/g,
  `await appendTraceIfMissing({`
);

fs.writeFileSync('src/app/api/bridge-terminality/route.ts', content);
console.log('Fixed appendTraceIfMissing');
