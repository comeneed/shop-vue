import {reqCategoryList,reqGetBannerList,regGetFloor} from '../api/api';
// 引入接口

export const home ={
    namespace:false, //这个是重命名方式
    state:{
        categoryList:[],  //这个是数据的初始值 一开始都为空 后面发送请求之后才有数据
        bannerList:[],//所拿到的数据
        floorList:[]
     },
    actions:{
        // 通过api里面的接口的函数调用，发送请求获取数据
        // async await异步类调用es6里面的,也可以使用then方法来进行
        // 基本就像下面那样写把
        async reqCategoryList({commit}){
            let result = await reqCategoryList();  //调用接口
            if(result.code === 200){
            commit("GETCATEGORYLIST",result.data);  //这个是响应体
            }
        },

        // 获取轮播图数据
        async getBannerList({commit}){
            let banner = await reqGetBannerList();
            if(banner.code === 200){
                commit("GETBANNERLIST",banner.data);
            }
        },

        // 获取floor数据
        async getFloorList({commit}){
            let floor = await regGetFloor();
            if(floor.code === 200){
                commit("GETFLOORLIST",floor.data);
            }
        }
    },
        
      
    mutations:{
        // 这个东西是模块的配置 看官方文档就好了
            GETCATEGORYLIST(state, value) {
                value.shift();
                value.shift();
                state.categoryList = value;
                
            },
            GETBANNERLIST(state,bannerList){
                state.bannerList = bannerList;
            },
            GETFLOORLIST(state,floorList){
                state.floorList = floorList;
            }
            
    },
            
    getters:{}
}