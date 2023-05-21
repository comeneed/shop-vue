<template>
    <div class="spec-preview">
      <img :src="imgObj.imgUrl" />
      <div class="event" @mousemove="handlerMask"></div>
      <div class="big" ref="big">
        <img :src="imgObj.imgUrl" />
      </div>
      <div class="mask" ref="mask"></div>
    </div>
  </template>
  
  <script>
    export default {
      name: "Zoom",
      props:['skuImageList'],
      // 自己的话：其实就是如果是用数组去进行展示，虽然能展示出来
      // 但是会出现一点小bug，但是如果是通过对象组来进行展示，就不会出现报错
      // 如果是空数组[0]的话是一定会出现undefined
      // 但如果是空对象中的[0]那么就不会出现undefined 相当于走个黑色地带
      computed:{
        imgObj(){
          return this.skuImageList[0] || {}
        }
      },
      methods: {
        handlerMask(e){
        //1.获取这个遮罩层的dom元素
        let mask = this.$refs.mask;
        //2.计算定位的left和top
        let x = e.offsetX - mask.offsetWidth / 2;
        let y = e.offsetY - mask.offsetWidth / 2;
        //3.约束条件防止盒子跑出去
        if (x < 0) x = 0; //防止从左边跑出去
        if (x > mask.offsetWidth) x = mask.offsetWidth; //防止从右边跑出去
        if (y < 0) y = 0; //防止从上边跑出去
        if (y > mask.offsetWidth) y = mask.offsetWidth; //防止从下边跑出去
        //4.修改dom样式
        mask.style.left = x + 'px';
        mask.style.top = y + 'px';
        
        //右边的放大图跟着变化
        let big = this.$refs.big;
        big.style.top = - 2 * y + 'px';
        big.style.left = - 2 * x + 'px';
        }
      },
    }
  </script>
  
  <style lang="less">
    .spec-preview {
      position: relative;
      width: 400px;
      height: 400px;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
      }
      .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
      }
      .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
      }
      .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;
        img {
          width: 200%;
          max-width: 200%;
          height: 200%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .event:hover~.mask,
      .event:hover~.big {
        display: block;
      }
    }
  </style>