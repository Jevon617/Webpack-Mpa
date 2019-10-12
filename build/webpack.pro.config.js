const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { generateHtml } = require('./helpers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(base, {
    mode: 'production',
    devtool: 'none',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000, // 只有大于30000b的模块才进行代码分割
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3, // 入口文件引入的js文件最多只能是三个, 超过三个就不继续做代码分割
            automaticNameDelimiter: '~', // 连接符号设置
            name: true,
            cacheGroups: {
                // 符合上面规则会进入cacheGroups进行组匹配
                vendors: {
                    name: 'vendors',
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/, // 资源来源于npm, 就会打包到vendors这个组
                    priority: -10 // 优先级又高, 优先匹配度越高
                },
                default: {
                    // 默认组
                    name: 'default',
                    chunks: 'initial',
                    minChunks: 2, // 重复引入超过两次就会打包到default这个group
                    priority: -20,
                    reuseExistingChunk: true // 如果一个模块已经被打包过了, 就不会再打包了
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        ...generateHtml(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: '[id].css'
        })
    ]
})
