// js/projects-data.js
// Single source of truth for every project's metadata, role, and links.
// Cards on the homepage (Phase 2) and detail-page headers (Phase 3) both read from this array.
// Schema documented in .planning/phases/01-repo-plumbing-authorship-data/01-02-PLAN.md (interfaces section).
//
// PRIVACY OVERRIDE (D-13): third-party collaborator names are NOT included anywhere in this file.
// The repo is public on GitHub; naming collaborators without their explicit consent is avoided here.
// Group / co-authored / hackathon-team designations + optional `groupSize` convey scale honestly
// without identifying individuals. See `.planning/phases/01-repo-plumbing-authorship-data/01-CONTEXT.md`
// D-13 for the full override + rationale.
//
// D-03 verified numerics ("ship the numbers") REQUIRED for nlp-tariff, sepsis-prediction, encoding-attacks-llm.
// Academic-credentials suppression per D-04 — no credential figures appear here.
// PDF hosting suppressed per D-06 — every links.paper is null; HTML renditions land in Phase 3.
//
// `icon` field (added 2026-05-07, quick task projects-experience-polish):
// Inline Lucide SVG body (paths/lines/circles, no <svg> wrapper) per project. Rendered at 32×32
// inside card grid (left of title) and at 56×56 inside detail-page article-header (next to H1).
// Lucide is ISC-licensed; markup is shipped inline so there is no CDN/build dependency.
// All icons use stroke="currentColor" so theme changes flow through without per-icon overrides.
// The wrapper `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
//   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` is added in render-projects.js
// and in the per-detail-page article-header inline SVGs.

