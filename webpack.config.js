const path = require('path')
const glob = require('glob')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCssPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const ProvidePlugin = webpack.ProvidePlugin;
const BannerPlugin = webpack.BannerPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

const env = require('./build/env')
const entry = require('./build/entry')


const website = {
    publicPath: '/'
}

module.exports = {
    devtool: env.isDev() ? '#source-map' : false,
    entry: entry.path,
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
            },
            {
                test: /\.(jsx|js)$/,
                use: [{
                    loader: 'babel-loader',
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/public',
            to: './public'
        }]),
        new CommonsChunkPlugin({
            name: ['jquery', 'vue'],
            filename: 'assets/js/[name].js',
            minChunks: 2
        }),
        new BannerPlugin(`
        hxk
        `),
        new ProvidePlugin({
            $: 'jquery',
            vue: 'vue'
        }),
        new UglifyJsPlugin({sourceMap: env.isDev()}),
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
        }),
        new PurifyCssPlugin({
            paths:glob.sync(path.join(__dirname, 'src/*.html'))
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.0.114',
        compress: true,
        port: 8080
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
}