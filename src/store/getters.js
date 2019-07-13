/*
包含多个基于state的getter计算属性的对象
【getters】是store的计算属性。


 */

export default{
    totalCount(state){
        return state.cartFoods.reduce((pretotal,food)=>pretotal+food.count,0)   //0初始值  执行一个数组方法计算出综合
    },
    totalPrice(state){
        return state.cartFoods.reduce((pretotal,food)=>pretotal+food.count*food.price,0)   //0初始值
    },
    positiveSize(state){
        return state.ratings.reduce((pretotal,rating)=>pretotal+(rating.rateType===0? 1:0),0)
    }
}