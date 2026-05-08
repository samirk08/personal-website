#!/usr/bin/env bash
# scripts/render-og.sh — regenerate every OG image from assets/og/template.svg.
# Output: 15 PNGs in assets/og/<key>.png at 1200×630.
# Re-run any time the template or titles change.
set -euo pipefail
cd "$(dirname "$0")/.."

TEMPLATE="assets/og/template.svg"
OUTDIR="assets/og"
mkdir -p "$OUTDIR"

# key | title — keep these strings ASCII to avoid SVG/sed encoding pain.
# NO third-party names (D-13).
entries=(
  "home|Samir Kadariya — MIT '26"
  "about|About — Samir Kadariya"
  "projects|Projects — Samir Kadariya"
  "experience|Experience — Samir Kadariya"
  "contact|Contact — Samir Kadariya"
  "nlp-tariff|NLP Tariff Concordance — Samir Kadariya"
  "encoding-attacks-llm|Encoding-Based Attacks on LLMs — Samir Kadariya"
  "soccer-clustering|Clustering Soccer Playing Styles — Samir Kadariya"
  "market-mood|Market Mood — HackMIT 2024 — Samir Kadariya"
  "transformers-vs-lstms|Transformers vs LSTMs — Samir Kadariya"
  "lobbying-networks|Targeted Lobbying on Council Networks — Samir Kadariya"
  "taxicab-numbers|Properties of Taxicab Numbers — Samir Kadariya"
  "branching-cancer|Branching-Process Models for Cancer (Survey) — Samir Kadariya"
  "sepsis-prediction|Early Sepsis Prediction — Samir Kadariya"
  "decimal-expansions|Decimal Expansions of Rationals — Samir Kadariya"
)

for entry in "${entries[@]}"; do
  key="${entry%%|*}"
  title="${entry#*|}"
  # Pipe template through sed to swap placeholder, then through rsvg-convert.
  # Using | as sed delimiter so titles can contain / safely.
  # Em-dash (—) is UTF-8; sed on macOS handles it fine via LC_ALL=en_US.UTF-8.
  LC_ALL=en_US.UTF-8 sed "s|__OG_TITLE__|${title}|" "$TEMPLATE" | \
    rsvg-convert -w 1200 -h 630 -o "$OUTDIR/${key}.png"
  echo "wrote $OUTDIR/${key}.png ($(wc -c < "$OUTDIR/${key}.png" | tr -d ' ') bytes)"
done

echo "✓ 15 OG PNGs rendered"
