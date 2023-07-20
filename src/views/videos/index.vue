<template>
  <div class="video">
    <app-nav-bar title="视频查看"></app-nav-bar>
    <div class="search-form">
      <van-field
        v-model="idNo"
        :label-width="0"
        :label="''"
        placeholder="请输入信息查询"
      />
      <van-button type="info" @click="onSearch">查询</van-button>
    </div>
    <van-list>
      <van-loading size="24px" vertical v-show="loading" style="padding: 20px 0">加载中...</van-loading>
      <div class="video-item" v-for="(item, index) in videoList" :key="index">
        <div class="info">
          <div class="name">{{ item.title }}</div>
          <div class="date">{{  item.time }}</div>
        </div>
        <img src="../../assets/img/play.png" class="play" @click="openVideo(item.videoUrl)">
      </div>
      <div class="no-data" v-if="!loading && videoList.length == 0">暂无数据</div>
    </van-list>

  <!--  视频查看  -->
    <van-popup v-model="show" closeable  close-icon="close" position="center">
      <video
        :x-webkit-airplay="true"
        :x5-playsinline="true"
        :playsinline="true"
        :webkit-playsinline="true"
        x5-video-player-type="h5"
        :x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        ref="video"
        width="100%"
        height="350"
        :src="playSrc"
        class="play-video vjs-4-3"></video>
    </van-popup>
  </div>
</template>

<script>
import AppNavBar from "@/components/AppNavBar.vue";
import {Apis} from "@/apis";

export default {
  name: 'videos',
  components: {AppNavBar},
  data() {
    return {
      loading: false,
      show: false,
      playSrc: "",
      idNo: "",
      videoList: []
    }
  },

  methods: {
    openVideo(src) {
      this.playSrc = src;
      this.show = true;
      setTimeout(() => {
        this.$refs.video.play();
      }, 500);
    },
    async onSearch() {
      this.loading = true
      const { data } = await Apis.getVideoList({idNo: this.idNo});
      console.log(data);
      if(data) {
        this.videoList = data
      } else {
        this.videoList = []
      }
      setTimeout(() => {
        this.loading = false
      }, 900)
    },
  }
}
</script>
<style scoped lang="less">
.video {
  background: #FFFFFF;
}
.play-video {
  width: 680px;
}
.no-data {
  text-align: center;
  padding: 150px 0;
  color: #4D515B;

}
.search-form {
  display: flex;
  justify-content: space-between;
  margin-top: 54px;
  padding: 0 40px;

  /deep/ .van-field {
    position: relative;
    width: 478px;
    height: 96px;
    border-radius: 16px;
    border: 2px solid #CCCDD0;
  }

  /deep/ .van-button--info {
    width: 172px;
    height: 96px;
    margin-left: 20px;
    border-radius: 16px;
  }
}

.video-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 54px 32px 40px;
  height: 144px;
  border-bottom: 1px solid #CCCDD0;

  &:first-child {
    margin-top: 34px;
    border-top: 1px solid #CCCDD0;
  }

  .info {
    height: 80px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 28px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 33px;
  }

  .play {
    width: 52px;
    height: 52px;
    margin-left: 36px;
  }
}
</style>
