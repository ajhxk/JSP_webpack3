# 让你快速上手一个demo

## 1.配置文件webpack.config.js
## 2.entry选项（入口配置）
## 3.output选项（出口配置）
## 4.多入口、多出口配置

### module 处理文件 css 图片等
style-loader  css中url处理
css-loader css中标签处理
file-loader 处理图片路径不相同问题
url-loader  控制图片等资源小于阀值时 转成base64

### plugins
uglifyjs-webpack-plugin 压缩js代码
html-webpack-plugin 处理html


#### 如何分离css？
extract-text-webpack-plugin

#### 静态资源路径问题
1.url-loader中 options.outputPath 设置处理后的 资源路径

2.output.publicPath 设置 静态资源 路径前缀

3.html中直接用image src引入的图片怎么处理？
html-withimg-loader

4.css前缀
postcss autoprefixer

5.去除无用css 减少冗余