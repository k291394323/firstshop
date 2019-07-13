/* 使用mock模拟数据  不需要暴露 只需要能运行计可*/

import Mock from 'mockjs'
import data from './data.json'

//返回商品接口
Mock.mock('/goods',{code:0,data:data.goods})
//返回评价接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//返回商家接口
Mock.mock('/info',{code:0,data:data.info})