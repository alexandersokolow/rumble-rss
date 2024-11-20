const rp = require("request-promise");
const cheerio = require("cheerio");

const getChannelHtml = async (channelName) => {
  const url = `https://rumble.com/c/${channelName}`;
  const alt_url = `https://rumble.com/user/${channelName}`;
  try {
    return await rp(url);
  } catch {
    return await rp(alt_url);
  }
};

const getRumblePosts = async (channelName) => {
  const html = await getChannelHtml(channelName);
  const $ = cheerio.load(html);
  const items = $(
    ".videostream.thumbnail__grid--item:not(.videostream--featured)",
    html
  ).toArray();
  const posts = items.map((item) => {
    const title = $(".thumbnail__title", item).text().trim();
    const url_rel = $(".videostream__link", item).attr("href");
    const url_abs = `https://rumble.com${url_rel}`;
    const thumbnail = $(".thumbnail__image", item).attr("src");
    const date = $(".videostream__time", item).attr("datetime");
    const views =
      $(".videostream__views", item).attr("data-views") || "unknown";
    const comments =
      $(".videostream__comments", item).attr("title") || "unknown";
    const duration = $(".videostream__status--duration", item).text().trim();
    const description = `Duration: ${duration}<br/>Views: ${views}<br/>Comments: ${comments}`;
    return { title, link: url_abs, thumbnail, date, description, comments };
  });
  return posts;
};

module.exports = { getRumblePosts };
