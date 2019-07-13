<template>
  <section class="msite">
    <!--首页头部title-->
    <!--由msite_header改成header-->
    <HeaderTop :title="address.city">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="user_info._id?'/user_center':'/login'">
        <span class="header_login_text" v-if="!user_info._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-yonghuming"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航轮播-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="types.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(types,index) in typesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type,index) in types" :key="index">
              <div class="food_container">
                <img :src="Base_Image_Url + type.image_url" />
              </div>
              <span>{{type.title}}</span>
            </a>
          </div>
        </div>
        <!-- 轮播图页码 -->
        <div class="swiper-pagination"></div>
      </div>
      <img v-else src="./images/msite_back.svg" alt="back_img" />
    </nav>

    <!--首页附近商家列表-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
/* 自定义 */
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import ShopList from "../../components/ShopList/ShopList";
import { mapState } from "vuex";
/* 第三方 */
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      Base_Image_Url: "https://fuss10.elemecdn.com"
    };
  },
  mounted() {
    this.$store.dispatch("getTypes");
    this.$store.dispatch("getShops");
  },
  computed: {
    ...mapState(["address", "types", "user_info"]),

    //根据types一维数组 生产一个二维数组   小数组个数最大个数为8
    typesArr() {
      //拿到所有一维数据
      const { types } = this;
      //先建立一个空2维
      const arr = [];
      //准备一个小数组  最大为8
      let minArr = [];
      //遍历tyoes
      types.forEach(t => {
        //如果当前小数组已经满了  创建新的小数组   第一次不走这里 直接会把小数组放到大叔组
        if (minArr.length === 8) {
          minArr = [];
        }
        //如果minarr是空的 把小数组放到大叔组
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        //将当前分类放到小数组 并且小数组要关联大叔组
        minArr.push(t);
      });

      return arr;
    }
  },
  watch: {
    //监听types数据是否改变  一旦改变 通过$nextTick回调使用swiper轮播代码进行更新界面显示
    types(value) {
      this.$nextTick(function() {
        //此语句一定写在数据更新之后
        new Swiper(".swiper-container", {
          loop: false,   // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  },
  components: {
    HeaderTop,
    ShopList
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height    : 200px;
    background: #fff;

    .swiper-container {
      width : 100%;
      height: 100%;

      .swiper-wrapper {
        width : 100%;
        height: 100%;

        .swiper-slide {
          display        : flex;
          justify-content: center;
          align-items    : flex-start;
          flex-wrap      : wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display       : block;
              width         : 100%;
              text-align    : center;
              padding-bottom: 10px;
              font-size     : 0;

              img {
                display: inline-block;
                width  : 50px;
                height : 50px;
              }
            }

            span {
              display   : block;
              width     : 100%;
              text-align: center;
              font-size : 13px;
              color     : #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color      : #999;
      }

      .shop_header_title {
        color      : #999;
        font-size  : 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
