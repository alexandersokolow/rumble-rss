const express = require("express");
const router = express.Router();
const cors = require('cors');

const { getRSSFeed } = require("./util/generator");
const { getRumblePosts } = require("./posts/rumble");

router.get("/rumble/:channel", async (req, res) => {
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
var corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.use(router);
app.listen(9000);
