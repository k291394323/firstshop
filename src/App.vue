<template>
    <div>
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
//引入
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
//注册成组件
components:{
    FooterGuide
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
