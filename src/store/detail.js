import {reqDetail} from '@/api/api';
import {reqShopCar} from '@/api/api';
 import {getUUID} from '@/store/getID';


// 购物车数据接口

export const detail = {
    namespaced: false,
    state: {
        detailData: {},
        shopData:{},
        userTempId:getUUID()
        
    },
    actions: {
        // 这个是详情页的
        async getDetailData(context, skuId) {
            let result = await reqDetail(skuId);
            if (result.code === 200) {
                context.commit('GETDETAILDATA', result.data);
            }
        },

        // 这个是加入购物车的
        async getShopcartData({commit},{skuId,skuNum}){
            let result = await reqShopCar(skuId,skuNum);    
            //  因为这一次只是添加，添加之后是不会有数据进行返回的，所以就不需要去进行三连环
            // 使用Promise 是用来判断如果加入购物车失败则返回失败信息
            if(result.code === 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'));
            }
        }
    },
    mutations: {
        GETDETAILDATA(state, value) {
            state.detailData = value;
        },
      
    },
    //简化数据
    getters: {
        categoryView(state) {
            //因为返回的时候可能异步操作还没把数据请求过来，所以要加个或空
            //服务器数据回来后，把state中的原数据替换，getters就能读到值，然后重新响应
            return state.detailData.categoryView || [];
        },
        skuInfo(state) {
            return state.detailData.skuInfo || [];
        },
        spuSaleAttrList(state) {
            return state.detailData.spuSaleAttrList || [];
        }
    }
}
