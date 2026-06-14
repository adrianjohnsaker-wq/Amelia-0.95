const fs = require('fs');
const path = require('path');

let code = fs.readFileSync('.next/server/app/api/bridge-terminality/route.js', 'utf8');

const match = code.match(/async function POST\(.*?\n\}/s);
if (match) {
    let postCode = match[0];
    
    // convert from JS back to standard TS
    postCode = `export async function POST(req: Request) {\n  try {\n    const body = await req.json();\n    const rawInput = String(body.message ?? body.userInput ?? "");\n    const normalizedCommand = rawInput.normalize("NFKD").replace(/[—–−]/g, "-").replace(/-/g, " ").replace(/\\s+/g, " ").trim().toUpperCase();\n\n    const isPhaseXXVIIIE = normalizedCommand.includes("BRIDGE PHASE XXVIII E");\n    const isXXVIIIEBenchmark = normalizedCommand.includes("ITERATED") && normalizedCommand.includes("HORIZON") && normalizedCommand.includes("SCANNING") && normalizedCommand.includes("BENCHMARK");\n    const isXXVIIIEAudit = isPhaseXXVIIIE && isXXVIIIEBenchmark && normalizedCommand.includes("AUDIT");\n    const isXXVIIIEComparison = isPhaseXXVIIIE && isXXVIIIEBenchmark && normalizedCommand.includes("COMPARISON");\n    const isXXVIIIEPersistenceTest = isPhaseXXVIIIE && isXXVIIIEBenchmark && normalizedCommand.includes("PERSISTENCE TEST");\n    const isXXVIIIERun = isPhaseXXVIIIE && isXXVIIIEBenchmark && normalizedCommand.includes("RUN") && !normalizedCommand.includes("AUDIT") && !normalizedCommand.includes("COMPARISON");\n\n    const upper = rawInput.trim().toUpperCase();\n    let reply: string;\n\n`;

    // extract branches
    const lines = match[0].split('\n');
    let insideIf = false;
    let bodyAcc = [];
    
    // We'll write a better regex parser for the if/else chains
    let logicBodyMatch = match[0].match(/if\s*\(isXXVIIIEAudit\)\s*\{(.+?)\s+return\s+/s);
    if (logicBodyMatch) {
       console.log("Found logic body!");
    } else {
       console.log("no match");
    }
}
