<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <ul class="nav">
      <li class="item">
        <router-link to="/api/goods">商品</router-link>
      </li>
      <li class="item">
        <router-link to="/api/ratings">评价</router-link>
      </li>
      <li class="item">
        <router-link to="/api/sellers">商家</router-link>
      </li>
    </ul>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from "components/header/Header";
export default {
  name: 'App',
  components: {Header},
  data(){
    return {
      seller:{}
    }
  },
  mounted() {
    (async () =>{
      //axios这里发请求要与mock配置的路径保持一致
      const response = await this.myAxios.get('api/seller');
      const {status,data} = response;
      if (status) this.seller = data
      console.log(this.seller)
    })()
  }
}
</script>

<style scoped lang="stylus" >
  @import "common/stylus/mixin.styl"
  #app
    position: relative;
    width 100%
    height 100%
    .nav
      one-px(rgba(7,17,27,.1))
      display flex
      height 40px
      line-height 40px
      .item
        width 100%
        height 100%
        flex 1
        text-align center
        a
          width 100%
          height 100%
          display block
          font-size 14px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)


</style>
