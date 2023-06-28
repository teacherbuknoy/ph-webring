exports.default = {
  baseUrl: () => process.env.ELEVENTY_ENV === 'production'
    ? 'https://webring.antaresph.dev'
    : 'http://localhost:8080'
}