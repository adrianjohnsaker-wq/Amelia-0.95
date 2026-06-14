const fs = require('fs');
let code = fs.readFileSync('.next/server/app/api/bridge-terminality/route.js', 'utf8');

// The code is compiled JS. We can extract the POST function logic.
// We'll search for "async function POST" or similar.
const match = code.match(/async function POST\(.*?\n\}/s);
if (match) {
   console.log("FOUND POST in JS:");
   console.log(match[0].substring(0, 500) + '...');
} else {
   console.log("Could not find POST directly. Finding export POST...");
   let postMatch = code.match(/(?:(?:async )?function POST\(.*?\)|POST:\s*\(.*?\)\s*=>).*?catch\s*\([^)]*\)\s*\{[^\}]*\}/s);
   if (postMatch) {
       console.log("FOUND via fallback:");
       console.log(postMatch[0].substring(0, 800));
   } else {
       console.log("still no match");
   }
}
