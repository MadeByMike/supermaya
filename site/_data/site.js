module.exports = {
  name: "Supermaya",
  shortDesc:
    "An 11ty starter kit designed to help you add rich features to a site without a complicated build process.",
  url: "",
  authorEmail: "mike@madebymike.com.au",
  authorHandle: "@MikeRiethmuller",
  authorName: "Mike",
  postsPerPage: 4,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "white",
      text: "black",
      highlight: "#666",
    },
    secondary: {
      background: "black",
      text: "white",
      highlight: "#666",
    },
  },

  keystone: {
    comments: true,
    bookmarks: true,
    claps: true,
    login: true,
  },
  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: false,
};
