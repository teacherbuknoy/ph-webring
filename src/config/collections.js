module.exports = {
  pages: function (collections) {
    return collections.getFilteredByGlob([
      "src/collections/pages/*.html",
      "src/collections/pages/*.njk",
      "src/collections/pages/*.md",
    ])
  },

  posts: function (collections) {
    return collections.getFilteredByGlob([
      "src/collections/posts/*.html",
      "src/collections/posts/*.njk",
      "src/collections/posts/*.md",
    ])
  }
}