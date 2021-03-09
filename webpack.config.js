let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var VueLoaderPlugin = require("vue-loader/lib/plugin.js");

module.exports = {
    // 入口entry 出口output loader mode plugin
    // 入口文件
    entry: "./src/main.js",
    //output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist
    output: {
        path: path.join(__dirname, 'dist'),
        // 打包后的名称
        filename: 'bundle.js'
    },
    module: {
        // rules:定义loader到打包信息
        rules: [
            // test:指定后缀文件
            // use:用哪些loader进行转化，多个从右到左开始转换
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "postcss-loader" //设置浏览器厂商前缀
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }, {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        // 文件大小小于8kb => 打包成base64格式
                        // 否则把图片打包成一个二进制文件
                        limit: 8 * 1024, // 8kb
                        // hash一个唯一的字符串，类似主键
                        name: '[name]_[hash:5].[ext]',
                        // 打包到 images 文件下面
                        outputPath: 'images/'
                    }
                }]
            }, {
                test: /\.(ttf|ttf2|woff|woff2|eot|svg)$/,
                use: [{
                    loader: "url-loader"
                }]
            }, {
                test: /\.js$/,
                // 排除那些目录不需要打包
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        // 插件统一放这里面
        new HtmlWebpackPlugin({
            // 以他为模板
            template: './public/index.html',
            title: 'webpack5-vue2',
            favicon: './public/favicon.ico'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), // 托管的静态资源目录
        compress: true, // gzip压缩
        port: 8000, // 指定端口
        open: true, // 自动打开浏览器
        hot: true, //启用HMR热替换
        proxy: {
            // 解决开发时候跨域问题，通过webpack-dev-serve => proxy解决跨域问题
        // 上线的时候服务器会主动帮助我们解决  1，nginx服务器->代理跨域  2. 设置一个cors
            '/api': {
              target: 'http://localhost:4000/',
              // 把api重写空字符，因为 真正的接口没有api三个字母
              pathRewrite: { '^/api': '' },
            },
            
        },
    },
    devtool: 'source-map', //启用map，便于调试，显示打印或报错是那个文件的
    resolve: {
        alias: {
            // 修正vue导的入路径
            'vue$': "vue/dist/vue.js",
            // @指向src目录
            '@': path.join(__dirname, 'src'),
            //配置api目录
            '@api': path.join(__dirname, 'src/api'),
            //配置util目录
            '@util': path.join(__dirname, 'src/util'),
        }
    }
}