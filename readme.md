# Webpack模块化打包工具

## gulp与webpack的区别

- gulp：强调的是前端开发的流程，通过配置一系列的task，定义task处理的事物（例如文件压缩合并、雪碧图、启动server、 等），然后定义执行顺序，来让gulp执行task，从而构建前端项目的流程。
- webpack：是一个前端模块化构建工具，侧重模块，把开发中的所有资源（图片、js文件、css文件、less、scss等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

相同：可以进行文件合并与压缩（js/css）

不同点：虽然都是前端自动化构建工具，但他们定位不一样。

- gulp严格上讲，模块化不是他强调的东西，他旨在规范前端开发流程。
- webpack更是明显强调模块化开发，而那些文件压缩合并、预处理等功能，不过是他附带的功能。

## 安装webpack

> 项目中安装

```
npm init -y
npm install webpack webpack-cli --save-dev
```

## webpack中的几个核心概念

- [entry](https://www.webpackjs.com/concepts/#入口-entry-)： 打包入口文件，分析文件中的模块依赖关系进行打包。
- [output](https://www.webpackjs.com/concepts/output/#用法-usage-): 输出最后的打包资源输到哪个目录
- [Loader](https://www.webpackjs.com/loaders/): webpack只能`.js`和`.json`后缀的文件,遇到其他后缀如：`.scss/.less/.vue、.ttf`等后缀需要借助相应的loader进行转换处理在打包。
- [plugins](https://www.webpackjs.com/concepts/plugins/): 对打包资源进行优化处理,一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
- mode: 指定开发模式对资源进行不同的打包处理和调试。 development（开发），production（生产）

## webpack配置

官网：https://www.webpackjs.com/

或 可参考[一劳永逸」由浅入深配置webpack4](https://juejin.im/post/6859888538004783118)

## 当前环境

webpack基于以下版本，注意版本差异性。

- webpack: "5.24.3",
- webpack-cli: "4.5.0",

## 配置入口和出口

```
// webpack.config.js
let path = require('path')
module.exports = {
    // 入口entry 出口output loader mode plugin
    // mode: "development", // 指定开发模式  development-开发 production-生产
    entry:"./src/main.js",
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    }
}
```

## 打包css

安装`css-loader`打包`.css`后缀文件

```
npm install --save-dev style-loader css-loader
```

配置如下：

```
{
    // test: 指定后缀的文件
    // use: 用哪些loader进行转化。（多个从右到左开始转换）
    test: /\.css$/,
    use:['style-loader','css-loader']
},
```

- [参考css-loader](https://www.webpackjs.com/loaders/css-loader/#安装)

## 打包less文件

安装相应loader：

```
npm install --save-dev less-loader less
```

配置如下：

```
{
    test: /\.less$/,
    use: ['style-loader','css-loader','less-loader']
}
```

- [参考less-loader](https://www.webpackjs.com/loaders/less-loader/#安装)

## 打包scss文件

安装相应loader：

```
npm install sass-loader node-sass  --save-dev
```

配置如下：

```
{
    test: /\.scss$/,
    use: ['style-loader','css-loader','sass-loader']
}
```

- [参考sass-loader](https://www.webpackjs.com/loaders/sass-loader/#安装)

## 打包图片、字体资源

安装url-loader

```
npm install --save-dev url-loader file-loader
```

配置代码：

```
{
    test: /\.(png|jpeg|jpg|gif)$/,
    use: [{
            loader:"url-loader",
            options:{
                // 文件大小小于40kb => 打包成base64格式
                // 否则把图片打包成一个二进制文件
                // hash就是一个唯一的字符串，类似主键
                limit: 8192*5, // 40kb
                name: '[name]_[hash:5].[ext]',
                outputPath: 'images/',
            }
        }]
    },
    {
        test: /\.(ttf|ttf2|woff|woff2|eot|svg)$/,
        use: [{
            loader: "url-loader"
        }]
    },
```

- [url-loader](https://www.webpackjs.com/loaders/url-loader/#安装)

两者区别： url-loader把资源文件转换为URL，file-loader也是一样的功能。 不同之处在于url-loader更加灵活，它可以把小文件转换为base64格式的URL，从而减少网络请求次数。url-loader依赖file-loader。 在大多数情况下是使用url-loader。

## webpack打包高级es6语法

1. 安装loader，与转化语法的预设（preset）（一堆babel插件的集合）

```
npm install -D babel-loader @babel/core @babel/preset-env
```

1. 在webpack.config.js中进行配置，设置module属性，进行匹配文件，加载对应的loader

```
{
    test:/\.js$/,
    // exclude：排除指定目录不需要打包处理
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}
```

## 安装 webpack-dev-server

作用：启动一个开发服务器，便于开发调试和预览。

1. 安装

```
 npm i webpack-dev-server -D
```

1. 修改package-json的script选项；

```
"serve": "npx webpack serve --mode development --open --port 9090 --content-base ./dist",
```

说明：

- --open: 自动打开浏览器
- --port：指定端口号
- --content-base: 托管的资源目录

或者写在webpack.config.js配置中。

```
 devServer:{
    contentBase: path.join(__dirname, "dist"), // 托管的静态资源目录
    compress: true, // gzip压缩
    port: 9000, // 指定端口
    open: true, // 自动打开浏览器
}
```

- [webpack-dev-server](https://www.webpackjs.com/configuration/dev-server/)
- [webpack-dev-server仓库](https://github.com/webpack/webpack-dev-server)

## html-webpack-plugin插件的使用

作用:会在内存中帮助我们生成一个html文件，然后将打包好的js文件自动引入到这个html文件中。

安装依赖：

```
npm install --save-dev html-webpack-plugin
```

- [HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/)

webpack.config.js配置如下：

```
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry:"./src/main.js",
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    plugins: [new HtmlWebpackPlugin({
            template: 'src/index.html'  // 以src/目录下的index.html为模板打包
        }
    )],
};
```

## clean-webpack-plugin插件的使用

作用：清理打包目录dist中的所有文件

安装依赖：

```
npm i clean-webpack-plugin -D
```

配置：

```
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

plugins: [ new CleanWebpackPlugin()]
```

- [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

## 启用HMR-模块热替换

```
 devServer:{
    hot: true,  // 实现热替换,如改变了样式，页面实时更新。而无需重新刷新整个页面
}
```

- hot: 设置为true [启用 HMR](https://www.webpackjs.com/guides/hot-module-replacement/):模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面

## 启用source map调试

webpack.config.js配置如下：

```
devtool: 'source-map',
```

作用:会把打包之后bundle.js文件中的错误映射到源文件中的错误，便于调试bug。

- [启用source map调试](https://www.webpackjs.com/guides/production/#source-map)

## autoprefixer设置浏览器厂商前缀

安装loader和依赖

```
npm i postcss-loader autoprefixer -D
```

webpack中配置：

```
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
},
{
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
},
{
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
}
```

> 设置在sass-loader和less-loader的左边，先编译，在加产商前缀。

项目根目录中新建postcss.config.js配置文件，针对浏览器设置

```
module.exports = {
    "plugins": [
        require('autoprefixer')({
            browsers: [
                "> 1%",
                "last 2 versions",
            ]
        })
    ]
}
```

## MiniCssExtractPlugin插件的使用

作用：提取单独的样式文件到打包目录中

安装

```
npm i mini-css-extract-plugin -D
```

如入口文件中main.js中引入

```
import './style.scss';
```

webpack配置，把style-loader替换掉即可

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
},
```

添加插件

```
plugins:[
        new MiniCssExtractPlugin({
            // 定义打包后的css文件名，默认为main.css
            filename:"css/index.css"
        })
    ]
```

## webpack中使用Vue框架

安装Vue

```
npm i vue
```

入口文件main.js，导入Vue框架：

```
import Vue from "vue";
new Vue({
    // el: "#app",
    data:{ 
        message:"我是root组件"
    }
}).$mount('#app')
```

修改webpack.config.js配置文件，代码如下：

```
resolve:{
        alias:{
            // 修正vue导的入路径
            'vue$':"vue/dist/vue.js",
        }
}
```

## webpack中打包.vue单文件组件

1. 运行`npm i vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖；
2. 在`webpack.config.js`中，添加如下`module`规则：

```
var VueLoaderPlugin = require("vue-loader/lib/plugin.js");
module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' }
    ]
},
 plugins:[
    new VueLoaderPlugin()
]
```

1. 创建`App.vue`组件页面：

```
    <template>
      <!-- 注意：在 .vue 的组件中，template 中必须有且只有唯一的根元素进行包裹，一般都用 div 当作唯一的根元素 -->
      <div>
        <h1>我是APP组件 - {{msg}}</h1>
      </div>
    </template>
    <script>

    // 注意：在 .vue 的组件中，通过 script 标签来定义组件的行为，需要使用 ES6 中提供的 export default 方式，导出一个vue实例对象

    export default {
      data() {
        return {
          msg: 'OK'
        }
      }
    }
    </script>

    <style scoped>
      h1 {
        color: red;
      }
    </style>
```

1. 创建`main.js`入口文件：

```
    // 导入 Vue 组件
    import Vue from 'vue'
    // 导入 App组件
    import App from './App.vue'

    // 创建一个 Vue 实例，使用 render 函数，渲染指定的组件

    var vm = new Vue({
      el: '#app',
      // render渲染函数： 直用app.vue组件覆盖el页面元素
      render: h => h(App)
    });
```

# 配置路径别名@，方便导入

给Src目录配置路径别名@，避免找路径的烦恼。

修改webpack.config.js配置文件，代码如下：

```
resolve:{
    alias:{
        // @指向src目录
        '@': path.join(__dirname,'src'),
        //配置api目录
        '@api': path.join(__dirname,'src/api'),
        //配置util目录
        '@util': path.join(__dirname,'src/util'),
    }
}

// 如：导入login登录组件
import login from '@/components/login.vue';
```

## webpack结合VueRouter

安装路由

```
npm i vue-router 
```

在src/router目录中创建router.js文件，内容如下：

```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter); // 必须安装到Vue框架中

let router = new VueRouter({
    // 定义你的路由匹配
})

// 定义一些导航守卫逻辑在这里

export default router
```

入口main.js导入上面的路由器

```
import router from '@/router/router.js'
new Vue({
    // 注册到Vue实例身上，所有子组件都可通过this.$router和this.$route操作和获取路由信息
  router, 
  render: c => c(App)
}).$mount('#app')
```

## 路由懒加载

以下login组件实现了路由懒加载，

- [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

```
// router.js
// 路由文件
import Vue from 'vue';
import VueRouter  from "vue-router"

//显示安装在Vue身上 vue.use()
Vue.use(VueRouter)
// @ => src
// import loginCom from "@/components/login.vue"
import carCom from "../components/car.vue"
import homeCom from "../components/home.vue"
// 创建路由匹配
let router = new VueRouter({
    routes:[
        {path:"/",redirect:'/home'},
        {path:"/home",component:homeCom},
        {path:"/login",component:()=>import('@/components/login.vue')},
        {path:"/car",component:carCom}
    ]
})

export default router;
```

## keep-alive的使用及生命周期

App.vue组件中缓存：

```
<div class="app_container">
        <!-- 头部 -->
        <div class="header">header</div>

        <!-- 内容主体 -->
        <!-- <div class="main">main</div> -->
        <!-- 存放路由匹配的组件 -->
        <keep-alive>
             <router-view></router-view>
        </keep-alive>
       
        <!-- 底部 -->
        <div class="footer">
            <!-- <button>首页</button> -->
            <!-- <button>购物车</button> -->
            <router-link to="/" tag="button">首页</router-link>
            <router-link to="/car" tag="button">购物车</router-link>
            <router-link to="/login" tag="button">登录</router-link>
        </div>
    </div>
```

如login.vue组件

```
<template>
    <div class="login_container">
        <h2>登录组件</h2>
    </div>
</template>

<script>
    console.log(1111)
    export default {
        name:"login",
        data(){
            return {
                username: "罗志康"
            }
        },
        methods:{
            scroll(){
                console.log('滚动了')
            }
        },
        created(){
            //做一些初始化操作，如发送异步请求
            console.log('login->created')
        },
        mounted(){
           // 做一些dom操作和事件的绑定
            console.log('login->mounted')
           window.addEventListener('scroll',this.scroll)
        },

        destroyed(){
            //1.解绑事件
            //2.清除定时器
            console.log('login->destroyed')
            window.removeEventListener('scroll',this.scroll)
        },
        activated(){
            // 缓存激活触发（出现）
            console.log('login-activated')
            window.addEventListener('scroll',this.scroll)
        },
        deactivated(){
            // 缓存禁用触发（隐藏）
            console.log('login-deactivated')
             window.removeEventListener('scroll',this.scroll)
        }
    }
</script>
<!-- scoped:样式私有化，仅在当前组件生效 -->
<style lang="scss" scoped>
   
  
</style>
```

## axios请求api的封装

- 核心是请求和拦截器的设置
- 每个模块的请求单独定义在一个js模块中，便于维护

## proxy代理请求接口

webpack.config.js配置如下：

- [proxy](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)

```
devServer:{
        contentBase: path.join(__dirname, "dist"), // 托管的静态资源目录
        compress: true, // gzip压缩
        port: 9000, // 指定端口
        open: true, // 自动打开浏览器
        hot: true, // 启用HMR-热模块替换
        // 解决开发时候跨域问题，通过webpack-dev-serve => proxy解决跨域问题
        // 上线的时候服务器会主动帮助我们解决  1，nginx服务器->代理跨域  2. 设置一个cors
        proxy: {
            '/api': {
              target: 'http://localhost:4000/',
              // 把api重写空字符，因为 真正的接口没有api三个字母
              pathRewrite: { '^/api': '' },
            },
            
        },
    },
```

## 使用express托管静态资源dist目录

我们可以配置一个脚本，基于express框架托管静态资源。

安装相关依赖

```
npm i express open
```

> open包可以实现自动打开浏览器

项目根目录中创建build/local.server.js文件,代码如下

```
let express = require('express');
let path = require('path');
const open = require('open');

let app = express();
// console.log(path.join(__dirname, '../dist/'))
let distPath = path.join(__dirname, '../dist/');
app.use(express.static(distPath))
let PORT = 8080;
app.listen(PORT, () => {
    open('http://localhost:' + PORT)
    console.log('请访问' + 'http://localhost:' + PORT)
})
```

package.json中配置快捷指令local

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "webpack serve --mode development",
    "build": "webpack --mode production",
    "local": "npm run build && node ./build/local.server.js"
  },
```

输入 `npm run local`, 启动服务器并自动打开浏览器访问。