# Pinoy Bloggers
A webring of Filipino people with blogs.

Inspired by [Tatiana Mac's tweet](https://twitter.com/TatianaTMac/status/1114388079630929926) and [this post from Max Boeck](https://mxb.dev/blog/webring-kit/)

## Features
- Admins manage the ring on Github
- Members are defined in `src/data/members.json`
- Let people add their site through pull request or submit via email form
- Publish an index of all members' RSS feeds
- Provide an embed code that renders a banner
  - Web component
  - Plain HTML + CSS

### Roadmap
- Publish a code of conduct
- Show an SVG map of the ring and its members
- Extract info out of the member's links via indieweb

The features mentioned here are taken from [Max Boeck's webring template on Github](https://github.com/maxboeck/webring)

## Local Development
To build the site locally, run these commands:

```sh
# clone this repository
git clone https://github.com/teacherbuknoy/ph-webring

# go to the working directory
cd ph-webring

# install dependencies
npm install

# start a local build server
npm start
```