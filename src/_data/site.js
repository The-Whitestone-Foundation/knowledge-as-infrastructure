const isProduction = process.env.ELEVENTY_ENV === "production";
const productionUrl = process.env.SITE_URL || "https://example.com";
const pathPrefix = isProduction ? (process.env.PUBLICATION_PATH || "") : "";

export default {
  // Drives the <h1>, the <title> tag, and the Open Graph title. The paper's page
  // carries no front matter of its own beyond layout and permalink.
  title: "From Knowledge to Context: Building a Google Open Knowledge Format Pipeline That Feeds a Local, Private MCP",
  description: "A technical whitepaper on pairing the Open Knowledge Format (OKF) with the Model Context Protocol (MCP) to build a portable, private knowledge harness for AI agents.",
  language: "en",
  author: "Adam DJ Brett",
  affiliation: "The Whitestone Foundation",
  url: isProduction ? productionUrl : "http://localhost:8080",
  pathPrefix,
  icon: `${pathPrefix}/favicon.ico`,
  cardImage: "/images/whitestone-logo.webp",
  themeSlug: "academic-paper",
  themeName: "Academic Paper",
  themeHomepage: "https://github.com/aterenin/academic-paper",
  themeDemo: "https://aterenin.github.io/academic-paper",
  themeAuthor: "Alexander Terenin",
  themeLicense: "MIT",
  footerText: 'This website is built using <a href="https://www.11ty.dev/">Eleventy</a> and the <a href="http://github.com/aterenin/academic-paper/">Academic Paper</a> theme, which is <a href="https://jeffhuang.com/designed_to_last/">designed to last</a>.',
  serverSideKatex: false,
  largeCard: false,
  favicon: false,
  // Rendered by _includes/layouts/post.njk as the paper header: byline, buttons, venue.
  paperDefaults: {
    authors: [
      { name: "Adam DJ Brett", affiliation: "The Whitestone Foundation" }
    ],
    // TODO: replace the "#" placeholders with real destinations. Buttons render
    // in this order; delete any that don't apply. Icons exist for paper, pdf,
    // code, poster, slides, and video (see _includes/macros/icons.njk).
    buttons: [
      { name: "Paper", url: `${pathPrefix}/` },
      { name: "PDF", url: `${pathPrefix}/knowledge-as-infrastructure.pdf` },
      { name: "Code", url: "https://github.com/The-Whitestone-Foundation/knowledge-as-infrastructure" },
    // { name: "Poster", url: "#" },
      // { name: "Video", url: "#" }
    ],
    venue: {
      name: "Whitestone · Knowledge Futures — A technical whitepaper, Version 3.0",
      date: "2026-07-01"
    },
    katex: false
  },
  navigation: [
    { label: "Mission", url: "/#mission" },
    { label: "Publications", url: "/#publications" },
    { label: "Programs", url: "/#programs" },
    { label: "Team", url: "/#team" },
    { label: "News", url: "/#news" },
    { label: "About", url: "/#about" }
  ]
};
