const fs = require('fs');
let c = fs.readFileSync('.next/server/app/api/bridge-terminality/route.js', 'utf8');

// There are multiple sourceMappingURLs if multiple modules are baked in.
// Or we can just search for "route.ts" inside the whole file if it's evaluated
let matches = [...c.matchAll(/sourceMappingURL=data:application\/json;charset=utf-8;base64,([^"'\n\r]+)/g)];
if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
        try {
            let smJson = Buffer.from(matches[i][1], 'base64').toString('utf8');
            let sm = JSON.parse(smJson);
            let idx = sm.sources.findIndex(s => s.includes('route.ts'));
            if (idx !== -1) {
                fs.writeFileSync('route_original.ts', sm.sourcesContent[idx]);
                console.log("Success! Extracted from match " + i);
                process.exit(0);
            }
        } catch(e) {}
    }
}
console.log("Could not find source map with route.ts directly. Looking for eval strings with original code...");
