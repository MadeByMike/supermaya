const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import filters
const dateFilter = require("./src/filters/date-filter.js");
const markdownFilter = require("./src/filters/markdown-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

// Import transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");

// Import data files
const site = require("./src/site/_data/site.json");

module.exports = function(config) {
  // Filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("markdownFilter", markdownFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Transforms
  config.addTransform("htmlmin", htmlMinTransform);
  config.addTransform("parse", parseTransform);

  // Custom collections
  const now = new Date();
  const livePosts = post => post.date <= now && !post.data.draft;
  config.addCollection("posts", collection => {
    return [
      ...collection.getFilteredByGlob("./src/site/posts/*.md").filter(livePosts)
    ].reverse();
  });

  config.addCollection("postFeed", collection => {
    return [
      ...collection.getFilteredByGlob("./src/site/posts/*.md").filter(livePosts)
    ]
      .reverse()
      .slice(0, site.postsPerPage);
  });

  // Passthrough
  config.addPassthroughCopy("src/site/js/");

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "src/site",
      output: "dist"
    },
    passthroughFileCopy: true
  };
};
