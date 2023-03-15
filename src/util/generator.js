const xml = require("xml");

const getFeedItems = (posts) => {
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const feedItems = sortedPosts.map((post) => ({
    item: [
      { title: post.title },
      {
        pubDate: new Date(post.date).toUTCString(),
      },
      {
        guid: [{ _attr: { isPermaLink: true } }, post.link],
      },
      {
        description: {
          _cdata: post.description,
        },
      },
      { "itunes:image": [{ _attr: { href: post.thumbnail } }] },
      { "media:thumbnail": [{ _attr: { url: post.thumbnail } }] },
    ],
  }));
  return feedItems;
};

const getRSSFeed = async (website, posts) => {
  if (!website.language) website.language = "en-US";
  if (!website.description) website.description = "-";
  const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          {
            title: website.title,
          },
          {
            link: website.link,
          },
          { description: website.description },
          { language: "en-US" },
          ...getFeedItems(posts),
        ],
      },
    ],
  };
  return '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
};

module.exports = { getRSSFeed };
