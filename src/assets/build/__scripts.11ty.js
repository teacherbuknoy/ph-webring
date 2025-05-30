import fs from 'fs'
import path from 'path'
import utils from './lib/build-utils.js'
import webpack from 'webpack'
import mfs from 'memfs'

const isProd = process.env.ELEVENTY_ENV === 'production'
const __dirname = import.meta.dirname

class Script {
  constructor() {
    this.inputFiles = utils.getScripts(path.resolve(__dirname, '../scripts'))
    console.log(this.inputFiles)
  }

  data() {
    const outputPath = path.resolve(__dirname, '../../memory-fs/js/')
    const envPlugin = new webpack.EnvironmentPlugin({
      ELEVENTY_ENV: process.env.ELEVENTY_ENV,
      GENERATED: JSON.stringify(new Date().toISOString())
    })

    const entry = {}
    Object.keys(this.inputFiles)
      .forEach(key => entry[key] = `./src/assets/scripts/${this.inputFiles[key]}`)

    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'bundleName',
        size: 1
      },
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js`,
      webpackConfig: {
        entry,
        mode: isProd ? 'production' : 'development',
        output: { path: outputPath },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }]
        },
        plugins: [envPlugin],
        target: 'web',
        devtool: 'source-map'
      }
    }
  }
  
  compile(bundleName, webpackConfig) {
    console.log('[JS] Compiling: ', bundleName)
    const compiler = webpack(webpackConfig)
    compiler.outputFileSystem = mfs
    compiler.inputFileSystem = fs
    compiler.intermediateFileSystem = mfs

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          const errors = err || (stats.compilation ? stats.compilation.errors : null)
          return reject(errors)
        }

        const outputFile = `${webpackConfig.output.path}/${bundleName}.js`
        const charset = `utf-8`

        mfs.readFile(outputFile, charset, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
    })
  }
  
  async render({ bundleName, webpackConfig }) {
    try {
      const result = await this.compile(bundleName, webpackConfig)
      return result
    } catch (err) {
      console.error(err)
      return "// Bundle has errors"
    }
  }
}

export default Script