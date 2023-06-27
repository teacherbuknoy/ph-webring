const passthrough = require('./passthrough')
const collections = require('./collections')
const filters = require('./filter')
const plugins = require('./plugins')
const watchtargets = require('./watchtargets')
const transforms = require('./transforms')

module.exports = {
  passthrough, collections, filters, plugins, watchtargets, transforms
}