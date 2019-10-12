const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { generateHtml } = require('./helpers')

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 8080,
        hot: true,
        open: true,
        noInfo: true
        // openPage: 'index'
    },
    devtool: 'source-map', // 开启调试
    plugins: [
        new VueLoaderPlugin(),
        ...generateHtml(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})
