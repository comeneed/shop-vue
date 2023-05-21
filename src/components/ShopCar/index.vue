<template>
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价</div>
          <div class="cart-th4">数量(元)</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
            <li class="cart-list-con1">
              <input type="checkbox" 
                name="chk_list"
                :checked="item.isChecked==1"
                @change="updateChecked(item.skuId,item.isChecked)"
                >
            </li>
            <li class="cart-list-con2">
              <img :src="item.imgUrl"/>
              <div class="item-msg">{{item.skuName}}</div>
            </li>
            <li class="cart-list-con3">
              <div class="item-txt">语音升级款</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{item.skuPrice}}</span>
            </li>
            <li class="cart-list-con5">
              <a href="javascript:void(0)" class="mins" @click="handly('mins',-1,item)">-</a>

              <input autocomplete="off" type="text" 
                minnum="1" class="itxt" :value="item.skuNum" @change="handly('change',$event.target.value*1,item)" >
              <!-- 通过$event.target.value来获取input的值
                    $event是当前事件对象，后面就是指指
              -->

              <a href="javascript:void(0)" class="plus" @click="handly('add',1,item)">+</a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{item.skuPrice * item.skuNum}}</span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet" @click="deleteOneGood(item)">删除</a>
              <br>
              <a>移到收藏</a>
            </li>
          </ul>
          
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" :checked="isAll">
          <span>全选</span>
        </div>
        <div class="option">
          <a  @click="deleteChecked">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">已选择
            <span>0</span>件商品</div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ todoprice}}</i>
          </div>
          <div class="sumbtn">
            <a class="sum-btn" href="###" target="_blank">结算</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
   import { mapState, mapGetters } from "vuex";
   import { throttle } from 'lodash';
    export default {
      name: "shopcat",
      mounted() {
        this.getData();
      },
      methods: {
        getData() {
          this.$store.dispatch("getShopCartList");
        },
        // 修改产品数量  
        // 这一块太顶级，很麻烦命名能够通过watch去监听数据的变化然后去对后端进行修改
        handly:throttle( async function(type,disNum,item){
          // type:区分三个元素 disNum:用来通知后端数据是加还是减 item 前面这2个应用到哪个产品上
          // 实话说:其实可用通过数据的双向绑定来直接队后端数据进行修改
          switch(type){
            // 首先如果是点击+ 那么数值传递给服务器是1 ，那么后端那边接受是1之后就会增加
            // 如果是点击- 那么首先会进行一个判断，想要判断一下 skuNum是不是大于1如果是那就传给服务器-1 那么后端数据就会减少
            // 但是如果skuNum 是小于1的那么就传值0阻止后端数据的变化，同时这也是防止用户的另类操作
            case "add" : 
              disNum = 1;
              break;
            case "mins" :
              if(item.skuNum>1){
                disNum = -1;
              }else{
                disNum = 0;
              }
              break;
              case "change" :
                // 如果用户输出的是非法的字符 和 小于一的数
                if(isNaN(disNum) || disNum<1){
                  disNum = 0;
                }else{
                  // 这里是防止用户写小数点
                  disNum = parseInt(disNum) - item.skuNum;
                }
          }
            // 开始派发请求
            // 派发请求之后刷新一下页面就好拉
            try{
             await this.$store.dispatch('getShopcartData',{skuId:item.skuId, skuNum:disNum});
             this.getData();
            }catch(error){
                console.log("发生了错误");
            }
        },800),

       async deleteOneGood(item){
          try{
           await this.$store.dispatch('deleteList',item.skuId);
            this.getData();
          }catch(err){
            console.log("删除失败",err);
          }
        },

        // 修改商品状态
        async updateChecked(itmeId,itemCheck){
            try{
               let woring = itemCheck == 1?0 :1;
               await this.$store.dispatch('getListChecked',{skuId:itmeId,isChecked:woring});
               this.getData();
            }catch(err){
              alert("修改失败",err);
            }
          },

        async deleteChecked(){
            try{
              await this.$store.dispatch('deleteChecked');
              this.getData();
            }catch(err){
              console.log("删除出现了一点小问题",err);
            }
        },

            
      },  
      computed: {
        ...mapGetters(['cartList']),
          cartInfoList(){
            return this.cartList.cartInfoList
          },
          // 计算打勾商品总价
          todoprice(){
            let price =0;
            this.cartInfoList.forEach(el=>{ 
              if(el.isChecked == 1){
                price += el.skuNum * el.skuPrice;
              }
            });
            return price;
          },
          // 全选和商品的打勾联动
          isAll(){
            return this.cartInfoList.every(le=>le.isChecked === 1);
          }, 
          
      },
    };
  </script>
  
  <style lang="less" scoped>
    .cart {
      width: 1200px;
      margin: 0 auto;
  
      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
      }
  
      .cart-main {
        .cart-th {
          background: #f5f5f5;
          border: 1px solid #ddd;
          padding: 10px;
          overflow: hidden;
  
          &>div {
            float: left;
          }
  
          .cart-th1 {
            width: 25%;
  
            input {
              vertical-align: middle;
            }
  
            span {
              vertical-align: middle;
            }
          }
  
          .cart-th2 {
            width: 25%;
          }
  
          .cart-th3,
          .cart-th4,
          .cart-th5,
          .cart-th6 {
            width: 12.5%;
  
          }
        }
  
        .cart-body {
          margin: 15px 0;
          border: 1px solid #ddd;
  
          .cart-list {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            overflow: hidden;
  
            &>li {
              float: left;
            }
  
            .cart-list-con1 {
              width: 4.1667%;
            }
  
            .cart-list-con2 {
              width: 25%;
  
              img {
                width: 82px;
                height: 82px;
                float: left;
              }
  
              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
              }
            }
  
            .cart-list-con3 {
              width: 20.8333%;
  
              .item-txt {
                text-align: center;
              }
            }
  
            .cart-list-con4 {
              width: 12.5%;
  
            }
  
            .cart-list-con5 {
              width: 12.5%;
  
              .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
  
              input {
                border: 1px solid #ddd;
                width: 40px;
                height: 33px;
                float: left;
                text-align: center;
                font-size: 14px;
              }
  
              .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
            }
  
            .cart-list-con6 {
              width: 12.5%;
  
              .sum {
                font-size: 16px;
              }
            }
  
            .cart-list-con7 {
              width: 12.5%;
  
              a {
                color: #666;
              }
            }
          }
        }
      }
  
      .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;
  
        .select-all {
          padding: 10px;
          overflow: hidden;
          float: left;
  
          span {
            vertical-align: middle;
          }
  
          input {
            vertical-align: middle;
          }
        }
  
        .option {
          padding: 10px;
          overflow: hidden;
          float: left;
  
          a {
            float: left;
            padding: 0 10px;
            color: #666;
          }
        }
  
        .money-box {
          float: right;
  
          .chosed {
            line-height: 26px;
            float: left;
            padding: 0 10px;
          }
  
          .sumprice {
            width: 200px;
            line-height: 22px;
            float: left;
            padding: 0 10px;
  
            .summoney {
              color: #c81623;
              font-size: 16px;
            }
          }
  
          .sumbtn {
            float: right;
  
            a {
              display: block;
              position: relative;
              width: 96px;
              height: 52px;
              line-height: 52px;
              color: #fff;
              text-align: center;
              font-size: 18px;
              font-family: "Microsoft YaHei";
              background: #e1251b;
              overflow: hidden;
            }
          }
        }
      }
    }
  </style>