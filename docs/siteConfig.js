/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'React-Resux', // Title for your website.
  tagline: 'Opinionated, Redux abstraction with built-in immutability, async and more. Heavily dva inspired.',
  // For github.io type URLs, you would set the url and baseUrl like:
  url: 'https://kayak.github.io',
  baseUrl: '/react-resux/',

  // Used for publishing and more
  projectName: 'react-resux',
  organizationName: 'kayak',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    {doc: 'api/api-index', label: 'API'},
    {href: "https://github.com/kayak/react-resux", label: "GitHub"},

  ],

  /* path to images for header/footer */
  // headerIcon: 'img/favicon.ico',
  // footerIcon: 'img/favicon.ico',
  // favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#12161f',
    secondaryColor: '#1c222f',
    link: '#1eb6ff',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} KAYAK Germany, GmbH`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: '',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  // ogImage: 'img/undraw_online.svg',
  // twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/kayak/react-resux/',

  customDocsPath: 'docs/docs',
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
};

module.exports = siteConfig;
