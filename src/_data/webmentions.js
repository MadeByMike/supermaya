const axios = require("axios");
const { webMentionsToken, webMentionDomain } = require("./site");

let webmentions = false;
const fetchWebMentions = async () => {
  if (webmentions) return webmentions;
  return await axios
    .get(
      `https://webmention.io/api/mentions.jf2?domain=${webMentionDomain}&token=${webMentionsToken}&per-page=999999999`
    )
    .then(({ data }) => {
      return data.children || [];
    })
    .catch(() => []);
};

const hasCorrectTarget = url => mention => {
  if (!url) return true;
  return mention["wm-target"] === url;
};

const hasCorrectType = types => mention =>
  types.includes(mention["wm-property"]);

const smellsLikeAMention = mention => {
  const { author, published, content } = mention;
  return author.name && published && content;
};

const smellsLikeALike = mention => {
  const { author } = mention;
  return author.name && author.photo && author.url;
};

const sanitize = mention => {
  const { html, text } = mention.content;
  mention.content.value = html ? sanitizeHTML(html) : sanitizeHTML(text);
  return mention;
};

module.exports = {
  async getMentions(url) {
    const webmentions = await fetchWebMentions();
    return webmentions
      .filter(hasCorrectTarget(url))
      .filter(hasCorrectType(["mention-of", "in-reply-to"]))
      .filter(smellsLikeAMention)
      .map(sanitize);
  },
  async getLikes(url) {
    const webmentions = await fetchWebMentions();
    return webmentions
      .filter(hasCorrectTarget(url))
      .filter(hasCorrectType(["like-of"]))
      .filter(smellsLikeALike)
      .map(sanitize);
  }
};
