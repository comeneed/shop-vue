// 全部重写api接口进行统一的管理

import service from './service';
import mockService from './mockService';
 //引入是虚拟数据mock的api管理



export  function reqCategoryList(){
    return service({
        method:"get",
        url:"/product/getBaseCategoryList",
    })
}


//搜索颜面Search接口

export function reqSearchInfo(params){
    // 因为是搜索页面所以会带有一定的参数
     return service({
        method:'post',
        data:params,
        url:'./list'
     })
}


// 封装模拟轮播图的mock数据
export function reqGetBannerList(){
    return mockService({
        method:"get",
        url:"/banner"
    })
}

export function regGetFloor(){
    return mockService({
        method:"get",   
        url:"/floor"
    })
}

    // 接口地址是/api/item/{skuId}
    export function reqDetail(skuid){
        return service({
            method:"GET",
            url:`/item/${skuid}`,
        })
    }

// 添加到购物车接口
    export function reqShopCar(skuId,skuNum){
        return service({
            method:"post",
            url:`/cart/addToCart/${skuId}/${skuNum}`,
        })
    }

// 购物车数据
    export function reqShopCartList(){
        return service({
            method:"get",
            url:'/cart/cartList'
        })
    }

//删除购物车商品的接口
// /api/cart/deleteCart/{skuId}
    export function detCartList(skuId){
        return service({
            url:`cart/deleteCart/${skuId}`,
            method:'delete'
        })
    }

// 修改商品是否勾选状态
    export function changeList(skuId,isChecked){
        return service({
            url:`cart/checkCart/${skuId}/${isChecked}`,
            method:'GET'
        })
    }

// 登录接口
    export function reqUer(data){
        return service({
            url:'user/passport/login',
            method:'post',
            data
            
        })
    }
    
// 注册接口
    export function reqRestUer(phone, password, code){
        return service({
            url:`/user/passport/register`,
            method:'post',
            data:{
                phone,
                password,
                code
            }
        })
    }

// 获取验证码接口
    export const reqRegisterCode = function(phone) {
        return service.get(`/user/passport/sendCode/${phone}`);
}
    
// 获取用户信息
    export const reqUerInfo = function(){
        return service.get(`/user/passport/auth/getUserInfo`);
    }

// 退出登录
    export const  logout = function(){
        return service.get(`/user/passport/logout`);
    }







