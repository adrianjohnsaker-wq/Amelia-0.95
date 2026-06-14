const fs = require('fs');
let c = fs.readFileSync('.next/server/app/api/bridge-terminality/route.js', 'utf8');

// Find the last sourceMappingURL
const smMatch = c.match(/sourceMappingURL=data:application\/json;charset=utf-8;base64,([^"'\n\r]+)/);
if (smMatch) {
    let smJson = Buffer.from(smMatch[1], 'base64').toString('utf8');
    let sm = JSON.parse(smJson);
    console.log("Sources:", sm.sources);
    
    // find the one that corresponds to route.ts
    let idx = sm.sources.findIndex(s => s.endsWith('bridge-terminality/route.ts'));
    if (idx !== -1) {
        fs.writeFileSync('route_original.ts', sm.sourcesContent[idx]);
        console.log("Extracted original TypeScript source directly from source map!");
    } else {
        console.log("Could not find route.ts in sourcemap sources. Sources were:\n", sm.sources.join('\n'));
    }
} else {
    console.log("Could not find inline sourcemap!");
}
