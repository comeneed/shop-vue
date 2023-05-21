<template>
  <div>
      <Header></Header>
      <router-view></router-view>
      <Footer v-show="['/Home','/Search'].includes($route.path)"></Footer>
      <!-- v-show是指在那个页面上展示或者是在那个页面上不展示 -->
  </div>
</template>

<script>

import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发一个action获取三级列表请求
    // 算一个小优化把 把重复发送ajax请求的行为放到app根组件上 让它只发送一次
    this.$store.dispatch("reqCategoryList");
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
