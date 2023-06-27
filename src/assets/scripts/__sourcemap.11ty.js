const babel = require('@babel/core')
const path = require('path')

class ScriptSourceMap {
  constructor() {
    this.inputFiles = {
      index: 'index.js'
    }
  }

  data() {
    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'bundleName',
        size: 1
      },
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js.map`,
    }
  }
  
  compile(bundleName) {
    console.log('[JS] Compiling: ', bundleName)
    const filepath = path.join(__dirname, this.inputFiles[bundleName])
    const transformedCode = babel.transformFileSync(filepath, {})

    return JSON.stringify(transformedCode.map)
  }
  
  render({ bundleName }) {
    return this.compile(bundleName)
  }
}

module.exports = ScriptSourceMap