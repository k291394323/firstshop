<template>
    <div>
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
//引入
import FooterGuide from './components/FooterGuide/FooterGuide'
//import {mapActions} from 'vuex'   引入然后展开使用或者直接this。$store使用

export default {
    mounted(){
        this.$store.dispatch('getAddress')
        this.$store.dispatch('getUserInfo')//自动获取用户信息登陆
    },
    //第二种写法 异步显示当前地址
   /*  methods:{
        ...mapActions(['getAddress'])
    }, */

//注册成组件
components:{
    FooterGuide
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
