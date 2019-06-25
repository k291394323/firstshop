<template>
  <section class="msite">
    <!--首页头部title-->
    <!--由msite_header改成header-->
    <HeaderTop title="鲁东大学北区(青年南路)">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航轮播-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>一棵白菜</span>
            </a>


            <!--下面的图片省略-->
          </div>
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/msitelunbo.png">
              </div>
              <span>甜品饮品</span>
            </a>
            <!--同样省略-->
          </div>
        </div>
        <!-- 轮播图页码 -->
        <div class="swiper-pagination"></div>
      </div>
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
import HeaderTop from "../../components/HeaderTop/HeaderTop"
import ShopList from "../../components/ShopList/ShopList"
/* 第三方 */
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  mounted() {
    new Swiper(".swiper-container", {
      loop: false,   // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      },
    });
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
