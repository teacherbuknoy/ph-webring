const fs = require('fs')
const path = require('path')

function getAllowedFiles(extension, basepath) {
  const filenames = fs.readdirSync(basepath, { withFileTypes: true })
  const scssFiles = filenames.filter(file => file.isFile()
    && file.name.toLowerCase().endsWith(extension)
    && !file.name.toLowerCase().startsWith('_'))
  
  const fileList = {}

  scssFiles.forEach(file => {
    const key = file.name.split('.')[0]
    fileList[key] = file.name
  })

  return fileList
}

function getScripts(basepath) {
  const finaldir = '../assets/scripts'
  const files = getAllowedFiles('js', basepath)

  Object.keys(files).forEach(key => {
    files[key] = `../scripts/${files[key]}`
  })

  return files
}

function getStylesheets(basepath) {
  const finaldir = '../assets/styles'
  const files = getAllowedFiles('scss', basepath)

  Object.keys(files).forEach(key => {
    files[key] = `../styles/${files[key]}`
  })

  return files
}

module.exports = { getScripts, getStylesheets }