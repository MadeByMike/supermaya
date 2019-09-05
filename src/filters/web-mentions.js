const sanitizeHTML = require("sanitize-html");

const webmentionsFilter = function(webmentions, url) {
  const allowedTypes = ["mention-of", "in-reply-to"];

  const hasRequiredFields = entry => {
    const { author, published, content } = entry;
    return author.name && published && content;
  };

  const sanitize = entry => {
    const { html, text } = entry.content;
    entry.content.value = html ? sanitizeHTML(html) : sanitizeHTML(text);
    return entry;
  };

  return webmentions
    .filter(entry => entry["wm-target"] === url)
    .filter(entry => allowedTypes.includes(entry["wm-property"]))
    .filter(hasRequiredFields)
    .map(sanitize);
};

module.exports = webmentionsFilter;
