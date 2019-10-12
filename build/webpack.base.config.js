const resolve = require('path').resolve
const { getEntry } = require('./helpers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isPro = process.env.NODE_ENV === 'production'

module.exports = {
    entry: getEntry(),
    output: {
        publicPath: isPro ? '/mpa/' : '/',
        path: resolve(__dirname, '../dist'),
        filename: isPro ? 'js/[name].[chunkhash].js' : '[name].js'
    },
    resolve: {
        extensions: ['.js', 'jsx'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss|css)$/,
                use: isPro
                    ? [
                          'vue-style-loader',
                          MiniCssExtractPlugin.loader,
                          'css-loader',
                          'postcss-loader',
                          'sass-loader'
                      ]
                    : [
                          'vue-style-loader',
                          'css-loader',
                          'postcss-loader',
                          'sass-loader'
                      ]
            }
        ]
    }
}
