<template lang="">
    <div>
        <!-- 导航 -->
        <TypeNav />

        <div class="main">
          <div class="py-container">
            <!--面包屑-->
            <div class="bread">
              <ul class="fl sui-breadcrumb">
                <li>
                  <a href="#">全部结果</a>
                </li>
              </ul>
              <ul class="fl sui-tag">
                <!-- 这个是展示的是导航所到来的参数 -->
                <li class="with-x" v-if="searchParams.catrgoryName">{{searchParams.catrgoryName}}
                  <i @click="deltItem">x</i></li>

                  <!-- 这个是通过搜索也就是keyword关键字所带有的数据 -->
                  <li class="with-x"  v-if="searchParams.keyword">{{searchParams.keyword}}
                    <i @click="deltkeyword">x</i></li>
              </ul>
            </div>
    
            <!--那些平台名称组件-->
            <SearchSelector />
    
            <!--综合销量那些东西+下面展示出来的静态图片-->
            <div class="details clearfix">
              <div class="sui-navbar">
                <div class="navbar-inner filter">
                  <ul class="sui-nav">
                    <li :class="{active: isOne}" @click="changeOrder('1')">
                      <!-- 这个就是用来判断order这个属性值是否为1如果是1就启用类名否则就是没有 -->
                      <a>综合
                        <span v-show="isOne" class="iconfont icon-up"></span>
                      </a>
                    </li>           
                    <li :class="{active: isTwo}" @click="changeOrder('2')">
                      <a>价格
                        <span v-show="isTwo" class="iconfont icon-icon_down"></span>
                      </a>
                    </li> 
                  </ul>
                </div>
              </div>
              <!-- 商品列表 -->
              <div class="goods-list">
                <ul class="yui3-g">
                  <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                    <div class="list-wrap">
                      <div class="p-img">
                        <router-link :to="`/Detail/${good.id}`" >
                          <img :src="good.defaultImg" />
                        </router-link>
                      </div>
                      <div class="price">
                        <strong>
                          <em>¥</em>&nbsp;
                           <i>{{good.price}}</i>
                        </strong>
                      </div>
                      <div class="attr">
                        <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                          {{good.title}}</a>
                      </div>
                      <div class="commit">
                        <i class="command">已有<span>2000</span>人评价</i>
                      </div>
                      <div class="operate">
                        <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                      </div>
                    </div>
                  </li>
                
                </ul>
              </div>
              <div class="fr page">
              <Pangeter 
              :pageNo="searchParams.pageNo" 
              :pageSize="searchParams.pageSize" 
              :total="total" 
              :continues="5"
              v-on:getPageNo="getPageNo"
              /> <!--分页-->
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>



<script>
  import {mapGetters} from 'vuex';
  import store from '@/store/Vuex';
  import SearchSelector from './SearchSelector/SearchSelector'
