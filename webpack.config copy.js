const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const 

module.exports = {
    entry: {
        entry: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // 处理文件 css 图片等
    module: {
        // style-loader  css中url处理
        // css-loader css中标签处理
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }]
                // include: 
                // exclude:
                // query:
            },
            // url-loader 处理图片路径
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500000
                    }
                }]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin(),
        new HtmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.0.114',
        compress: true,
        port: 8080
    },
}
