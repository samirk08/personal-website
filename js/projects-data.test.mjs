// Self-test for js/projects-data.js
// Run: `node js/projects-data.test.mjs` from repo root.
// Exits 0 on success, non-zero on first failed invariant.
// 19 invariants total (15 original + 4 added per checker findings: WARNING-1 folded into INV-7;
// WARNING-2 = INV-16/17/18 D-03 verified-numeric claims; WARNING-3 = INV-19 per-name coauthor map).

import { strictEqual, ok, deepStrictEqual } from 'node:assert';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { projects } from './projects-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const dataSrc    = readFileSync(join(__dirname, 'projects-data.js'), 'utf8');

const checks = [];
function check(name, fn) { checks.push({ name, fn }); }

// INV-1
check('INV-1 projects.length === 9', () => {
  strictEqual(projects.length, 9, `expected 9 projects, got ${projects.length}`);
});

// INV-2
const expectedSlugs = [
  'nlp-tariff','encoding-attacks-llm','soccer-clustering','market-mood',
  'lobbying-networks','taxicab-numbers','branching-cancer','sepsis-prediction','decimal-expansions'
];
check('INV-2 slugs match D-12 list exactly', () => {
  const actual = projects.map(p => p.slug).sort();
  deepStrictEqual(actual, [...expectedSlugs].sort());
});

// INV-3
check('INV-3 CS section has exactly 4 entries', () => {
  strictEqual(projects.filter(p => p.section === 'cs').length, 4);
});

// INV-4
check('INV-4 Math section has exactly 5 entries', () => {
  strictEqual(projects.filter(p => p.section === 'math').length, 5);
});

// INV-5
check('INV-5 every non-solo project has at least one co-author', () => {
  for (const p of projects) {
    if (p.role !== 'solo') {
      ok(Array.isArray(p.coauthors) && p.coauthors.length >= 1, `${p.slug} (role=${p.role}) has empty coauthors`);
    }
  }
});

// INV-6
check('INV-6 every non-solo project has non-empty myContribution', () => {
  for (const p of projects) {
    if (p.role !== 'solo') {
      ok(typeof p.myContribution === 'string' && p.myContribution.trim().length > 0,
         `${p.slug} has empty myContribution`);
    }
  }
});

// INV-7 (HON-03 — name pinned in test per checker WARNING-1)
check('INV-7 branching-cancer is survey, oneLiner mentions survey, Jonathan Song coauthor', () => {
  const e = projects.find(p => p.slug === 'branching-cancer');
  ok(e, 'branching-cancer entry missing');
  strictEqual(e.type, 'survey');
  ok(/survey/i.test(e.oneLiner), `branching-cancer oneLiner missing word "survey": "${e.oneLiner}"`);
  ok(Array.isArray(e.coauthors) && e.coauthors.includes('Jonathan Song'),
     `branching-cancer coauthors missing "Jonathan Song" (HON-03)`);
});

// INV-8
check('INV-8 sepsis-prediction group of 6, names + LSTM contribution with Shauna Kwag', () => {
  const e = projects.find(p => p.slug === 'sepsis-prediction');
  ok(e, 'sepsis-prediction entry missing');
  strictEqual(e.role, 'group');
  for (const required of ['Lee Chen','Shauna Kwag','Pari Latawa','Phoenix Wu','Richard Zhu']) {
    ok(e.coauthors.includes(required), `sepsis-prediction coauthors missing "${required}"`);
  }
  ok(/LSTM/.test(e.myContribution), `sepsis-prediction myContribution missing "LSTM"`);
  ok(/Shauna Kwag/.test(e.myContribution), `sepsis-prediction myContribution missing "Shauna Kwag"`);
});

// INV-9
check('INV-9 market-mood coauthors include all 3 named teammates', () => {
  const e = projects.find(p => p.slug === 'market-mood');
  ok(e, 'market-mood entry missing');
  for (const required of ['Pyae Sone Nyo Hmine','Cole Ruehle','Sriram Sethuraman']) {
    ok(e.coauthors.includes(required), `market-mood coauthors missing "${required}"`);
  }
});

// INV-10
check('INV-10 source file has no GPA / 4.8 leaks', () => {
  ok(!/4\.8/.test(dataSrc), 'projects-data.js contains forbidden substring "4.8"');
  ok(!/GPA/.test(dataSrc), 'projects-data.js contains forbidden substring "GPA"');
});

// INV-11
check('INV-11 every entry has links.paper === null (D-06 — no PDF hosting)', () => {
  for (const p of projects) {
    strictEqual(p.links.paper, null, `${p.slug} has non-null links.paper`);
  }
});

// INV-12
check('INV-12 nlp-tariff GitHub URL is correct (D-02)', () => {
  const e = projects.find(p => p.slug === 'nlp-tariff');
  strictEqual(e.links.repo, 'https://github.com/samirk08/NLP-Tariff');
});

// INV-13
check('INV-13 market-mood GitHub URL is correct (D-02)', () => {
  const e = projects.find(p => p.slug === 'market-mood');
  strictEqual(e.links.repo, 'https://github.com/samirk08/market-mood');
});

