module.exports = {
  showThemeCredit: true,
  name: "Site Name",
  shortDesc: "Lorem ...",
  url: "/",
  authorEmail: "mike@madebymike.com.au",
  authorHandle: "@MikeRiethmuller",
  authorName: "Mike Riethmuller",
  postsPerPage: 5,
  webMentionsToken: process.env.WEBMENTIONS_TOKEN,
  webMentionDomain: "andy-bell.design",
  keystoneAPI: `http://localhost:3000/admin/api`,
  scss: { main: "src/_scss/main.scss" },
  scripts: {
    main: "src/_js/main.js",
    "keystone-comments": "src/_js/keystone-comments.js"
  }
};
