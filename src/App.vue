<template>
    <div class="app_container">
        <div class="header">头部</div>
        
        <!-- 内容主体
        存放路由匹配的组件 
        keep-alive 组件缓存标签  -->
        
        <keep-alive>
           <router-view></router-view>
        </keep-alive>

        <!-- 底部 -->
        <div class="footer">
            <router-link to="/home" tag="button">首页</router-link>
            <router-link to='/car' tag="button">购物车</router-link>
            <router-link to='/login' tag="button">登录</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:"App",
        data() {
            return {
                message:"App component"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app_container {
        height: 150vh;
    }
</style>