<template>
  <div id="app" class="flex-col con-app">
    <!--缓存想要缓存的页面，实现后退不刷新-->
    <router-view class="f1" />
  </div>
</template>

<script>

// import vconsole from "vconsole";
// const VConsole = new vconsole();
// console.log('VConsole :>> ', VConsole);

export default {
  name: 'App',
}
</script>

<style lang="less" scoped>
  .con-app{
    min-height: 100vh;
    .bar-nav-app{
      width: 100%;
      bottom: 0;
      z-index: 1000;
      position: fixed;
    }
  }
</style>
