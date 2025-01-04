import path from 'path'
import sass from 'sass'
import utils from './lib/build-utils.js'

const __dirname = import.meta.dirname

class StylesheetSourcemap {
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
      permalink: ({ cssFile }) => `/assets/styles/${cssFile}.min.css.map`
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
    const scss = path.join(__dirname, `/${this.inputFiles[cssFile]}`)
    const css = this.compile(scss, this.configure())
    return JSON.stringify(css.sourceMap)
  }
}

export default StylesheetSourcemap