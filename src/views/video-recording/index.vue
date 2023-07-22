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
      :class="{ bottom: !nextQuestion }"
      ref="swipe"
      :show-indicators="false"
      :loop="false"
      :touchable="false"
    >
      <van-swipe-item v-for="(item, index) in tips" :key="index">
        <div class="tips">
          {{ item.text }}
        </div>
      </van-swipe-item>
    </van-swipe>

    <div v-if="nextQuestion" class="btn" @click="question">
      {{ nameButton }}
    </div>

    <audio :src="audioSrc" ref="audioRef" autoplay></audio>
  </div>
</template>

<script>
import RecordRTC from "recordrtc";

import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Notify, Toast } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
import { Apis } from "@/apis";

export default {
  name: "videoRecording",

  data() {
    return {
      nameButton: "开始提问",
      recordRTC: null,
      stream: null,
      countdown: 3, // 倒计时
      isAction: false, // 是否开始动画
      audioSrc: "",
      index: 0,
      nextQuestion: false
    };
  },

  computed: {
    tips() {
      return this.$store.state.stashInfo;
    },

    type() {
      return this.$route.query.type;
    }
  },

  mounted() {
    this.audioSrc = this.$store.state.stashInfo[0].audioSrc;
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
        this.startRecording();
        this.startCountDown();
      } catch (error) {
        Notify({
          type: "danger",
          message: "前置摄像头打开失败，请确认是否已授权"
        });
      }
    },

    async stopRecording(superBuffer) {
      Toast.loading({
        message: "视频上传中，请稍后",
        forbidClick: true
      });

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

      Toast.clear();

      Notify({ type: "success", message: "上传成功！" });

      this.$router.go("-1");
    },

    startCountDown() {
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(timer);
          this.nextQuestion = true;
        }
      }, 1000);
    },

    startRecording() {
      this.recordRTC = RecordRTC(this.stream, {
        type: "video"
      });
      this.recordRTC.startRecording();
    },

    question() {
      if (this.nameButton !== '开始提问') {
        this.$refs.swipe.next()
      }
      this.nameButton = "下一个问题";
      this.audioSrc = this.$store.state.stashInfo[this.index].audioUrl;
      this.$refs.audioRef.play();
      if (this.index < this.$store.state.stashInfo.length - 1) {
        this.index = this.index + 1;
      } else {
        this.nextQuestion = false;

        this.recordRTC.stopRecording(async () => {
          let recordedBlob = this.recordRTC.getBlob();
          // 这里你可以将 recordedBlob 上传到服务器
          this.stopRecording(recordedBlob);
        });
      }
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
    bottom: 188px;
    width: 686px;
    margin: 0 auto;
    transition: all 0.3s ease-in-out;

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

  .bottom {
    bottom: 46px;
  }

  .btn {
    position: absolute;
    bottom: 46px;
    width: 656px;
    height: 96px;
    background: #3785fb;
    border-radius: 16px;
    font-size: 32px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  audio {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
