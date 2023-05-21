import {reqShopCartList} from '@/api/api';
import {detCartList} from '@/api/api';
import {changeList} from '@/api/api';

export const shopcat = {
    namespaced: false,
    state: {
      cartList: [],
    },
    getters: {
      cartList(state) {
        return state.cartList[0] ||  [];
      },
    },
    actions: {
      async getShopCartList({ commit }) {
        let result = await reqShopCartList();
        if(result.code===200){
           commit("GETSHOPCARTLISTS", result.data);
        }
      },

    // 删除单挑数据操作
      async deleteList(context,skuId){
        try{
          let result = await detCartList(skuId);
          console.log("删除成功",result);
        }catch(err){
          console.log("删除失败",err);
        }
      },

    // 删除已勾选数据操作
      async deleteChecked({dispatch,getters}){
          // context 小仓库 commit [提交mutations修改state] getters 修改数据 dispatch[派发action] state[当前仓库数据]
          let promiseArr = [];
          getters.cartList.cartInfoList.forEach(el =>{
            if(el.isChecked == 0) return;
            if(el.isChecked == 1){
              let pormise = dispatch('deleteList',el.skuId);
              promiseArr.push(pormise);
            }
          })
          return Promise.all(promiseArr);
      },

    
    // 修改 商品是否勾选状态
      async getListChecked({commit},{skuId,isChecked}){
          let result = await changeList(skuId,isChecked);
          if(result.code ==200){
            return 'ok'
          }else{
            return Promise.reject(new Error('falie'));
          }
      },

    //点击全选 修改所有物品状态

    async getAllChecked({dispatch,getters},isChecked){
      let promiseArr = [];
      getters.cartList.cartInfoList.forEach(el=>{
        try{
          let pormise = dispatch('getListChecked',{skuId:el.skuId,isChecked:isChecked});
          promiseArr.push(pormise);
        }catch(err){
          console.log("修改失败",err);
        }
      });
      return Promise.all(promiseArr);
    }

      
  
      
    },
    mutations: {
      GETSHOPCARTLISTS(state, value) {
        state.cartList = value;
      },
    },
  };
 
 



