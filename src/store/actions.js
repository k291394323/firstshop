/*
Action: 通过操作mutation间接更新state的多个方法的对象
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_TYPES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    REST_USER_INFO,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
    reqAddress, reqFoodTypes, reqShops,reqUser, reqLogout, reqShopGoods, reqShopRatings, reqShopInfo, reqSearchShops
} from '../api'
export default {
    //异步获取地址
  async  getAddress({commit,state}){
        //发送异步ajax请求
        const geohash = state.latitude +',' +state.longitude
        const result  = await  reqAddress(geohash)            //异步请求
        //根据结果提交mutation
        if(result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})                  //发送给mutation
        }

    },
    //异步获取商品列表
    async  getTypes({commit}){
        //发送异步ajax请求
        const result = await  reqFoodTypes()
        //根据结果提交mutation
        if(result.code === 0){
            const types = result.data
            commit(RECEIVE_TYPES,{types})
        }

    },
    //异步获取商家列表
    async  getShops({commit,state}){
        //发送异步ajax请求
        const {longitude,latitude} = state;
        const result               = await  reqShops(longitude,latitude)
        //根据结果提交mutation
        if(result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops})
        }

    },

    //记录用户信息
    recordUser({commit},user_info){
        commit(RECEIVE_USER_INFO,{user_info})
    },
    //异步获取用户信息
  async  getUserInfo({commit}){
      //调用接口进行验证 得到用户信息 并且记录
        const result = await reqUser()
        if(result.code===0){
            const user_info = result.data
            commit(RECEIVE_USER_INFO,{user_info})
        }
    },
    //异步登出
    async logout({commit} ){
        const result = await reqLogout()
        if(result.code===0){
            commit(REST_USER_INFO)
        }
    },
    //异步商品详情
    async getShopGoods({commit},cb){
        const result = await reqShopGoods()
        if(result.code===0){
            const goods = result.data
            commit(RECEIVE_GOODS,{goods})
            cb&&cb()
        }
    },
    //异步评价详情
    async getShopsRatings({commit},cb){
        const result = await reqShopRatings()
        if(result.code===0){
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
            cb&&cb()
        }
    },
    //异步商家详细信息
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.code===0){
            const info = result.data
            commit(RECEIVE_INFO,{info})
        }
    },
    //同步更新food中的count
    updateCartCount({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREMENT_FOOD_COUNT,{food})
        }else{
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },
    //同步清除购物车
    clearcart({commit}){
        commit(CLEAR_CART)
    },
       //异步搜索
       async searchShops({commit,state},keyword){
        const geohash = state.latitude +',' +state.longitude
        const result  = await reqSearchShops(geohash,keyword)
        if(result.code===0){
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS,{searchShops})
        }
    }
}