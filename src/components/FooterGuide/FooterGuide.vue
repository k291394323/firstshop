<template>
  <footer class="footer_guide border-1px">
    <a
        href   = "javascript:;"
        class  = "guide_item"
      :class   = "{on:'/msite'===$route.path}"
        @click = "go('/msite')"
    >
      <!-- 请求路径===当前路径  -->
      <span class="item_icon">
        <i class="iconfont icon-food"></i>
      </span>
      <span>外卖</span>
    </a>
    <!--其他三部分类似-->
    <a
        href   = "javascript:;"
        class  = "guide_item"
      :class   = "{on:'/search'===$route.path}"
        @click = "go('/search')"
    >
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a
        href   = "javascript:;"
        class  = "guide_item"
      :class   = "{on:'/order'===$route.path}"
        @click = "go('/order')"
    >
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a
        href   = "javascript:;"
        class  = "guide_item"
      :class   = "{on:'/profile'===$route.path}"
        @click = "go('/profile')"
    >
      <span class="item_icon">
        <i class="iconfont icon-food"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
export default {
  methods: {
    go(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import '../../common/stylus/mixins';

.footer_guide {
  /* 顶部有白色的边框 */
  top-border-1px(#e4e4e4);
  position        : fixed;
  z-index         : 100;
  left            : 0;
  right           : 0;
  bottom          : 0;
  background-color: #fff;
  width           : 100%;
  height          : 50px;
  display         : flex;

  .guide_item {
    display       : flex;
    flex          : 1;
    text-align    : center;
    flex-direction: column;
    align-items   : center;
    margin        : 5px;
    color         : #999999;

    &.on {
      color: #02a774;
    }

    span {
      font-size    : 12px;
      margin-top   : 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>
