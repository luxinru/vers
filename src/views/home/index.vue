<template>
  <div class="home">
    <div class="home-menu">
      <div class="home-menu-item" v-for="(item, index) in menus" :key="index" @click="goRouter(item)">
        <img :src="item.icon">
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Apis } from '@/apis/index'
export default {
  name: 'Home',
  data () {
    return{
      menus: [
        { icon: require('../../assets/img/Payment.png'), name: '代支付费用确认', path: '/fee-confirm' },
        { icon: require('../../assets/img/Responsibility.png'), name: '贷款责任与告知', path: '/message' },
        { icon: require('../../assets/img/contract.png'), name: '合同权益与费用确认', path: '/contract' },
        { icon: require('../../assets/img/Slice1.png'), name: '视频查看', path: '/videos' },
      ]
    }
  },
  mounted() {
    Apis.getDetail({
      idNo: "11111"
    })
  },
  methods: {
    goRouter(item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="less">
.home{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/img/home-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .home-menu{
    width: 670px;
    .home-menu-item {
      display: flex;
      align-items: center;
      width: 670px;
      height: 174px;
      padding: 0 36px;
      background: #FFFFFF;
      box-shadow: 0px 8px 10px -2px rgba(0,0,0,0.01);
      border-radius: 22px;
      margin-bottom: 48px;
      img {
        width: 90px;
        height: 90px;
        margin-right: 52px;
      }
      .name {
        font-size: 36px;
        font-weight: 400;
        color: #000000;
      }
    }
  }
}
</style>
