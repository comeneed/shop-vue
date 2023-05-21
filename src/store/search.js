import  {reqSearchInfo} from '@/api/api'
// 引入接口
export const search ={
    // 开启命名空间模块
    namespace:false, 
    state:{
        searchInfo:{},
    },
    actions:{
        async getSearchInfo(context,params={}){
            // params是接口的参数
            // 异步调用不然可能会出现跨越的问题
            let result = await reqSearchInfo(params);
            if(result.code === 200){ //判断它的接口是不是200
                context.commit('GETSEARCH',result.data)
            }
        }
    },
    mutations:{
        // 发送请求
        GETSEARCH(state,value){
            state.searchInfo = value;
        }
    },

    getters:{
        // 因为如果单纯的使用map来去进行获取数据会很繁琐所以使用这个配置对象
        goodsList(state){
            // 需要等searchInfo的数据拿回来再获取返回值，不然拿到的是空数组
            return state.searchInfo.goodsList || [];
        },
        attrsList(state){
            return state.searchInfo.attrsList || [];
        },
        trademarkList(state){
            return state.searchInfo.trademarkList || [];
        },
        total(state){
            return state.searchInfo.total;
        }

    }
}