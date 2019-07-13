/*
vuex 的 mutations 模块  更新state
*/
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_TYPES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    REST_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'


export default{
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },
    [RECEIVE_TYPES](state,{types}){
        state.types = types
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state,{user_info}){
        state.user_info = user_info
    },
    [REST_USER_INFO](state){
        state.user_info = {}
    },
    [RECEIVE_GOODS](state,{goods}){
        state.goods = goods
    },
    [RECEIVE_RATINGS](state,{ratings}){
        state.ratings = ratings
    },
    [RECEIVE_INFO](state,{info}){
        state.info = info
    },
    [INCREMENT_FOOD_COUNT](state,{food}){
        if(!food.count){
            //food.count = 1
            Vue.set(food, 'count', 1) //set是给有数据绑定的对象添加属性的 让新增的属性也有数据绑定
            state.cartFoods.push(food)
        }else{
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state,{food}){
        food.count--
        if(food.count===0){
            //将food从cartfoods中移除
            state.cartFoods.splice(state.cartFoods.indexOf(food),1)//lastIndexOf() 方法可返回food在数组中最后出现的位置，从该字符串的后面向前查找。  删除
        }
    },
    [CLEAR_CART](state){
        //先遍历把count归零 然后置空cartfoods购物车食物列表  只置空 下次添加会有上次的值
        state.cartFoods.forEach(food=>food.count=0)
        state.cartFoods = []
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
        state.searchShops = searchShops
    }
}