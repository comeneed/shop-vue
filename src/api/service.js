// 用于编写axios 拦截器
import axios from 'axios';
import store from '@/store/Vuex';
// 首先是对axios进行二次封装
 const service = axios.create({
    // 重写路径
    baseURL:"/api",
    timeout:3000 // 相应时间
 })
//  编写请求拦截器 和响应拦截器
 service.interceptors.request.use((config)=>{
   console.log("请求拦截器成功",config);
   // 后端设定的游客权限
   console.log(store);
      config.headers.token = localStorage.getItem('token');
      // 因为要拿token来去获取页面的数据，所以登录的时候通过set去存储token
      // 然后跟游客一样，在每一次的请求头都能拿到token
      config.headers.userTempId = store.state.detail.userTempId;
    return config
 })
 service.interceptors.response.use(
   (res) =>{
      return res.data;
   },
 ) 
 export default service