export const projects = [
  // CS-1
  {
    slug: 'nlp-tariff',
    section: 'cs',
    title: 'Concordance Mapping of U.S. Tariffs Over 250 Years',
    oneLiner: 'NLP pipeline that maps every U.S. tariff line from 1789 to the modern HS code system using GPT-4 + MPNet, achieving ~79% HS-6 retention.',
    type: 'research',
    course: null,
    affiliation: 'MIT Political Science · SuperUROP',
    role: 'solo',
    groupSize: 1,
    coauthors: [],
    myContribution: null,
    techChips: ['Python', 'GPT-4', 'MPNet', 'Selenium'],
    icon: 'line-chart',
    iconSvg: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    claims: [
      { text: '~79% HS-6 retention across 1989-2022', source: '_src/papers/nlp-tariff/main.tex' }
    ],
    figures: [
      { src: 'assets/img/nlp-tariff/tariff-evolution', alt: 'Evolution of U.S. tariff coding systems', caption: 'Figure 1' }
    ],
    links: { repo: 'https://github.com/samirk08/NLP-Tariff', paper: null, live: null },
    detailPage: '/projects/nlp-tariff/'
  },

  // CS-2
  {
    slug: 'encoding-attacks-llm',
    section: 'cs',
    title: 'Encoding-Based Attacks on Large Language Models',
    oneLiner: 'In-context cipher prompts tested against Claude 3.5 Sonnet on the HarmBench benchmark, measuring ASR shift as quiet-term count varies.',
    type: 'class project',
    course: 'MIT 6.3950',
    affiliation: 'MIT 6.3950 (final project)',
    role: 'co-authored',
    groupSize: 3,
    coauthors: [],
    myContribution: 'Co-authored class project (3-person team). Designed and tested in-context cipher prompts on Claude 3.5 Sonnet using HarmBench — purely prompt-level attacks, no model modification.',
    techChips: ['Python', 'LLM', 'Claude 3.5', 'HarmBench'],
    icon: 'shield-alert',
    iconSvg: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    claims: [
      { text: 'ASR drops from ~80% (5 quiet terms) to 0% (25 quiet terms) on Claude 3.5 Sonnet / HarmBench',
        source: '_src/papers/encoding-attacks-llm/iclr2024_conference.tex' }
    ],
    figures: [
      { src: 'assets/img/encoding-attacks-llm/asr-vs-quietterms', alt: 'Attack success rate vs. number of quiet terms', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/encoding-attacks-llm/'
  },

  // CS-3
  {
    slug: 'soccer-clustering',
    section: 'cs',
    title: 'Clustering Soccer Playing Styles',
    oneLiner: 'PCA + K-means + ANOVA on StatsBomb event data spanning World Cup 2022, Euro 2024, Copa America 2024, and Barcelona 2006-21 to surface play-style clusters.',
    type: 'class project',
    course: 'MIT 6.3732',
    affiliation: 'MIT 6.3732 (project report)',
    role: 'solo',
    groupSize: 1,
    coauthors: [],
    myContribution: null,
    techChips: ['Python', 'scikit-learn', 'PCA', 't-SNE'],
    icon: 'radar',
    iconSvg: '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/>',
    claims: [],
    figures: [
      { src: 'assets/img/soccer-clustering/cluster-projection', alt: 'PCA projection of team play-style clusters', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/soccer-clustering/'
  },

  // CS-4
  {
    slug: 'market-mood',
    section: 'cs',
    title: 'Market Mood — Reddit Sentiment Dashboard',
    oneLiner: 'HackMIT 2024 hackathon project: Reddit-sentiment dashboard for stock tickers built with the OpenAI API, the Reddit API, and a React frontend.',
    type: 'hackathon',
    course: null,
    affiliation: 'HackMIT 2024',
    role: 'hackathon-team',
    groupSize: 4,
    coauthors: [],
    myContribution: 'Hackathon team project (4-person team). Built parts of the Reddit sentiment ingestion + dashboard during HackMIT 2024 (specifics scoped in Phase 3 detail page).',
    techChips: ['Python', 'OpenAI API', 'Reddit API', 'React'],
    icon: 'trending-up',
    iconSvg: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    claims: [],
    figures: [],
    links: { repo: 'https://github.com/samirk08/market-mood', paper: null, live: null },
    detailPage: '/projects/market-mood/'
  },

  // CS-5
  {
    slug: 'transformers-vs-lstms',
    section: 'cs',
    title: 'When Do Transformers Actually Beat LSTMs for Time Series Forecasting?',
    oneLiner: 'Empirical study of LSTM, Transformer, TFT, PatchTST, Crossformer, and Autoformer architectures across electricity, traffic, and flu forecasting horizons.',
    type: 'class project',
    course: 'MIT 6.7960',
    affiliation: 'MIT 6.7960 (Deep Learning)',
    role: 'group',
    groupSize: 3,
    coauthors: [],
    myContribution: 'Group project (3-person team) for MIT 6.7960 Deep Learning, Fall 2025. Co-authored experiments across all three datasets.',
    techChips: ['PyTorch', 'LSTM', 'Transformer', 'Time-Series'],
    icon: 'cpu',
    iconSvg: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    claims: [
      { text: 'Crossformer reduced MSE by ~40% over the vanilla Transformer baseline on the high-dimensional traffic dataset',
        source: '_src/papers/transformers-vs-lstms/index.html' },
      { text: 'Autoformer achieved the best long-horizon performance on the electricity dataset (96-720h)',
        source: '_src/papers/transformers-vs-lstms/index.html' },
      { text: 'Well-tuned LSTMs remain strong baselines; complexity gains from seq2seq+attention or stacked BiLSTM are marginal',
        source: '_src/papers/transformers-vs-lstms/index.html' }
    ],
    figures: [
      { src: 'assets/img/transformers-vs-lstms/lstm_electricity_96h_forecast', alt: 'Vanilla LSTM forecast on electricity at the 96-hour horizon tracking daily seasonality', caption: 'Figure 1' },
      { src: 'assets/img/transformers-vs-lstms/electricity_horizon_comparison', alt: 'Test error across forecast horizons for four LSTM variants on electricity', caption: 'Figure 2' },
      { src: 'assets/img/transformers-vs-lstms/electricity_attention_24h_forecast', alt: 'TFT attention weights for a 24-hour electricity forecast', caption: 'Figure 3' },
      { src: 'assets/img/transformers-vs-lstms/electricity_tft_vs_patchtst_comparison', alt: 'TFT vs PatchTST forecasts on electricity across multiple horizons', caption: 'Figure 4' },
      { src: 'assets/img/transformers-vs-lstms/unified_model_comparison', alt: 'Unified model comparison across electricity, traffic, and flu datasets', caption: 'Figure 5' },
      { src: 'assets/img/transformers-vs-lstms/computational_accuracy_tradeoff', alt: 'Pareto plot of accuracy versus training cost across architectures', caption: 'Figure 6' },
      { src: 'assets/img/transformers-vs-lstms/summary_dashboard', alt: 'Summary dashboard with MAE, RMSE, training time, and parameter counts', caption: 'Figure 7' }
    ],
    links: { repo: 'https://github.com/samirk08/Deep-Learning-Final', paper: null, live: null },
    detailPage: '/projects/transformers-vs-lstms/'
  },

  // M-1
  {
    slug: 'lobbying-networks',
    section: 'math',
    title: 'Targeted Lobbying on Council Networks',
    oneLiner: 'Game-theoretic analysis showing that under linear voting, the optimal lobbying target is the Katz-Bonacich-maximizing node with decay parameter beta-over-c.',
    type: 'class project',
    course: 'MIT 14.18',
    affiliation: 'MIT 14.18',
    role: 'co-authored',
    groupSize: 2,
    coauthors: [],
    myContribution: 'Co-authored class project (2-person team). Applied the existing Katz-Bonacich centrality framework to a council-network voting setting; under linear voting the optimal lobbying target is the Katz-Bonacich-maximizing node with decay beta-over-c.',
    techChips: ['Game Theory', 'Network Centrality', 'Katz-Bonacich'],
    icon: 'network',
    iconSvg: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    claims: [],
    figures: [
      { src: 'assets/img/lobbying-networks/council-graph', alt: 'Council network with lobbying weights', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/lobbying-networks/'
  },

  // M-2
  {
    slug: 'taxicab-numbers',
    section: 'math',
    title: 'Properties of Taxicab Numbers',
    oneLiner: 'Number-theoretic study of taxicab numbers proving a mod-63 sieve result and constructing a parametric family of non-trivial taxicab numbers.',
    type: 'class project',
    course: 'MIT 18.821',
    affiliation: 'MIT 18.821 (paper 2)',
    role: 'co-authored',
    groupSize: 3,
    coauthors: [],
    myContribution: 'Co-authored class project (3-person team). Proved a mod-63 sieve result and identified a parametric family of non-trivial taxicab numbers.',
    techChips: ['Number Theory', 'Modular Arithmetic', 'Diophantine'],
    icon: 'box',
    iconSvg: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    claims: [],
    figures: [
      { src: 'assets/img/taxicab-numbers/mod63-sieve', alt: 'Mod-63 residue sieve excluded classes', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/taxicab-numbers/'
  },

  // M-3
  {
    slug: 'branching-cancer',
    section: 'math',
    title: 'Branching Process Models for Cancer (Survey)',
    oneLiner: 'Co-authored survey of branching-process models applied to cancer growth: Cheek-Antal, McDonald-Kimmel, and Durrett.',
    type: 'survey',
    course: 'MIT 18.619',
    affiliation: 'MIT 18.619',
    role: 'co-authored',
    groupSize: 2,
    coauthors: [],
    myContribution: 'Co-authored survey paper (2-person team) summarizing Cheek-Antal, McDonald-Kimmel, and Durrett branching-process models applied to cancer evolution. No original mathematical contribution — this is explicitly a survey.',
    techChips: ['Branching Processes', 'Probability', 'Mathematical Biology'],
    icon: 'git-branch',
    iconSvg: '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    claims: [],
    figures: [
      { src: 'assets/img/branching-cancer/sfs-heavy-tail', alt: 'Site-frequency-spectrum heavy-tail distribution', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/branching-cancer/'
  },

  // CS-6 (was M-4 — reclassified math → cs 2026-05-08; deep-learning project, not pure math)
  {
    slug: 'sepsis-prediction',
    section: 'cs',
    title: 'Early Sepsis Prediction with Deep Learning',
    oneLiner: 'Group project on the 2019 PhysioNet Challenge comparing Transformer, LSTM, and Autoencoder+kNN approaches for early sepsis prediction.',
    type: 'class project',
    course: 'MIT (AI for Medicine)',
    affiliation: 'MIT (AI for Medicine)',
    role: 'group',
    groupSize: 6,
    coauthors: [],
    myContribution: 'Group project (6-person team). My contribution: built the LSTM model (utility 0.261). The Transformer (utility 0.578) and Autoencoder+kNN (utility 0.04) were built by other team members.',
    techChips: ['PyTorch', 'LSTM', 'Time-Series', 'Healthcare'],
    icon: 'activity',
    iconSvg: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.5.5 0 0 1-.96 0L9.24 2.18a.5.5 0 0 0-.96 0l-2.35 8.36A2 2 0 0 1 4 12H2"/>',
    claims: [
      { text: 'Transformer model achieved utility 0.578 on the sepsis prediction task',
        source: '_src/papers/sepsis-prediction/main.tex' },
      { text: 'LSTM model (my contribution) achieved utility 0.261 on the sepsis prediction task',
        source: '_src/papers/sepsis-prediction/main.tex' },
      { text: 'Autoencoder + kNN baseline achieved utility 0.04 on the sepsis prediction task',
        source: '_src/papers/sepsis-prediction/main.tex' }
    ],
    figures: [
      { src: 'assets/img/sepsis-prediction/utility-comparison', alt: 'Utility scores across Transformer / LSTM / Autoencoder+kNN', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/sepsis-prediction/'
  },

  // M-5
  {
    slug: 'decimal-expansions',
    section: 'math',
    title: 'Decimal Expansions of Rational Numbers',
    oneLiner: 'Number-theoretic study of decimal-expansion period bounds via pigeonhole and Eulers totient function.',
    type: 'class project',
    course: 'MIT 18.821',
    affiliation: 'MIT 18.821 (paper 1)',
    role: 'group',
    groupSize: 3,
    coauthors: [],
    myContribution: 'Group class project (3-person team) for MIT 18.821, focused on closed-form period and pre-period formulas for the decimal expansion of any rational a/b — pigeonhole and totient bounds, then a CRT reduction to prime powers and a valuation-lifting argument that pins down the exact period via a single per-prime exceptional parameter s.',
    techChips: ['Number Theory', 'Modular Arithmetic'],
    icon: 'divide',
    iconSvg: '<circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/>',
    claims: [],
    figures: [
      { src: 'assets/img/decimal-expansions/period-bounds', alt: 'Decimal-expansion period bounds illustration', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/decimal-expansions/'
  }
];
