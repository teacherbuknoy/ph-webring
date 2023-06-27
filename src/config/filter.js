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
  }
}