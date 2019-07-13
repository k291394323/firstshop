/* 路由器对象模块 */

import Vue from 'vue'
import VueRouter from 'vue-router'
/* import  MSite  from '../pages/MSite/MSite.vue'
import  Order  from '../pages/Order/Order.vue'
import  Profile  from '../pages/Profile/Profile.vue'
import  Search  from '../pages/Search/Search.vue' */

/* 路由懒加载 */
const MSite   = ()=>import('../pages/MSite/MSite.vue')
const Order   = ()=>import('../pages/Order/Order.vue')
const Profile = ()=>import('../pages/Profile/Profile.vue')
const Search  = ()=>import('../pages/Search/Search.vue')

import  Login  from '../pages/Login/Login.vue'
import  Shops  from '../pages/Shops/Shop.vue'
import  ShopGoods  from '../pages/Shops/ShopGoods/ShopGoods.vue'
import  ShopRatings  from '../pages/Shops/ShopRatings/ShopRatings.vue'
import  ShopInfo  from '../pages/Shops/ShopInfo/ShopInfo.vue'


//使用路由插件
Vue.use(VueRouter)
//实例化路由
export default new VueRouter({
    //全部路由
    routes:[
        {
            path     : '/msite',
            component: MSite,
            meta     : {
                showFooter: true
            }
        },
        {
            path     : '/search',
            component: Search,
            meta     : {
                showFooter: true
            }
        },
        {
            path     : '/profile',
            component: Profile,
            meta     : {
                showFooter: true
            }
        },
        {
            path     : '/order',
            component: Order,
            meta     : {
                showFooter: true
            }
        },

        {
            path     : '/login',
            component: Login
        },
        {
            path    : '/',
            redirect: '/msite'
        },

        {
            path     : '/shop',
            component: Shops,
            children : [
                {
                    path     : '/shop/goods',
                    component: ShopGoods
                },
                {
                    path     : '/shop/ratings',
                    component: ShopRatings
                },
                {
                    path     : '/shop/info',
                    component: ShopInfo
                },
                {
                    path    : '',
                    redirect: '/shop/goods'
                }
            ]
        },
    ]
})