export default {
    name:'Search',
    components:{
        SearchSelector
    },
    data() {
      return {
        searchParams:{
          category1Id:'',
          category2Id:'',
          category3Id:'',
          catrgoryName:'',
          keyword:'',
          order:'2:desc', //这个就是排序的初始值
          pageNo:1,
          pageSize:10,
          props:[],
          trademark:''
        }
      }
    },
    beforeMount() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
    },
    mounted() {
      this.getData();
     
    },

    methods: {
      getData(){
        this.$store.dispatch('getSearchInfo',this.searchParams);
      },
      deltItem(){
        //  点击这个按钮将数据全部清空然后发送请求，将这些字段带给服务器
        //  如果你把他们的相应字段改成undefined 那么这个undefined的字段就不会带给服务器 而且还省资源
         this.searchParams.catrgoryName=undefined,
         this.searchParams.category1Id=undefined,
         this.searchParams.category2Id=undefined,
         this.searchParams.category3Id=undefined,
         this.getData();
        //  下面这样写是
          /*
            比如说我在导航点击了平板，进入了页面，然后我又在这个基础上搜索了华为导致网址行有2个参数
            而且我点击x删除掉导航的那个参数 然后执行自己跳转自己 ==>就是我只是删除了三级导航的那个参数query但是我没有删除掉keyword关键字的参数
            所以以下判断就是先是判断params(就是keyword的那个参数) 我删除导航参数之后如果keyword有参数那么就保留这个参数去执行自己跳转自己  
          */
         if(this.$route.params){
          this.$router.push({name:"sousuo",params:this.$route.params});
         }

      },
      // 这个是删除关键字搜索栏的
      // 但是这次删除关键字不单单只是删除serach里面所获取到的关键字，还需要删除路由里面的keyword
      // 所以就使用全局事件总线 $bus 
      deltkeyword(){
        this.searchParams.keyword =undefined
        this.getData();
        // 通知兄弟组件Header清除关键字出触发它
        this.$bus.$emit('clear');
      },

      changeOrder(flag){
        let originOrder = this.searchParams.order;
        let orderflag = this.searchParams.order.split(":")[0];
        // split方法将一个字符串分成多个 split[0]相当于就是它的第一位
        let ordersort = this.searchParams.order.split(":")[1];

        let neworder = ''; //创建一个空的容器
        // 然后去进行判断 判断点击按钮所传过来的值是否与设定的值相等如果相等则---
        if(flag==orderflag){
          neworder = `${orderflag}:${ordersort=="desc"?"asc":"desc"}`;
        }else{
          neworder = `${flag}:${'desc'}`;
        }
        this.searchParams.order = neworder;
        this.getData();
      },

      getPageNo(pageNo){
        this.searchParams.pageNo = pageNo;
        this.getData();
      }
    },

    computed:{
      ...mapGetters(['attrsList', 'goodsList', 'trademarkList','total']),
      isOne(){
        return this.searchParams.order.indexOf("1") != -1;
      },
      isTwo(){
        return this.searchParams.order.indexOf("2") != -1;
      }
    },

    watch:{
      $route:{
        immediate:true,
        handler(){
          this.searchParams.category1Id =undefined,
          this.searchParams.category2Id=undefined,
          this.searchParams.category3Id=undefined,
          Object.assign(this.searchParams,this.$route.query,this.$route.params);
          this.getData();
        }
      }
    }
}
</script>




