import path from 'path'
import sass from 'sass'
import utils from './lib/build-utils.js'
const __dirname = import.meta.dirname

class Stylesheets {
  constructor() {
    this.inputFiles = utils.getStylesheets(path.resolve(__dirname, '../styles'))
  }

  data() {
    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'cssFile',
        size: 1
      },
      permalink: ({ cssFile }) => `/assets/styles/${cssFile}.css`
    }
  }

  configure() {
    return {
      sourceMap: true,
      style: "compressed",
      alertColor: true,
    }
  }

  compile(filepath, config) {
    return sass.compile(filepath, config)
  }

  render({ cssFile }) {
    console.log("[CSS] Rendering style:", this.inputFiles[cssFile])
    const scss = path.join(__dirname, `/${this.inputFiles[cssFile]}`)
    const css = this.compile(scss, this.configure())
    return `${css.css}\n/*# sourceMappingURL=${cssFile}.min.css.map */`
  }
}

export default Stylesheets