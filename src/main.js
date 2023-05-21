import Vue from 'vue'
import App from './App.vue'
import router from './Router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/mock/mockSerer';
import 'swiper/css/swiper.css';

// 注册全局组件
import TypeNav from './components/Alluse/TypeNav';
import store from '../src/store/Vuex';
import Pangeter from '@/components/Alluse/Pangeter/Pangeter.vue';

Vue.component(TypeNav.name,TypeNav)
Vue.component(Pangeter.name,Pangeter)



Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this   //配置全局事件总线
  },
  router,
  store 
  // 让所有的组件实例都拥有$store
}).$mount('#app')


