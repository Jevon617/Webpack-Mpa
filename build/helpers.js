const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function delCommon(files) {
    let index = files.indexOf('common')
    files.splice(index, 1)
    return files
}

function getEntry() {
    let entry = {}
    let target = path.resolve(__dirname, '../src')
    let files = fs.readdirSync(target)
    files = delCommon(files)
    files.forEach(name => {
        entry[name] = `${target}/${name}/index.js`
    })

    return entry
}

function generateHtml() {
    let target = path.resolve(__dirname, '../src')
    try {
        let files = fs.readdirSync(target)
        files = delCommon(files)
        return files.map(name => {
            return new HtmlWebpackPlugin({
                title: name,
                template: `src/${name}/index.html`,
                filename: `${name}.html`,
                chunks: [name, 'vendors', 'default'],
                injext: true,
                hash: true
            })
        })
    } catch (e) {
        return []
    }
}

module.exports = { getEntry, generateHtml }
