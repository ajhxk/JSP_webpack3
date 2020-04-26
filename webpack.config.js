const path = require('path')

module.exports = {
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // 处理文件 css 图片等
    module: {},
    plugins: [],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.0.114',
        compress: true,
        port: 8080
    },
}