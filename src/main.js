/* 入口js */
import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store/index.js'
import {Button} from 'mint-ui'
import VueLazyLoad from "vue-lazyload"
import './mock/mockServer.js'
import loading from './common/imgs/loading.gif'
import './filters'  //加载自定义过滤器

//注册全局组件
Vue.component(Button.name,Button)
Vue.use(VueLazyLoad,{
    loading
})
new Vue({
    el        : '#app',
    components: {App},
    template  : '<App/>',
    store,
    router

})