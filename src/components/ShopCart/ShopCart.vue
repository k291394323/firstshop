<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <!-- 高亮 -->
              <i class="iconfont icon-shopping" :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
            <!-- 计算数目 -->
          </div>
          <div class="price" :class="{highlight:totalPrice}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { mapState, mapGetters } from "vuex";
import CartControl from "../../components/CartControl/CartControl.vue";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      allShow: false
    };
  },
  computed: {
    ...mapState(["cartFoods", "info"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      const { totalPrice } = this;
      const { minPrice }   = this.info;
      return totalPrice > minPrice ? "enough" : "not-enough"; //根据总价和最小价格对比 确定类名
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice }   = this.info;
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`;
      } else if (totalPrice < minPrice) {
        return `差￥${minPrice - totalPrice}元起送`;
      } else {
        return "提交";
      }
    },
    listShow() {
      if (this.totalCount === 0) {
        this.allShow = false;  //点击第一次后 隐藏后还是true  所以每次先取false
        return false;
      }
      if (this.allShow) {
        this.$nextTick(() => {
          //实现bscroll为单例 防止多次创建
          if (!this.scroll) {
            this.scroll = new BScroll(".list-content", {
              click: true
            });
          } else {
            //自动刷新 防止第一次拉不动  重新统计内容高度
            this.scroll.refresh();
          }
        });
      }

      return this.allShow;
    }
  },
  methods: {
    toggleShow() {
      if (this.totalCount > 0) {
        //总数大于0 才切换   否则先点击一次 再添加时会弹出
        this.allShow = !this.allShow;
      }
    },
    clearCart() {
      MessageBox.confirm("确定清空购物车吗?").then(action => {
        this.$store.dispatch("clearcart");
      },()=>{}); //多的回调取消console的红色警告
    }
  },
  components: {
    CartControl
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left    : 0;
  bottom  : 0;
  z-index : 50;
  width   : 100%;
  height  : 48px;

  .content {
    display   : flex;
    background: #141d27;
    font-size : 0;
    color     : rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display       : inline-block;
        vertical-align: top;
        position      : relative;
        top           : -10px;
        margin        : 0 12px;
        padding       : 6px;
        width         : 56px;
        height        : 56px;
        box-sizing    : border-box;
        border-radius : 50%;
        background    : #141d27;

        .logo {
          width        : 100%;
          height       : 100%;
          border-radius: 50%;
          text-align   : center;
          background   : #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping {
            line-height: 44px;
            font-size  : 24px;
            color      : #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position     : absolute;
          top          : 0;
          right        : 0;
          width        : 24px;
          height       : 16px;
          line-height  : 16px;
          text-align   : center;
          border-radius: 16px;
          font-size    : 9px;
          font-weight  : 700;
          color        : #ffffff;
          background   : rgb(240, 20, 20);
          box-shadow   : 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display       : inline-block;
        vertical-align: top;
        margin-top    : 5px;
        line-height   : 24px;
        padding-right : 12px;
        box-sizing    : border-box;
        font-size     : 16px;
        font-weight   : 700;
        color         : #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display       : inline-block;
        vertical-align: bottom;
        margin-bottom : 15px;
        margin-left   : -45px;
        font-size     : 10px;
      }
    }

    .content-right {
      flex : 0 0 105px;
      width: 105px;

      .pay {
        height     : 48px;
        line-height: 48px;
        text-align : center;
        font-size  : 12px;
        font-weight: 700;
        color      : #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color     : #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position  : fixed;
      left      : 32px;
      bottom    : 22px;
      z-index   : 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width        : 16px;
        height       : 16px;
        border-radius: 50%;
        background   : $green;
        transition   : all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position : absolute;
    left     : 0;
    top      : 0;
    z-index  : -1;
    width    : 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height       : 40px;
      line-height  : 40px;
      padding      : 0 18px;
      background   : #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float    : left;
        font-size: 14px;
        color    : rgb(7, 17, 27);
      }

      .empty {
        float    : right;
        font-size: 12px;
        color    : rgb(0, 160, 220);
      }
    }

    .list-content {
      padding   : 0 18px;
      max-height: 217px;
      overflow  : hidden;
      background: #fff;

      .food {
        position  : relative;
        padding   : 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size  : 14px;
          color      : rgb(7, 17, 27);
        }

        .price {
          position   : absolute;
          right      : 90px;
          bottom     : 12px;
          line-height: 24px;
          font-size  : 14px;
          font-weight: 700;
          color      : rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right   : 0;
          bottom  : 6px;
        }
      }
    }
  }
}

.list-mask {
  position       : fixed;
  top            : 0;
  left           : 0;
  width          : 100%;
  height         : 100%;
  z-index        : 40;
  backdrop-filter: blur(10px);
  opacity        : 1;
  background     : rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity   : 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
