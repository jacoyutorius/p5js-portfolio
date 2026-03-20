import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Default templates used when templates/ files are absent
const DEFAULT_SKETCH_JS = `// sketch.js default template
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
`;

const DEFAULT_INDEX_HTML = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Sketch</title>
  <script src="https://cdn.jsdelivr.net/npm/p5@1/lib/p5.min.js"></script>
</head>
<body>
  <script src="./sketch.js"></script>
</body>
</html>
`;

// Parse --name=<value> from argv
function parseName(args) {
  for (const arg of args) {
    const match = arg.match(/^--name=(.+)$/);
    if (match) return match[1];
  }
  return null;
}

function main() {
  const name = parseName(process.argv.slice(2));

  // 1. Validate --name argument
  if (!name) {
    process.stderr.write('Error: --name=<sketch_name> is required\n');
    process.exit(1);
  }

  // 2. Check if sketches/<name>/ already exists
  const sketchDir = join(ROOT, 'sketches', name);
  if (existsSync(sketchDir)) {
    process.stderr.write(`Error: sketches/${name}/ already exists\n`);
    process.exit(1);
  }

  // 3. Read templates or fall back to defaults
  const templateSketchPath = join(ROOT, 'templates', 'sketch.js');
  const templateHtmlPath = join(ROOT, 'templates', 'index.html');

  const sketchContent = existsSync(templateSketchPath)
    ? readFileSync(templateSketchPath, 'utf8')
    : DEFAULT_SKETCH_JS;

  const htmlContent = existsSync(templateHtmlPath)
    ? readFileSync(templateHtmlPath, 'utf8')
    : DEFAULT_INDEX_HTML;

  // 4. Create directory
  mkdirSync(sketchDir, { recursive: true });

  // 5. Write files
  const sketchFilePath = join(sketchDir, 'sketch.js');
  const htmlFilePath = join(sketchDir, 'index.html');

  writeFileSync(sketchFilePath, sketchContent, 'utf8');
  writeFileSync(htmlFilePath, htmlContent, 'utf8');

  // 6. Output generated paths to stdout
  process.stdout.write(`sketches/${name}/sketch.js\n`);
  process.stdout.write(`sketches/${name}/index.html\n`);
}

main();
