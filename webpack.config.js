const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const website = {
    publicPath: '/'
}

module.exports = {
    entry: {
        entry: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    },
    // 处理文件 css 图片等
    module: {
        // style-loader  css中url处理
        // css-loader css中标签处理
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders:1}},
                        'postcss-loader'
                    ]
                })
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
                        limit:10*1024,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
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
        new ExtractTextPlugin({
            filename: ('css/[name].[contenthash].css'),
            // allChunks: true
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.0.114',
        compress: true,
        port: 8080
    },
}