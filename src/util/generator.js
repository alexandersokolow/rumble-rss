const xml = require("xml");

const buildFeed = (posts) => {
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const feedItems = [];
  feedItems.push(
    ...sortedPosts.map(function (post) {
      const feedItem = {
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
        ],
      };
      return feedItem;
    })
  );
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
          ...buildFeed(posts),
        ],
      },
    ],
  };
  const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
  return feed;
};

module.exports = { getRSSFeed };