<style lang="less" scoped>
    .main {
      margin: 10px 0;
      .py-container {
        width: 1200px;
        margin: 0 auto;
        .bread {
          margin-bottom: 5px;
          overflow: hidden;
          .sui-breadcrumb {
            padding: 3px 15px;
            margin: 0;
            font-weight: 400;
            border-radius: 3px;
            float: left;
            li {
              display: inline-block;
              line-height: 18px;
              a {
                color: #666;
                text-decoration: none;
                &:hover {
                  color: #4cb9fc;
                }
              }
            }
          }
          .sui-tag {
            margin-top: -5px;
            list-style: none;
            font-size: 0;
            line-height: 0;
            padding: 5px 0 0;
            margin-bottom: 18px;
            float: left;
            .with-x {
              font-size: 12px;
              margin: 0 5px 5px 0;
              display: inline-block;
              overflow: hidden;
              color: #000;
              background: #f7f7f7;
              padding: 0 7px;
              height: 20px;
              line-height: 20px;
              border: 1px solid #dedede;
              white-space: nowrap;
              transition: color 400ms;
              cursor: pointer;
              i {
                margin-left: 10px;
                cursor: pointer;
                font: 400 14px tahoma;
                display: inline-block;
                height: 100%;
                vertical-align: middle;
              }
              &:hover {
                color: #28a3ef;
              }
            }
          }
        }
        .details {
          margin-bottom: 5px;
          .sui-navbar {
            overflow: visible;
            margin-bottom: 0;
            .filter {
              min-height: 40px;
              padding-right: 20px;
              background: #fbfbfb;
              border: 1px solid #e2e2e2;
              padding-left: 0;
              border-radius: 0;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
              .sui-nav {
                position: relative;
                left: 0;
                display: block;
                float: left;
                margin: 0 10px 0 0;
                li {
                  float: left;
                  line-height: 18px;
                  a {
                    display: block;
                    cursor: pointer;
                    padding: 11px 15px;
                    color: #777;
                    text-decoration: none;
                  }
                  &.active {
                    a {
                      background: #e1251b;
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
          .goods-list {
            margin: 20px 0;
            ul {
              display: flex;
              flex-wrap: wrap;
              li {
                height: 100%;
                width: 20%;
                margin-top: 10px;
                line-height: 28px;
                .list-wrap {
                  .p-img {
                    padding-left: 15px;
                    width: 215px;
                    height: 255px;
                    a {
                      color: #666;
                      img {
                        max-width: 100%;
                        height: auto;
                        vertical-align: middle;
                      }
                    }
                  }
                  .price {
                    padding-left: 15px;
                    font-size: 18px;
                    color: #c81623;
                    strong {
                      font-weight: 700;
                      i {
                        margin-left: -5px;
                      }
                    }
                  }
                  .attr {
                    padding-left: 15px;
                    width: 85%;
                    overflow: hidden;
                    margin-bottom: 8px;
                    min-height: 38px;
                    cursor: pointer;
                    line-height: 1.8;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    a {
                      color: #333;
                      text-decoration: none;
                    }
                  }
                  .commit {
                    padding-left: 15px;
                    height: 22px;
                    font-size: 13px;
                    color: #a7a7a7;
                    span {
                      font-weight: 700;
                      color: #646fb0;
                    }
                  }
                  .operate {
                    padding: 12px 15px;
                    .sui-btn {
                      display: inline-block;
                      padding: 2px 14px;
                      box-sizing: border-box;
                      margin-bottom: 0;
                      font-size: 12px;
                      line-height: 18px;
                      text-align: center;
                      vertical-align: middle;
                      cursor: pointer;
                      border-radius: 0;
                      background-color: transparent;
                      margin-right: 15px;
                    }
                    .btn-bordered {
                      min-width: 85px;
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      &:hover {
                        border: 1px solid #666;
                        color: #fff !important;
                        background-color: #666;
                        text-decoration: none;
                      }
                    }
                    .btn-danger {
                      border: 1px solid #e1251b;
                      color: #e1251b;
                      &:hover {
                        border: 1px solid #e1251b;
                        background-color: #e1251b;
                        color: white !important;
                        text-decoration: none;
                      }
                    }
                  }
                }
              }
            }
          }
          .page {
            width: 733px;
            height: 66px;
            overflow: hidden;
            float: right;
            .sui-pagination {
              margin: 18px 0;
              ul {
                margin-left: 0;
                margin-bottom: 0;
                vertical-align: middle;
                width: 490px;
                float: left;
                li {
                  line-height: 18px;
                  display: inline-block;
                  a {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #e0e9ee;
                    margin-left: -1px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                  }
                  &.active {
                    a {
                      background-color: #fff;
                      color: #e1251b;
                      border-color: #fff;
                      cursor: default;
                    }
                  }
                  &.prev {
                    a {
                      background-color: #fafafa;
                    }
                  }
                  &.disabled {
                    a {
                      color: #999;
                      cursor: default;
                    }
                  }
                  &.dotted {
                    span {
                      margin-left: -1px;
                      position: relative;
                      float: left;
                      line-height: 18px;
                      text-decoration: none;
                      background-color: #fff;
                      font-size: 14px;
                      border: 0;
                      padding: 9px 18px;
                      color: #333;
                    }
                  }
                  &.next {
                    a {
                      background-color: #fafafa;
                    }
                  }
                }
              }
              div {
                color: #333;
                font-size: 14px;
                float: right;
                width: 241px;
              }
            }
          }
        }
      }
    }
  </style>
  