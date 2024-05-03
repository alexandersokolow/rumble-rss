const express = require("express");
const cors = require('cors');

const router = express.Router();
var corsOptions = { origin: "*" };

const { getRSSFeed } = require("./generateFeed");
const { getRumblePosts } = require("./parsePosts");

router.get("/:channel", async (req, res) => {
  try {
    const { channel } = req.params;
    const posts = await getRumblePosts(channel);
    const rss = await getRSSFeed(
      {
        title: channel,
        link: `https://rumble.com/c/${channel}`,
      },
      posts
    );
    res.set('Content-Type', 'application/rss+xml');
    res.send(rss);
  } catch (err) {
    res.status(404).send();
  }
});

const app = express();
app.use(cors(corsOptions));
app.use(router);
app.listen(9000);
