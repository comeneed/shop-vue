import Vue from 'vue';
import Vuex from 'vuex';
import {home} from './home.js';
import {search} from './search.js';
import {detail} from './detail.js';
import {shopcat} from './shopcat.js';
import {user} from './user.js';


Vue.use(Vuex);



// 对外暴露store类的一个实例
// 给每个模块进行配置 之后再去引入进去大仓库里面就不用一口气写完
 export default new Vuex.Store({
    modules:{
            home,search,detail,shopcat,user
    }
    
});