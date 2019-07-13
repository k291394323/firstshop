import ajax from "./ajax";
const base_url = '/api'  //引入跨域规则
/* 包含n个接口请求函数的模块 */
// 1、根据经纬度获取位置详情
export function reqAddress(geohash) {
    return  ajax(base_url + `/position/${geohash}`)
}
// 2、获取食品分类列表
 export function reqFoodTypes(){
   return ajax(base_url+'/index_category')
}
/* export const reqFoodTypes = () => ajax(base_url + '/index_category') */
// 3、根据经纬度获取商铺列表
export function reqShops( latitude,longitude) {
    return ajax(base_url + '/shops', { latitude,longitude })
}
// 4、根据经纬度和关键字搜索商铺列表
export function reqSearchShops(geohash, keyword) {
    return  ajax(base_url + '/search_shops', { geohash, keyword })
}
// 5、获取一次性验证码
export function reqOnce() {
    return ajax(base_url +'/captcha')
}
// 6、用户名密码登陆
export function reqPwdLogin({name, pwd, captcha}) {
    return  ajax(base_url +'/login_pwd', { name, pwd, captcha }, 'POST')
}
// 7、发送短信验证码
export function reqSendCode(phone) {
    return ajax(base_url +'/sendcode', { phone })
}
// 8、手机号验证码登陆
export function reqSmsLogin(phone, code) {
    return ajax(base_url +'/login_sms', { phone, code }, 'POST')
}
// 9、根据会话获取用户信息
export function reqUser() {
    return ajax(base_url +'/userinfo')
}
// 10、用户登出
export  function reqLogout (){
  return  ajax(base_url + '/logout')
}
/* export const reqLogout = () => ajax(base_url + '/logout') */

//11,请求商品详情
export function reqShopGoods(){
    return ajax('/goods')
}

//12.请求评价信息
export function reqShopRatings(){
    return ajax('/ratings')
}
//13.请求商家信息
export function reqShopInfo(){
    return ajax('/info')
}