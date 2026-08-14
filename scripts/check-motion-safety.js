#!/usr/bin/env node
/**
 * check-motion-safety.js
 *
 * CI gate: fails the build if either of these regressions reappears:
 *   1. A CSS rule hides an element by default without being scoped under
 *      a JS-controlled "ready" class (e.g. `html.motion-ready`).
 *   2. A JS file calls gsap.from/gsap.to/gsap.timeline without first
 *      going through MotionInit.run (or an equivalent documented guard).
 *
 * This is a heuristic static check, not a full parser — it is meant to
 * catch the two specific regressions this project has already shipped
 * once, not to be a general-purpose linter.
 */

const fs = require('fs');
const path = require('path');

function getFiles(dir, ext, ignoreNames = []) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreNames.includes(entry.name)) {
        results = results.concat(getFiles(fullPath, ext, ignoreNames));
      }
    } else if (entry.isFile() && fullPath.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

let violations = [];

// --- Check 1: bare .reveal-up-style hidden-by-default rules in CSS ---
const cssFiles = getFiles('.', '.css', ['node_modules', '.git']);
cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match a top-level selector (not prefixed by html.motion-ready or similar)
  // that sets opacity: 0 — a common "hidden until JS rescues it" pattern.
  const bareHiddenPattern = /(?<!\.motion-ready\s)\.\S+\s*{\s*[^}]*opacity:\s*0\s*;/g;
  const matches = content.match(bareHiddenPattern);
  if (matches) {
    matches.forEach(m => {
      // Allow known-safe exceptions (e.g. explicitly gated selectors)
      if (!m.includes('motion-ready')) {
        violations.push({
          file,
          type: 'unscoped-hidden-by-default',
          snippet: m.trim().slice(0, 80),
        });
      }
    });
  }
});

// --- Check 2: GSAP calls not routed through MotionInit.run ---
const jsFiles = getFiles('.', '.js', ['node_modules', '.git']).filter(
  file => !file.endsWith('motion-init.js') && !file.includes('check-motion-safety.js')
);
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const usesGsapDirectly = /gsap\.(from|to|timeline)\(/.test(content);
  const usesMotionInit = /MotionInit\.run\(/.test(content);

  if (usesGsapDirectly && !usesMotionInit) {
    violations.push({
      file,
      type: 'gsap-not-routed-through-motion-init',
      snippet: 'gsap.from/to/timeline called without MotionInit.run wrapper',
    });
  }
});

if (violations.length) {
  console.error(`\n❌ motion-safety check failed: ${violations.length} violation(s)\n`);
  violations.forEach(v => {
    console.error(`  [${v.type}] ${v.file}`);
    console.error(`    ${v.snippet}\n`);
  });
  process.exit(1);
}

console.log('✅ motion-safety check passed.');
