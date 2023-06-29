const baseUrl = () => process.env.ELEVENTY_ENV === 'production'
  ? 'https://webring.antaresph.dev'
  : 'http://localhost:8888'

module.exports = () =>{
  return { baseUrl: baseUrl() }
}