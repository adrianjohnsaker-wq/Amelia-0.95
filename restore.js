const fs = require('fs');
fs.copyFileSync('route_original.ts', 'src/app/api/bridge-terminality/route.ts');
console.log('Restored route.ts!');
