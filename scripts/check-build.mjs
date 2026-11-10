import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const buildDir = 'build';
const indexPath = join(buildDir, 'index.html');

if (!existsSync(indexPath)) {
  console.error(`FAIL: ${indexPath} not found. Run npm run build first.`);
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');
const hasCssLink = /\.css["']|stylesheet/.test(html) && html.includes('.css');

function findCss(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findCss(p));
    else if (entry.name.endsWith('.css')) out.push(p);
  }
  return out;
}

const cssFiles = findCss(buildDir);

if (!hasCssLink) {
  console.error('FAIL: build/index.html has no .css link. Check that src/routes/+layout.svelte imports ../app.css.');
  process.exit(1);
}
if (cssFiles.length === 0) {
  console.error('FAIL: no .css file found in build/.');
  process.exit(1);
}

console.log(`OK: build/index.html references CSS; found ${cssFiles.length} css file(s): ${cssFiles.join(', ')}`);
