// 用于编写axios 拦截器
import axios from 'axios'
// 首先是对axios进行二次封装
 const service = axios.create({
    // 重写路径
    baseURL:"/mock",
    timeout:3000 // 相应时间
 })
//  编写请求拦截器 和响应拦截器
 service.interceptors.request.use((config)=>{
    return config
 })
 service.interceptors.response.use(
   (res) =>{
      return res.data;
   },
 ) 
 export default service


