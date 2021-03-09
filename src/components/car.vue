<template>
  <div>
    <h1>购物车页面</h1>
    <button @click="getUserInfo">罗翔老师</button>
    <div v-for="time in data" :key="time.url">
        <img :src="time.img" width="100%" alt="">
    </div>
  </div>
</template>

<script>
// 导入 发请求的axios模块
import { getLunbo } from "@api/article.js";

import {getLuo} from '@api/user.js'

export default {
  name: "carCom",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getLunboData() {
      // 使用 .then 是没问题的
      //    getLunbo().then(res=>{
      //         console.log(res);
      //     })

      // 但是用 async await 就得 另外安装插件(推荐使用 这种方式)
      // npm i babel-polyfill
      let {message} = await getLunbo();
      this.data = message;
    },
    getUserInfo() {
        // 调用接口
        getLuo().then(res=>{
            console.log(res);
        })
    }
  },
  created() {
    // 实例创建完成
    this.getLunboData();
  },
};
</script>

<!--scopen:样式私有化，仅在当前组件生效-->
<style lang="scss" scoped>
</style>