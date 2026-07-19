# Knowledge as Infrastructure

An [Eleventy](https://www.11ty.dev/) site for the whitepaper *From Knowledge to Context: Building a Google Open Knowledge Format Pipeline That Feeds a Local, Private MCP*.

Built on the [Academic Paper](https://github.com/aterenin/academic-paper) theme (MIT, Alexander Terenin), ported from `11ty-academic-paper`.

## Commands

```
npm install
npm start      # dev server at http://localhost:8080
npm run build  # eleventy + pagefind into _site/
./scripts/build-pdf.sh  # tagged PDF/UA-2 publication into output/pdf/
```

## Structure

| Path | Purpose |
| --- | --- |
| `site/index.html` | The whitepaper. Front matter carries the title and venue; the body is the paper's content plus the table-of-contents markup and script. |
| `_includes/layouts/` | `base.njk` (head, meta, cards) and `post.njk` (paper header, content, footer). |
| `_data/site.js` | Site title, description, URL, footer text, paper defaults. |
| `static/` | Hand-maintained styles (`main.css`, `print.css`), copied to the site root by Eleventy's passthrough and served as `/main.css` and `/print.css`. They are the source of truth; no CSS build step. |
| `index.html` | The original single-file export this site was built from, kept for reference. It is outside Eleventy's input directory (`site/`) and is not published. |

## Styles

`static/main.css` is a single file, split by banner comments into the sections it
grew from: reset, color, layout, buttons, figures, footnotes, highlight, hljs,
typography, tables, toc. Section order is load-bearing — later rules deliberately
override earlier ones (`.header h1` in typography over the one in layout; the
`.content table` font-size in typography rather than tables) — so do not reorder or
merge them.

The sections carrying this paper's own additions:

- `hljs` — highlight.js token colors, mapped onto the palette the theme already uses in the `highlight` section, so the paper's pre-highlighted code matches the theme.
- `tables` — the base theme ships no table styling; the paper uses tables heavily.
- `toc` — table of contents and the per-heading jump-back arrows, which appear on hover.

`static/print.css` is loaded via `media="print"` and is maintained separately. It
sets a US Letter page box (8.5×11in, 1in top and bottom, 0.5in left and right),
hides the buttons and the table of contents, and centres the site name and page
number in the page margins. Those running headers use CSS Paged Media margin
boxes, which **browsers ignore** — printing from a browser gets the correct page
size but the browser's own header and footer. For the real thing, render through a
paged engine: `npx pagedjs-cli _site/index.html -o whitepaper.pdf` (WeasyPrint and
Prince also work). Print sizes stay in `pt` and `in` on purpose: on paper those
units are physically real, whereas `rem` would resolve against a screen setting.

Not a bug: the layout section's `blockquote` and `pre` rules reference
`--color-secondary`, which nothing defines, so those `color-mix()` borders fall
back to `currentColor`. The upstream Academic Paper theme has the identical gap,
and this site deliberately matches it. Defining the variable would depart from the
demo's appearance.

The table of contents is generated at load time from the `h2` elements that are
direct children of `#content` — top-level sections only, by design; subsections are
excluded to keep the list short. Headings without an `id` get one assigned.

## Deploying

Set `ELEVENTY_ENV=production` and `SITE_URL` so canonical URLs, Open Graph tags, and the sitemap resolve to the real domain:

```
ELEVENTY_ENV=production SITE_URL=https://example.org npm run build
```

For the copy embedded in the Whitestone Foundation site, also set its URL prefix:

```
ELEVENTY_ENV=production \
SITE_URL=https://thewhitestonefoundation.org \
PUBLICATION_PATH=/publications/okf-knowledge-context \
npm run build
```
