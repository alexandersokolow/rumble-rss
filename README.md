# RSS-Gen

This little API can be used to generate RSS feeds for Rumble.

## How to use

1. Run it on your server (it is an ExpressJS app, you can find instructions online)
2. Fetch the name of a Rumble channel (i.e. https://rumble.com/c/{channelname} or in some cases https://rumble.com/user/{channelname})
3. Get the RSS feed by calling http://{hostname}/rumble/{channelname}

**Note:** I am already running this myself on rumble-rss.xyz, so you can use that instead of running it on your own server.\
I.e., you can get the feed by calling http://rumble-rss.xyz/{channelname} \
Unfortunately, sometimes it gets rate-blocked by Rumble, if a lot of people are using it, so you might want to set it up yourself anyways.
