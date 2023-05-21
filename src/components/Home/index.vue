<template lang="">
    <div>
        <!-- 因为引用的是全局组件所以直接使用 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :getfloor="floor"></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
    import ListContainer from '../Alluse/ListContainer';
    import Recommend from '../Alluse/Recommend';
    import Rank from '../Alluse/Rank';
    import Like from '../Alluse/Like';
    import Floor from '../Alluse/Floor';
    import Brand from '../Alluse/Brand';
    import {mapState} from 'vuex';
  import store from '@/store/Vuex';
export default {
    name:"Home",
    components:{
        ListContainer,Recommend,Rank,Like,Floor,Brand,
    },
    mounted() {
        this.$store.dispatch("getFloorList");   //调用
        //获取用户数数据展示在首页
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList 
        })
    }
}
</script>

<style lang="less" scoped>
    
</style>