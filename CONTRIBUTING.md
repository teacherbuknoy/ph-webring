# Contribution Guidelines

By participating in this project, you agree to follow the project's [community guidelines](CODE-OF-CONDUCT.md)

## Add your site to the webring
1. Fork the repository.
2. In your fork, edit the file `src/data/members.json`.
3. To add your site, add an object to the JSON array with the following properties:
   - `title` - the title of your website
   - `url` - the URL of your website
   - `feeds` - an array of your RSS feeds. You can leave this out if your website doesn't have one. But if you do, these are what you need for each entry:
      - `name` - the name for this RSS feed
      - `url` - the URL for this RSS feed.
4. Commit and push your changes to your repository.
5. Open a pull request for your changes.
  
This is an example of an entry in `members.json`:

```json
[
…
  {
    "title": "Francis Rubio",
    "url": "https://francisrubio.antaresph.dev/",
    "feeds": [
      { "name": "Everything", "url": "https://francisrubio.antaresph.dev/feed.xml" },
      { "name": "Posts", "url": "https://francisrubio.antaresph.dev/blog.xml" },
      { "name": "Literature", "url": "https://francisrubio.antaresph.dev/literature.xml" },
      { "name": "Videos", "url": "https://francisrubio.antaresph.dev/videos.xml" }
    ]
  }
…
]
```

## Other ways of joining
If you are not a developer or you don't have a Github account, fill out the form in [the project's website](http://localhost:8080/#join-pinoy-bloggers) under the section <cite>If you're not a developer…</cite> to add your site.