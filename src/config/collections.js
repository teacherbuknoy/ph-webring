module.exports = {
  pages: function (collections) {
    return collections.getFilteredByGlob([
      "src/collections/pages/*.html",
      "src/collections/pages/*.njk",
      "src/collections/pages/*.md",
    ])
  },

  themes: function (collections) {
    return collections.getFilteredByGlob([
      "src/collections/themes/*.html",
      "src/collections/themes/*.njk",
      "src/collections/themes/*.md",
    ])
  }
}