const fs = require('fs');
let code = fs.readFileSync('.next/server/app/api/bridge-terminality/route.js', 'utf8');

const match = code.match(/async function POST\(.*?\n\}/s);
if (match) {
    fs.writeFileSync('post-recovered.js', match[0]);
}
