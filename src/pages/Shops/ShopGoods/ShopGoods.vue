<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 菜单对应的是食物分类列表-->
        <ul>
          <!--current动态-->
          <li
                                                                                                  class  = "menu-item"
                                                                                                  v-for  = "(item,index) in goods"
                                                                                                :key     = "index"
                                                                                                :class   = "{current: index===currentIndex}"
                                                                                                  @click = "clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="item.icon" v-if="item.icon" />
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                                                                                                      class       = "food-item bottom-border-1px"
                                                                                                      v-for       = "(food,index) in good.foods "
                                                                                                    :key          = "index"
                                                                                                      @click.stop = "showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" v-lazy="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                      <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
          <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>

  </div>
</template>
<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'

export default {
  data() {
    return {
      scrollY: 0,    // 右侧 Y 轴滑动的坐标(越往下数值越小)
      tops   : [],   // 包含右侧所有分类小列表的 top 值
      food   : {}    // 需要显示的food
    };
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //在异步请求中写回调参数
      this.$nextTick(() => {

        this._initScorll();
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),
    currentIndex() {
      //初始执行和相关数据变了执行
      //得到相关条件数据 根据条件计算产生一个结果 最后返回结果
      const { scrollY, tops } = this;
      //findindex 在tops找到当前top值下标处于li上一个下边和下一个下标之间就停止找
      //scrolly >=上一个top 小于下一个top 结果是上一个top
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      return index;
    }
  },
  methods: {
    //初始化滚动
    _initScorll() {
      //列表之后显示创建
      new BScroll(".menu-wrapper", {
          click     : true,
          mouseWheel: true
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType : 2,      //触发监听
        click     : true,
        mouseWheel: true
      });
      //给右侧列表绑定scroll监听xy
       this.foodsScroll.on("scroll", ({ x, y }) => {
        //console.log(x, y);
        this.scrollY = Math.abs(y);  //取正数
      });
      //给右侧列表绑定scroll结束监听xy
       this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        //console.log(x, y);
        this.scrollY = Math.abs(y);  //取正数
      });
    },
    _initTops() {
      //1.初始化tops
      const tops = [];
      let   top  = 0;
      tops.push(top);
      //2.收集tops
      //通过refs找到ul所有分类li  右侧
      const lis = this.$refs.foodsUl.children;
      //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。  因为lis是为数组 所以要用Array构造器遍历为真数组 slice返回一个新数组 不传参则元素不变
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      //3.更新tops
      this.tops = tops;
      // console.log(tops)
    },
    clickMenuItem(index){
        const scrollY      = this.tops[index]  // 得到目标位置的scrollY
              this.scrollY = scrollY           //点击左侧立刻跳转变色
        this.foodsScroll.scrollTo(0,-scrollY,300)//平滑滚
    },
    showFood(food){
        //更新数据
        this.food = food
        //在父组件中调用子组件的方法  在子组件上添加ref标识 可以直接调用方法
        this.$refs.food.alertFood()
    }
  },
  components:{
      CartControl,
      Food,
      ShopCart
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display   : flex;
  position  : absolute;
  top       : 195px;
  bottom    : 46px;
  width     : 100%;
  background: #fff;
  overflow  : hidden;

  .menu-wrapper {
    flex      : 0 0 80px;
    width     : 80px;
    background: #f3f5f7;

    .menu-item {
      display    : table;
      height     : 54px;
      width      : 56px;
      padding    : 0 12px;
      line-height: 14px;

      &.current {
        position   : relative;
        z-index    : 10;
        margin-top : -1px;
        background : #fff;
        color      : $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display          : inline-block;
        vertical-align   : top;
        width            : 12px;
        height           : 12px;
        margin-right     : 2px;
        background-size  : 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display       : table-cell;
        width         : 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height      : 26px;
      line-height : 26px;
      border-left : 2px solid #d9dde1;
      font-size   : 12px;
      color       : rgb(147, 153, 159);
      background  : #f3f5f7;
    }

    .food-item {
      display       : flex;
      margin        : 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex        : 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin     : 2px 0 8px 0;
          height     : 14px;
          line-height: 14px;
          font-size  : 14px;
          color      : rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size  : 10px;
          color      : rgb(147, 153, 159);
        }

        .desc {
          line-height  : 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size   : 14px;
            color       : rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size      : 10px;
            color          : rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right   : 0;
          bottom  : 12px;
        }
      }
    }
  }
}
</style>
