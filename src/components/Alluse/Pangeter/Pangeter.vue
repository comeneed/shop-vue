<template lang="">
    <div class="pagination">
        <button  @click="$emit('getPageNo', pageNo-1)">上一页</button>
        <button v-if=" startPanger.start > 1" @click="$emit('getPageNo', 1)">1</button>
        <button v-if=" startPanger.start > 2" disabled>···</button>


        <button v-for="(n,index) in startPanger.end" :key="index" v-if="n>=startPanger.start"
            @click="$emit('getPageNo', n)" :class="{active:pageNo === n}">{{n}}</button>

        <button v-if="startPanger.end < totalPages-1" disabled>···</button>
        <button v-if="startPanger.end < totalPages"
            @click="$emit('getPageNo', totalPages)">{{totalPages}}</button>
        <button :disabled="pageNo === totalPages" @click="$emit('getPageNo', pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>

    </div>

</template>
<script>
export default {
    name:'Pangeter',
    //  [当前页码，每页数据个数，总数据个数，连续页的个数]
    props:['pageNo','pageSize','total','continues'],

    // 然后去计算总页数
    computed:{
        totalPages(){
            //计算总页数 
            return Math.ceil(this.total / this.pageSize);
        },


        // 计算连续的开始和结束
        startPanger(){
            let state = 0, end = 0; // 它们的初始值

            //分页器会遇到的问题 1、连续页是大于总页面的
            if(this.totalPages<this.continues){
                // 那么end 应该是数据总数而不是总页数  start 应该是1
                state = 1;
                end = this.total; 

            }else{
                 // 第二种情况正常情况 总页面>=连续页码
                //  Math.floor(x) 返回小于参数x的最大整数
                 state = this.pageNo - Math.floor(this.continues / 2);
                 end  =  this.pageNo + Math.floor(this.continues / 2);
                 /*
                    这里也就是说如果总页面数是大于连续页码的话
                    因为在上方设定连续页码为5 首页+尾页+连续页 一共是 7
                    所以当前的页码为7(也就是分页器中显示7左边的第二个页码和右边的第二个页码)
                    1 ... 5 6 7 8 9 ... 30
                    start = 7 - 5/2 = 5
                    end = 7 + 5/2 = 9
                    这样就得到了需要在分页器中显示的页码范围 [5, 6, 7, 8, 9]
                 */

                 if(state <1){
                    state = 1 ; //初始肯定是1呀 毕竟是第一页
                    end = this.continues;
                 }
                 if(end > this.totalPages){
                    state = this.totalPages - this.continues + 1;
                    end = this.totalPages; // end也就是最后一个，最后一个应该是总数
                 }
            }
            let numObj = {"start":state, end: end};
            return numObj;

        }
    }
}
</script>
<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

</style>