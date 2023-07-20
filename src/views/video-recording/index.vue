<template>
  <div class="video_root">
    <video id="video" autoplay playsinline></video>

    <section
      v-if="countdown !== 0"
      class="count_down"
      :class="{ count_down_animation: isAction }"
    >
      <span>
        {{ countdown }}
      </span>
    </section>

    <van-swipe
      v-if="countdown === 0"
      class="swipe"
      :show-indicators="false"
      :autoplay="(recordTime / tips.length) * 1000"
      :loop="false"
      :touchable="false"
    >
      <van-swipe-item v-for="(item, index) in tips" :key="index">
        <div class="tips">
          {{ item }}
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import RecordRTC from "recordrtc";

import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Notify } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
import { Apis } from "@/apis";

export default {
  name: "videoRecording",

  computed: {
    tips() {
      return JSON.parse(this.$route.query.tips);
    },

    type() {
      return this.$route.query.type;
    },

    recordTime() {
      return Number(this.$route.recordTime) || 15;
    }
  },

  data() {
    return {
      recordRTC: null,
      stream: null,
      countdown: 3, // 倒计时
      isAction: false // 是否开始动画
    };
  },

  mounted() {
    this.initCamera();
  },

  methods: {
    async initCamera() {
      try {
        const constraints = {
          audio: true,
          video: true
        };
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector("video");
        videoElement.srcObject = this.stream;

        this.isAction = true;
        this.startCountDown();
      } catch (error) {
        Notify({
          type: "danger",
          message: "前置摄像头打开失败，请确认是否已授权"
        });
      }
    },

    async stopRecording(superBuffer) {
      // 创建一个File对象
      const recordedFile = new File([superBuffer], "recordedVideo.webm", {
        type: "video/webm"
      });

      // 然后你可以将recordedFile上传到服务器
      const formData = new FormData();
      formData.append("video", recordedFile);
      formData.append("type", this.type);
      formData.append("userIdNo", this.$store.state.userInfo.userIdNo);
      await Apis.uploadVideo(formData);

      Notify({ type: "success", message: "上传成功！" });

      this.$router.go("-1");
    },

    startCountDown() {
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(timer);
          this.startRecording();
        }
      }, 1000);
    },

    startRecording() {
      this.recordRTC = RecordRTC(this.stream, {
        type: "video"
      });
      this.recordRTC.startRecording();

      setTimeout(() => {
        this.recordRTC.stopRecording(async () => {
          let recordedBlob = this.recordRTC.getBlob();
          // 这里你可以将 recordedBlob 上传到服务器
          this.stopRecording(recordedBlob);
        });
      }, this.recordTime * 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.video_root {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  canvas {
    width: 100vw;
    height: 100vh;
  }

  .count_down {
    position: absolute;
    width: 240px;
    height: 240px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 160px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
    }
  }

  .count_down_animation {
    animation: countdown 1s linear infinite;

    //动画效果
    @keyframes countdown {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }

  .swipe {
    position: absolute;
    bottom: 46px;
    width: 686px;
    margin: 0 auto;

    /deep/ .van-swipe__track {
      align-items: flex-end;
    }

    .tips {
      width: 100%;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 8px 8px 8px 8px;
      padding: 32px 24px;
      box-sizing: border-box;

      font-size: 28px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 48px;
    }
  }
}
</style>
