// Recalcule l'empreinte CSP du script intégré de callback.html (à lancer après chaque modification du script).
import fs from 'node:fs';
import crypto from 'node:crypto';

const file = new URL('../callback.html', import.meta.url);
let html = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const hash = crypto.createHash('sha256').update(script).digest('base64');
html = html.replace(/script-src 'sha256-[^']+'/, `script-src 'sha256-${hash}'`);
fs.writeFileSync(file, html);
console.log(`sha256-${hash}`);
