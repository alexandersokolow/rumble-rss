# RSS-Gen

This little API can be used to generate RSS feeds for Rumble.

## How to use

1. Run it on your server (it is an ExpressJS app, you can find instructions online)
2. Fetch the name of a Rumble channel (i.e. https://rumble.com/c/{channelname} or in some cases https://rumble.com/user/{channelname})
3. Get the RSS feed by calling http://{hostname}/rumble/{channelname}
