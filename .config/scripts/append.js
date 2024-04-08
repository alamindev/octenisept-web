/**
 * require
 */
const path = require('path')
const fs = require('fs-extra')
const glob = require('glob-all')
const config = require('../webspecial.config')
const assetPath = config.path

/**
 * filesystem path
 */
const distFolderPath = path.resolve(__dirname, '../../dist/')
const cssFilePath = path.resolve(distFolderPath, 'main.css')
const jsFilePath = path.resolve(distFolderPath, 'main.js')
let css = fs
    .readFileSync(cssFilePath)
    .toString()

if (process.env.NODE_ENV === 'production') {
  css = css.replaceAll(/(?<=:url\()[.\/]*assets\/img\//gim, assetPath.img)
}
if (process.env.NODE_ENV === 'preview') {
  css = css.replaceAll(/(?<=:url\()[.\/]*assets\/img\//gim, 'img/')
}

const js = fs.readFileSync(jsFilePath).toString()

/**
 * css & js contents
 */
const contentsCss =
  process.env.NODE_ENV === 'preview'
    ? `<style>${css}</style>`
    : `<component is="style">${css}</component>`
const contentsJs =
  process.env.NODE_ENV === 'preview'
    ? `<script>${js}</script>`
    : `<component is="script">${js}</component>`
const contents = contentsCss + contentsJs

/**
 * appending to dist html(s)
 */
glob(distFolderPath + '/*.html', {}, (err, files) => {
  files.forEach((file) => {
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8') + contents)
  })
})

/**
 * delete dist css and js files
 */
fs.unlinkSync(cssFilePath)
fs.unlinkSync(jsFilePath)
