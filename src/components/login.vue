<template>
    <h1>登录页面</h1>
</template>

<script>
    export default {
        name:'loginCom',
        data() {
            return {

            }
        },
        methods:{
            scroll() {
                console.log('滚动了');
            }
        },
        created() {
            // 被创建时的生命周期
            console.log('login-created');
            // 做一些初始化操作，如发送异步请求
        },
        mounted() {
            // 实例已被挂载
            console.log('login-monted');
            // 做一些dom操作和事件的绑定
            window.addEventListener('scroll',this.scroll)
        },
        destroyed() {
            // 被销毁时的生命周期
            console.log('login-destroyed');
            // 1.解绑事件
            // 2.清除定时器
            window.removeEventListener('scroll',this.scroll)
        },
        activated() {
            // 缓存激活触发(出现)
            console.log('login-activated');
            window.addEventListener('scroll',this.scroll)
        },
        deactivated() {
            // 缓存禁用触发 (隐藏)
            console.log('login-deactivated');
            window.removeEventListener('scroll',this.scroll)
        }
    }
</script>

<!--scopen:样式私有化，仅在当前组件生效-->
<style lang="scss" scoped>

</style>