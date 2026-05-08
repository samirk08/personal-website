// Self-test for js/projects-data.js
// Run: `node js/projects-data.test.mjs` from repo root.
// Exits 0 on success, non-zero on first failed invariant.
//
// 19 invariants total. Updated per CONTEXT.md D-13 (third-party-name suppression):
//   - INV-7 / INV-8 / INV-9 / INV-19 no longer assert specific names; they assert role + groupSize +
//     contribution-shape so honesty (group nature, scale, and Samir's specific role) is preserved
//     without naming individuals.
//   - INV-19 is now the no-third-party-names guard: scans dataSrc for any of the 14 known
//     collaborator names and asserts none appear.

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
check('INV-1 projects.length === 10', () => {
  strictEqual(projects.length, 10, `expected 10 projects, got ${projects.length}`);
});

// INV-2 (updated 2026-05-08: added transformers-vs-lstms; sepsis stays but now CS)
const expectedSlugs = [
  'nlp-tariff','encoding-attacks-llm','soccer-clustering','market-mood','transformers-vs-lstms',
  'lobbying-networks','taxicab-numbers','branching-cancer','sepsis-prediction','decimal-expansions'
];
check('INV-2 slugs match D-12 list exactly', () => {
  const actual = projects.map(p => p.slug).sort();
  deepStrictEqual(actual, [...expectedSlugs].sort());
});

// INV-3 (updated 2026-05-08: was 4, now 6 — added transformers-vs-lstms; sepsis reclassified math→cs)
check('INV-3 CS section has exactly 6 entries', () => {
  strictEqual(projects.filter(p => p.section === 'cs').length, 6);
});

// INV-4 (updated 2026-05-08: was 5, now 4 — sepsis moved to CS)
check('INV-4 Math section has exactly 4 entries', () => {
  strictEqual(projects.filter(p => p.section === 'math').length, 4);
});

// INV-5 — every non-solo project declares a non-trivial groupSize and an empty coauthors array (D-13)
check('INV-5 non-solo projects have role !== solo, groupSize >= 2, empty coauthors (D-13)', () => {
  for (const p of projects) {
    if (p.role !== 'solo') {
      ok(typeof p.groupSize === 'number' && p.groupSize >= 2,
         `${p.slug} (role=${p.role}) must have groupSize >= 2, got ${p.groupSize}`);
      ok(Array.isArray(p.coauthors) && p.coauthors.length === 0,
         `${p.slug} (role=${p.role}) must have empty coauthors per D-13, got ${JSON.stringify(p.coauthors)}`);
    } else {
      strictEqual(p.groupSize, 1, `${p.slug} (role=solo) must have groupSize === 1, got ${p.groupSize}`);
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

// INV-7 (HON-03 — branching-cancer is a co-authored survey)
check('INV-7 branching-cancer is a co-authored survey, oneLiner mentions survey', () => {
  const e = projects.find(p => p.slug === 'branching-cancer');
  ok(e, 'branching-cancer entry missing');
  strictEqual(e.type, 'survey');
  strictEqual(e.role, 'co-authored');
  ok(/survey/i.test(e.oneLiner), `branching-cancer oneLiner missing word "survey": "${e.oneLiner}"`);
  strictEqual(e.groupSize, 2);
});

// INV-8 (HON-04 — sepsis-prediction is a 6-person group, Samir built the LSTM)
check('INV-8 sepsis-prediction is a 6-person group; myContribution names the LSTM role', () => {
  const e = projects.find(p => p.slug === 'sepsis-prediction');
  ok(e, 'sepsis-prediction entry missing');
  strictEqual(e.role, 'group');
  strictEqual(e.groupSize, 6);
  ok(/LSTM/.test(e.myContribution), `sepsis-prediction myContribution missing "LSTM"`);
  ok(/group/i.test(e.myContribution), `sepsis-prediction myContribution missing "group" indicator`);
});

// INV-9 (HON-06 — Market Mood is a 4-person hackathon team)
check('INV-9 market-mood is a 4-person hackathon-team project', () => {
  const e = projects.find(p => p.slug === 'market-mood');
  ok(e, 'market-mood entry missing');
  strictEqual(e.role, 'hackathon-team');
  strictEqual(e.groupSize, 4);
});

// INV-10 — academic-credentials suppression (D-04)
check('INV-10 source file has no GPA / 4.8 leaks (D-04)', () => {
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

// INV-14 (updated 2026-05-08: the Deep-Learning-Final repo is actually the
// transformers-vs-lstms project, not the AI-for-Medicine sepsis project. The
// repo URL moved to that entry; sepsis's repo is now null.)
check('INV-14 transformers-vs-lstms GitHub URL is Deep-Learning-Final (D-02)', () => {
  const e = projects.find(p => p.slug === 'transformers-vs-lstms');
  strictEqual(e.links.repo, 'https://github.com/samirk08/Deep-Learning-Final');
});

// INV-15
check('INV-15 every entry has detailPage === /projects/<slug>/', () => {
  for (const p of projects) {
    strictEqual(p.detailPage, `/projects/${p.slug}/`);
  }
});

// INV-16 (D-03 — NLP-Tariff retention claim pinned)
check('INV-16 nlp-tariff claims include verified retention claim with .tex source', () => {
  const e = projects.find(p => p.slug === 'nlp-tariff');
  ok(e, 'nlp-tariff entry missing');
  ok(Array.isArray(e.claims) && e.claims.length >= 1, 'nlp-tariff.claims must be non-empty');
  const match = e.claims.find(c => /79\s*%|HS-6/i.test(c.text) && /nlp-tariff.*\.tex/.test(c.source));
  ok(match, 'nlp-tariff.claims missing entry with text /79\\s*%|HS-6/i AND source /nlp-tariff.*\\.tex/');
});

// INV-17 (D-03 — sepsis utility scores pinned; D-13 strips the partner name from the LSTM claim)
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

// INV-18 (D-03 — encoding-attacks ASR claim pinned)
check('INV-18 encoding-attacks-llm claims include ASR finding with .tex source', () => {
  const e = projects.find(p => p.slug === 'encoding-attacks-llm');
  ok(e, 'encoding-attacks-llm entry missing');
  ok(Array.isArray(e.claims) && e.claims.length >= 1, 'encoding-attacks-llm.claims must be non-empty');
  const match = e.claims.find(c => /ASR|attack success/i.test(c.text) && /encoding-attacks-llm.*\.tex/.test(c.source));
  ok(match, 'encoding-attacks-llm.claims missing entry with text /ASR|attack success/i AND source /encoding-attacks-llm.*\\.tex/');
});

// INV-19 (D-13 — no third-party names anywhere in the data file source)
check('INV-19 no third-party collaborator names appear in dataSrc (D-13)', () => {
  // Exhaustive list of collaborator names previously embedded (now suppressed).
  const forbidden = [
    'Pyae Sone Nyo Hmine','Cole Ruehle','Sriram Sethuraman',
    'Aryan Jain','Arko Ghosh',
    'Bryce Roberts',
    'Jovani Pitterson','Skyler Pulling',
    'Jonathan Song',
    'Lee Chen','Shauna Kwag','Pari Latawa','Phoenix Wu','Richard Zhu',
  ];
  const hits = forbidden.filter(name => dataSrc.includes(name));
  ok(hits.length === 0,
    `D-13 violation — projects-data.js contains forbidden third-party name(s): ${hits.join(', ')}`);
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
