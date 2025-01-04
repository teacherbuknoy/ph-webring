import prettier from 'prettier'
import path from 'path'

export default {
  prettier: (content, outputPath) => {
    const extname = path.extname(outputPath)
    const config = {
      singleAttributePerLine: false,
      printWidth: 100,
      tabWidth: 2,
      bracketSameLine: true,
    }


    switch (extname) {
      case '.html':
      case '.json':
        config.parser = extname.replace(/^./, "")
        return prettier.format(content, config)
      case '.xml':
        config.parser = 'xml'
        config.plugins = ['@prettier/plugin-xml']
        config.xmlWhitespaceSensitivity = 'ignore'
        return prettier.format(content, config)
      default:
        return content
    }
  }
}