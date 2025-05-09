import markdownIt from 'markdown-it'
import fetch from '@11ty/eleventy-fetch'

import deflist from 'markdown-it-deflist'
import abbr from 'markdown-it-abbr'
import footnote from 'markdown-it-footnote'
import attrs from 'markdown-it-attrs'
import sup from 'markdown-it-sup'

const md = markdownIt({ html: true, linkify: true, typographer: true })
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(attrs)
  .use(sup)
  .disable('code')

export default {
  markdown: function (value) {
    let markdown = markdownIt({ html: true })

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