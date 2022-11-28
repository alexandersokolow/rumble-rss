# RSS-Gen

This little API can be used to generate RSS feeds, currently only for Rumble.

## How to use

1. Run it on your server (or as localhost)
2. Fetch the name of a Rumble channel (i.e. https://rumble.com/c/{channelname})
3. Get the RSS feed by calling http://{hostname}/rumble/{channelname}

## How to contribute

Want to generate feeds for something else than Rumble?
Create a pull request with the following:
1. src/posts module that exports a function returning posts. A post has the format of { title: string, link: string, date: string, description: string }. You can look into src/posts/rumble.js for an example.
2. route in src/server.js that calls your module-function to get the posts and then the getRSSFeed function to generate an RSS feed
3. please do not import any unnecessary modules. The ones that are being used in src/posts/rumble.js should be enough to parse any page and generate the posts.

If you have other ideas for improving this API, you can create a PR too. Maybe create a ticket first.
