#!/usr/bin/env bash
set -eu

mkdir -p tmp/pdfs output/pdf
rsvg-convert --width 64 --height 64 \
  scripts/assets/whitestone-logo.svg \
  --output tmp/pdfs/whitestone-logo-64.png

pandoc src/index.md \
  --from=markdown+smart \
  --pdf-engine=xelatex \
  --data-dir=scripts/pandoc-data \
  --lua-filter=scripts/accessible-pdf.lua \
  --metadata-file=scripts/pdf-metadata.yaml \
  --include-in-header=scripts/pdf-header.tex \
  --include-before-body=scripts/pdf-first-page.tex \
  --shift-heading-level-by=-1 \
  --toc \
  --toc-depth=3 \
  --output=output/pdf/knowledge-as-infrastructure.pdf
