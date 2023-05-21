import vue from 'vue'
import Router from 'vue-router'
import  routes from './routes'
import store from 'vuex'
vue.use(Router)

let originPush = Router.prototype.push
let originReplace = Router.prototype.Replace

// 重写一下路由的2个方法
Router.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        //call||apply：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数多个参数用逗号隔开，而apply方法执行要传递数组
        //调用originPush，把this指向push的调用者
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
//第一个参数：告诉原来replace方法，往哪里跳转（传递哪种参数）
Router.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}


let router = new Router({
    routes:routes,
    //因为进行路由跳转之后页面不是最顶部所以使用scrollBehavior函数解决问题
    scrollBehavior(to, from, savedPosition){
        return {y :0}
    },
});

    router.beforeEach( async (to, from, next) => {
        // 添加这一个守卫，如果不使用next，就不会允许直接修改网址跳转到其他页面
        let token = localStorage.getItem('token') //先获取一下token的数据先
        if(token){
            //已经登录就无法再进去登录页面
            if(to.path =='/Login'){
                next('/');
            }

            // 有token数据的情况下
            else{
                if(store.user.userInfo.name){
                    next();
                }
            else{
                try {
                    //这个请求在挂载之前，所以刷新也会先请求
                    await store.dispatch('login/getUserInfo');
                    next();
                }catch(err) {
                    console.log('请求用户数据失败！',err);
                    //这里还有一种情况，token过期请求不到
                    //那么就要清空token，重新登录
                    localStorage.removeItem('token');
                    next('/login');
                }
            }
         }
        }
         else {
            //没登录不能去的路由地址
            let pages = ['/Detail/:skuid','/shopsuccess','/shopcar','/Search/:keyword?'];
            if(pages.includes(to.path)) {
                //如果没登陆往这几个页面跳，就回到登录页，并传想去的页面的地址
                //这样能提升用户体验，登录完成后直接跳到刚才的页面
                next(`/login?redirect=${to.path}`);
            }else {
                next();
            }
        }
    })

export default router