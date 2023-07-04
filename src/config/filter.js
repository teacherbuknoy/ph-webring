const markdownIt = require('markdown-it')
const fetch = require('@11ty/eleventy-fetch')

const md = markdownIt({ html: true, linkify: true, typographer: true })
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-sup'))
  .disable('code')

module.exports = {
  markdown: function (value) {
    let markdown = require('markdown-it')({ html: true })

    return markdown.render(value)
  },
  icon: function (value) {
    return `<svg class="feather" aria-hidden="true"><use href="/assets/images/feather-sprite.svg#${value}" /></svg>`
  },
  humanReadableDate: function (value) {
    let formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    return formatter.format(value)
  },
  machineReadableDate: function (value) {
    return new Date(value).toISOString()
  },
  markdown: string => md.render(string),
  seo: async url => {
    const endpoint = new URL('https://api.microlink.io/')
    endpoint.searchParams.append('url', url)
    endpoint.searchParams.append('palette', true)
    endpoint.searchParams.append('audio', true)
    endpoint.searchParams.append('video', true)
    endpoint.searchParams.append('iframe', true)

    return await fetch(endpoint.toString(), { duration: '1d', type: 'json' })
  }
}