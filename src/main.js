// 导入vue框架
import Vue from "vue"

// 导入App组件
import App from '@/App.vue'

// 解决 axios 返回值不能 async await
import 'babel-polyfill'

// 接收 util 工具文件
import util from '@util/tool.js'
console.log(util);

// 导入路由
import router from '@/router/router.js'

new Vue({
    router, //挂载路由,会注射到所有的 Vue组件中
    // render 会把渲染的组件直接覆盖在el元素上
    render: createElement => createElement(App)
}).$mount('#app')