<template lang="">
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 写个过度动画来看起来美观一点 -->
        <transition name="sort">
        <div class="sort" v-show="show">
            <div class="all-sort-list2">
                <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId" @mouseleave="leaveindex" @click="goSearch">
                  <!-- 对于鼠标经过背景颜色进行变化的第二种写法 -->
                    <h3 @mouseenter="comeindex(index)" :class="{cur :currentIndex === index}">
                        <!-- :data-自定义属性名="属性值" -->
                        <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{c1.categoryName}}</a>
                    </h3>

                    <div class="item-list clearfix" v-show="currentIndex === index">
                        <div class="subitem">
                            <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                <dt>
                                    <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                                </dt>
                                <dd>
                                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                        <a :data-catrgoryName="c3.categoryName" :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                                    </em>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </transition>
        </div>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
    </div>
</div>    
</template>
<script>
  import {mapState} from 'vuex';
  import store from '@/store/Vuex';
  import _ from 'lodash'; //这个是引入节流和防抖的插件
  import throttle from 'lodash/throttle';
  // 引入Lodash插件去进行节流和防抖
  // mapState是一个辅助函数
export default {
    name:'TypeNav',
    data() {
      return {
        currentIndex:-1,
        show:true,
      }
    },

      // 其实它一整块的思路就是一个最简单的东西，先是绑定2个鼠标事件
      // 然后在通过因为v-for所带了index参数进行绑定背景颜色变化的关键
      // 到时候忘记理解一下就好了
    methods: {
    leaveShow(){
        if(this.$route.name !=='index')
            this.show = false;
     },
     enterShow(){
        this.show = true;
     },


      leaveindex(){
        this.currentIndex = -1;
      },
      comeindex:throttle(function(index){
        this.currentIndex = index;
      },50),

      goSearch(event){
        // event.target.getAttribute('自定义属性') 
        // 节点有一个属性dataset属性,可以获取到自定义属性与属性值
        let {catrgoryname,category1id,category2id,category3id} = event.target.dataset;
        // catgroyname是代表a标签 如何去区分这个a标签是1级导航还是2级还是3级
        // 跟区分a标签一样,再次去进行自定义属性然后再获取


        if(catrgoryname){  //如果是a标签就跳转并传参
            //先定义一个query参数对象,先把catrgoryname拿过来
            let querydj = {catrgoryName:catrgoryname};
            // 如果收到一级数据的id就给querydj添加属性和值
            if(category1id){
                querydj.category1Id = category1id
            }else if(category2id){
                querydj.category2Id = category2id
            }else{
                querydj.category3Id = category3id
            }


            // 判断如果路由跳转的时候带有params参数就携带传递过去
            if(this.$route.params){
                this.$router.push({
                    name:'sousuo',
                    query:querydj,
                    params:this.$route.params
                });
            }
            // // querydj拿到了类别名和id就可以进行传参
            // this.$router.push({
            //     name:'sousuo',
            //     query:querydj
            // }) 
        }

      }
     },

    //  鼠标经过导航的展示与消失

     mounted() {    
    //当组件挂载完毕 让show属性变成false
        // 但是要注意的是在那些页面上一开始是false 那些页面上一开始是true
        // 如果router不是home那么就去进行show = false
        if(this.$route.path!='/Home'){
            this.show = false
        }  
     },
     computed:{
       ...mapState({categoryList:state=>state.home.categoryList})
     },
  
    }

</script>
<style lang = 'less' scoped>
  .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            /* display: none; */
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                /* display: block; */
                            }
                        }
                    }
                    .cur{
                      background: skyblue;
                    }
                }
            }
            .sort-enter,
            .sort-leave-to {
                height: 0px;
            }

            .sort-enter-to,
            .sort-leave {
                height: 461px;
            }
            .sort-enter-active,
            .sort-leave-active {
                overflow: hidden;
                transition: all .1s linear;
            }

            }
    }
</style>