// js/projects-data.js
// Single source of truth for every project's metadata, authorship, and links.
// Cards on the homepage (Phase 2) and detail-page headers (Phase 3) both read from this array.
// Schema documented in .planning/phases/01-repo-plumbing-authorship-data/01-02-PLAN.md (interfaces section).
//
// Authorship verified against LaTeX paper cover pages (D-05) and CONTEXT.md decisions D-01..D-12.
// D-03 verified numerics ("ship the numbers") REQUIRED for nlp-tariff, sepsis-prediction, encoding-attacks-llm.
// Academic-credentials suppression per D-04 — no credential figures appear here.
// PDF hosting suppressed per D-06 — every links.paper is null; HTML renditions land in Phase 3.

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
    coauthors: [],
    myContribution: null,
    techChips: ['Python', 'GPT-4', 'MPNet', 'Selenium'],
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
    coauthors: ['Aryan Jain', 'Arko Ghosh'],
    myContribution: 'Designed and tested in-context cipher prompts on Claude 3.5 Sonnet using HarmBench (joint work with Aryan Jain and Arko Ghosh; no model modification — purely prompt-level attacks).',
    techChips: ['Python', 'LLM', 'Claude 3.5', 'HarmBench'],
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
    coauthors: [],
    myContribution: null,
    techChips: ['Python', 'scikit-learn', 'PCA', 't-SNE'],
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
    role: 'co-authored',
    coauthors: ['Pyae Sone Nyo Hmine', 'Cole Ruehle', 'Sriram Sethuraman'],
    myContribution: 'Joint hackathon work; built parts of the Reddit sentiment ingestion + dashboard with the team (specifics scoped in Phase 3 detail page).',
    techChips: ['Python', 'OpenAI API', 'Reddit API', 'React'],
    claims: [],
    figures: [],
    links: { repo: 'https://github.com/samirk08/market-mood', paper: null, live: null },
    detailPage: '/projects/market-mood/'
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
    coauthors: ['Bryce Roberts'],
    myContribution: 'Joint with Bryce Roberts. Applied the existing Katz-Bonacich centrality framework to a council-network voting setting; under linear voting the optimal lobbying target is the Katz-Bonacich-maximizing node with decay beta-over-c.',
    techChips: ['Game Theory', 'Network Centrality', 'Katz-Bonacich'],
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
    coauthors: ['Jovani Pitterson', 'Skyler Pulling'],
    myContribution: 'Joint with Jovani Pitterson and Skyler Pulling. Proved a mod-63 sieve result and identified a parametric family of non-trivial taxicab numbers.',
    techChips: ['Number Theory', 'Modular Arithmetic', 'Diophantine'],
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
    oneLiner: 'Survey of branching-process models applied to cancer growth: Cheek-Antal, McDonald-Kimmel, and Durrett.',
    type: 'survey',
    course: 'MIT 18.619',
    affiliation: 'MIT 18.619',
    role: 'co-authored',
    coauthors: ['Jonathan Song'],
    myContribution: 'Joint survey with Jonathan Song summarizing Cheek-Antal, McDonald-Kimmel, and Durrett models — no original mathematical contribution; this is explicitly a survey paper.',
    techChips: ['Branching Processes', 'Probability', 'Mathematical Biology'],
    claims: [],
    figures: [
      { src: 'assets/img/branching-cancer/sfs-heavy-tail', alt: 'Site-frequency-spectrum heavy-tail distribution', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/branching-cancer/'
  },

  // M-4
  {
    slug: 'sepsis-prediction',
    section: 'math',
    title: 'Early Sepsis Prediction with Deep Learning',
    oneLiner: '6-author group project on the 2019 PhysioNet Challenge comparing Transformer, LSTM, and Autoencoder+kNN approaches for early sepsis prediction.',
    type: 'class project',
    course: 'MIT (AI for Medicine)',
    affiliation: 'MIT (AI for Medicine)',
    role: 'group',
    coauthors: ['Lee Chen', 'Shauna Kwag', 'Pari Latawa', 'Phoenix Wu', 'Richard Zhu'],
    myContribution: '6-author group project. My contribution: built the LSTM model (utility 0.261) with Shauna Kwag. The Transformer (utility 0.578) and Autoencoder+kNN (utility 0.04) were built by other group members.',
    techChips: ['PyTorch', 'LSTM', 'Time-Series', 'Healthcare'],
    claims: [
      { text: 'Transformer model achieved utility 0.578 on the sepsis prediction task',
        source: '_src/papers/sepsis-prediction/main.tex' },
      { text: 'LSTM model (Samir + Shauna Kwag) achieved utility 0.261 on the sepsis prediction task',
        source: '_src/papers/sepsis-prediction/main.tex' },
      { text: 'Autoencoder + kNN baseline achieved utility 0.04 on the sepsis prediction task',
        source: '_src/papers/sepsis-prediction/main.tex' }
    ],
    figures: [
      { src: 'assets/img/sepsis-prediction/utility-comparison', alt: 'Utility scores across Transformer / LSTM / Autoencoder+kNN', caption: 'Figure 1' }
    ],
    links: { repo: 'https://github.com/samirk08/Deep-Learning-Final', paper: null, live: null },
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
    role: 'solo',
    coauthors: [],
    myContribution: null,
    techChips: ['Number Theory', 'Modular Arithmetic'],
    claims: [],
    figures: [
      { src: 'assets/img/decimal-expansions/period-bounds', alt: 'Decimal-expansion period bounds illustration', caption: 'Figure 1' }
    ],
    links: { repo: null, paper: null, live: null },
    detailPage: '/projects/decimal-expansions/'
  }
];