// INV-14
check('INV-14 sepsis-prediction GitHub URL is Deep-Learning-Final (D-02)', () => {
  const e = projects.find(p => p.slug === 'sepsis-prediction');
  strictEqual(e.links.repo, 'https://github.com/samirk08/Deep-Learning-Final');
});

// INV-15
check('INV-15 every entry has detailPage === /projects/<slug>/', () => {
  for (const p of projects) {
    strictEqual(p.detailPage, `/projects/${p.slug}/`);
  }
});

// INV-16 (D-03 — NLP-Tariff retention claim pinned per checker WARNING-2)
check('INV-16 nlp-tariff claims include verified retention claim with .tex source', () => {
  const e = projects.find(p => p.slug === 'nlp-tariff');
  ok(e, 'nlp-tariff entry missing');
  ok(Array.isArray(e.claims) && e.claims.length >= 1, 'nlp-tariff.claims must be non-empty');
  const match = e.claims.find(c => /79\s*%|HS-6/i.test(c.text) && /nlp-tariff.*\.tex/.test(c.source));
  ok(match, 'nlp-tariff.claims missing entry with text /79\\s*%|HS-6/i AND source /nlp-tariff.*\\.tex/');
});

// INV-17 (D-03 — sepsis utility scores pinned per checker WARNING-2)
check('INV-17 sepsis-prediction claims include Transformer 0.578 / LSTM 0.261 / Autoencoder 0.04 with .tex source', () => {
  const e = projects.find(p => p.slug === 'sepsis-prediction');
  ok(e, 'sepsis-prediction entry missing');
  ok(Array.isArray(e.claims) && e.claims.length >= 3, `sepsis-prediction.claims must have length >= 3, got ${e.claims?.length ?? 0}`);
  const transformerHit  = e.claims.find(c => /Transformer.*0\.578|0\.578.*Transformer/i.test(c.text));
  const lstmHit         = e.claims.find(c => /LSTM.*0\.261|0\.261.*LSTM/i.test(c.text));
  const autoencoderHit  = e.claims.find(c => /Autoencoder.*0\.04|0\.04.*Autoencoder/i.test(c.text));
  ok(transformerHit,   'sepsis-prediction.claims missing Transformer 0.578 entry');
  ok(lstmHit,          'sepsis-prediction.claims missing LSTM 0.261 entry');
  ok(autoencoderHit,   'sepsis-prediction.claims missing Autoencoder 0.04 entry');
  for (const c of e.claims) {
    ok(/sepsis-prediction.*\.tex/.test(c.source), `sepsis-prediction claim source must match /sepsis-prediction.*\\.tex/, got "${c.source}"`);
  }
});

// INV-18 (D-03 — encoding-attacks ASR claim pinned per checker WARNING-2)
check('INV-18 encoding-attacks-llm claims include ASR finding with .tex source', () => {
  const e = projects.find(p => p.slug === 'encoding-attacks-llm');
  ok(e, 'encoding-attacks-llm entry missing');
  ok(Array.isArray(e.claims) && e.claims.length >= 1, 'encoding-attacks-llm.claims must be non-empty');
  const match = e.claims.find(c => /ASR|attack success/i.test(c.text) && /encoding-attacks-llm.*\.tex/.test(c.source));
  ok(match, 'encoding-attacks-llm.claims missing entry with text /ASR|attack success/i AND source /encoding-attacks-llm.*\\.tex/');
});

// INV-19 (HON-01 — per-name coauthor map enforced per checker WARNING-3)
check('INV-19 expected coauthor names appear in every co-authored entry', () => {
  const expectedCoauthors = {
    'encoding-attacks-llm': ['Aryan Jain', 'Arko Ghosh'],
    'lobbying-networks':   ['Bryce Roberts'],
    'taxicab-numbers':     ['Jovani Pitterson', 'Skyler Pulling'],
    'branching-cancer':    ['Jonathan Song'],
    'sepsis-prediction':   ['Lee Chen', 'Shauna Kwag', 'Pari Latawa', 'Phoenix Wu', 'Richard Zhu'],
    'market-mood':         ['Pyae Sone Nyo Hmine', 'Cole Ruehle', 'Sriram Sethuraman'],
  };
  const missing = {};
  for (const [slug, names] of Object.entries(expectedCoauthors)) {
    const e = projects.find(p => p.slug === slug);
    ok(e, `${slug} entry missing`);
    const absent = names.filter(n => !e.coauthors.includes(n));
    if (absent.length > 0) missing[slug] = absent;
  }
  if (Object.keys(missing).length > 0) {
    const lines = Object.entries(missing).map(([s, ns]) => `  ${s}: missing ${ns.join(', ')}`);
    ok(false, `INV-19 coauthor map violations:\n${lines.join('\n')}`);
  }
});

// Run
let failed = 0;
for (const c of checks) {
  try { c.fn(); }
  catch (err) {
    failed++;
    console.error(`FAIL ${c.name}: ${err.message}`);
  }
}
if (failed === 0) {
  console.log(`OK: all ${checks.length} invariants passed`);
  process.exit(0);
} else {
  console.error(`\n${failed}/${checks.length} invariants failed`);
  process.exit(1);
}
