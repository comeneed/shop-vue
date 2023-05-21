
import { reqRegisterCode} from '@/api/api';
import {reqRestUer} from '@/api/api';
import {reqUer} from '@/api/api';
import {reqUerInfo,logout} from '@/api/api'


export const user ={
        state:{
            code:"",
            userInfo :[]
        },

        actions:{

            async getRegisterCode({commit}, phone) {
                try{
                    let result = await reqRegisterCode(phone);
                    commit('GETREGISTERCODE', result.data);
                }catch(err) {
                    console.log(err.message);
                }
            },

            async sendRegisterUser(context,{phone, password, code}){
                    console.log(context);
                    try{
                        let result = await reqRestUer(phone, password, code);
                        if(result.code === 200){
                            return "注册成功"
                        }
                    }catch(err){
                        console.log(err);
                    }
            },

            // 登录 同时获取用户token
            async getUser({commit},data){
               let result = await reqUer(data);
                console.log(result);
                if(result.code === 200){
                    localStorage.setItem('token',result.data.token);
                    return '登录成功'
                }else{
                    return Promise.reject(new Error('faile'));
                }
            },

            // 获取用户信息
            async getUserInfo({commit}){
                let result = await reqUerInfo();
                if(result.code === 200){
                    console.log(result);
                    commit("GETUSERINFO",result.data)
                }else{
                    console.log("请求用户信息失败",result.message);
                }
            },

            // 退出登录
            async loginout({commit}){
                let result = await logout();
                if(result.code === 200){
                    commit("CLEAN")
                }
            }
        },

        mutations:{
            GETREGISTERCODE(state,value){
                state.code = value;
            },
            GETUSERINFO(state,value){
                state.userInfo = value
            },
            CLEAN(state){
                state.code = ''
                state.userInfo =''
            }

            
        }

}