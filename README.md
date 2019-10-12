### 如何实现多入口打包,生成多个 html 页面

答: 需要在入口定义中定义多个入口, 并添加多个`html-webpack-plugin`

```
//webpack.config.js
entry: {
    index: 'src/index.js',
    mobile: 'src/mobile.js',
},

plugins: [
    new HtmlWebpackPlugin({
        title: 'index',
        template: `src/index.html`,
        filename: `index.html`,
        // chunks不填默认会加载所有的js文件, 这里在index.html 需要加载index.js, 所有同步的第三方模块js
        chunks: ['index', 'vendors', 'default'],
        injext: true,
        hash: true
    }),
    new HtmlWebpackPlugin({
        title: 'mobile',
        template: `src/mobile.html`,
        filename: `mobile.html`,
        chunks: ['mobile', 'vendors', 'default'],
        injext: true,
        hash: true
    })
]
```

### 如何使用 splitChunks 做 code spliting

答: splitChunks 是 webpack4 新增的属性, 用于代码分割, 默认配置如下:

```
optimization: {
    splitChunks: {
        chunks: 'async', // 只有异步的模块才进行代码分割
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
                test: /[\\/]node_modules[\\/]/,
                priority: -10 // 优先级又高, 优先匹配度越高
            },
            default: {
                name: 'default',
                chunks: 'initial',
                minChunks: 2,   // 重复引入超过两次
                priority: -20,
                reuseExistingChunk: true // 如果一个模块已经被打包过了, 就不会再打包了
            }
        }
    }
}
```

注意: splitChunks 会先检查 chunk 是否符合 cacheGroups 以上的属性, 在决定是否把这个包放入缓存组之中, 待所有的包都执行完毕, 就会把缓存组里面的 chunk 输出成文件, 而我的配置稍有不同;

```
optimization: {
    splitChunks: {
        chunks: 'all',  // 异步同步chunk都需要做代码分割
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
                // 直接通过name命名打包的文件叫vendors.js, 这样html-webpack-plugin的chunks属性才可别
                // 到vendors.js, 才可引入到html文件中
                name: 'vendors',
                // 只有同步的chunk才被打包到这个组里, 异步的chunk需要懒加载, 不可以直接通过venders.js引入
                // 到html文件中
                chunks: 'initial',
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                // 默认组
                name: 'default',
                chunks: 'initial',
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
}
```

### `[name] [chunkhash] [id] chunk bundle`是什么

答: `[chunkhash]` 指的是文件内容的 md5 值, `[name]`为`chunk`的名字, `[id]`每个文件特有唯一标识, `chunk`指的是打包后的一个代码块, 多个`chunk`合在一起就是`bundle`,一个`bundle`可以理解为一个大的 js 打包之后生成的文件，而多个`bundle`里可能有公共的部分，或者一个`bundle`里的东西并不需要一次性加载，需要按照路由按需加载，这个时候就需要按需加载，拆分成不同的`chunk`.
