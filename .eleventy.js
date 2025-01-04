import markdown from 'markdown-it'
import mdAnchor from 'markdown-it-anchor'

import deflist from 'markdown-it-deflist'
import abbr from 'markdown-it-abbr'
import footnote from 'markdown-it-footnote'
import attrs from 'markdown-it-attrs'

import config from './src/config/index.js'
const { passthrough, collections, filters, plugins, watchtargets, transforms } = config

export default function (eleventy) {
  Object.keys(passthrough).forEach(key => eleventy.addPassthroughCopy(passthrough[key]()))
  Object.keys(collections).forEach(key => eleventy.addCollection(key, collections[key]))
  Object.keys(filters).forEach(key => eleventy.addFilter(key, filters[key]))
  Object.keys(watchtargets).forEach(key => eleventy.addWatchTarget(watchtargets[key]()))
  Object.keys(transforms).forEach(key => eleventy.addTransform(key, transforms[key]))

  let envIsProduction = process.env.ELEVENTY_ENV === 'production'
  Object.keys(plugins).forEach(key => {
    let { options, isProduction, plugin } = plugins[key]()
    let shouldAddPlugin = false

    if (isProduction) {
      shouldAddPlugin = envIsProduction
    } else {
      shouldAddPlugin = true
    }

    if (shouldAddPlugin) {
      if (options) {
        eleventy.addPlugin(plugin, options)
      } else {
        eleventy.addPlugin(plugin)
      }
    }
  })

  eleventy.addGlobalData('generated', () => new Date().toISOString())
  eleventy.setBrowserSyncConfig({ open: true })

  const mdLib = markdown({ html: true, linkify: true, typographer: true })
  mdLib.use(mdAnchor)
  mdLib.use(deflist)
  mdLib.use(abbr)
  mdLib.use(footnote)
  mdLib.use(attrs)
  mdLib.disable('code')
  eleventy.setLibrary('md', mdLib)
  
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'templates/components',
      layouts: 'templates/layouts',
      data: 'data'
    },
    templateFormats: ['njk', 'md', '11ty.js', 'html']
  }
}