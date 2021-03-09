// 路由文件
import Vue from 'vue';
import vue from 'vue';
import VueRouter from 'vue-router'

// 显示安装在 Vue 身上 vue.use()
Vue.use(VueRouter)

// @ 代表 src 目录
// import homeCom from '@/components/home.vue'
import loginCom from '../components/login.vue'
import carCom from '../components/car.vue'

// 创建路由匹配
let router = new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/home'
        },{
            path: '/home', 
            // 路由懒加载，按需加载
            component: () => import('@/components/home.vue')
        },{ 
            path: '/login', 
            component: loginCom 
        },{
             path: '/car', 
             component: carCom 
        }
    ]
})

export default router;