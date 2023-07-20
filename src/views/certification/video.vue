<template>
  <div>
    <van-overlay :show="uploadLoading" class="fixed-loading">
      <van-loading size="24px" type="spinner" vertical
        >上传中，请耐心等待...</van-loading
      >
    </van-overlay>
    <video
      controls
      autoplay
      playsinline
      webkit-playsinline="true"
      ref="video"
      width="100%"
      height="430"
      class="video vjs-4-3"
    ></video>
    <div v-if="showIos" class="demo" style="text-align: center">
      <div class="shixin"></div>
      <div class="kongxin"></div>
    </div>
    <span class="question-text">{{ value }}</span>
    <div class="center" style="margin-top: 30px">
      <button @click="StartRecord" v-if="startRecording" size="small">
        开始视频认证
      </button>
      <button
        @click="StopRecord"
        v-else-if="stopRecording"
        size="small"
        id="btn-stop-recording"
      >
        结束视频认证
      </button>
      <button @click="question()" v-else-if="nextQuestion">
        {{ nameButton }}
      </button>
    </div>
    <div
      class="center"
      style="margin-top: 30px;position: relative;"
      v-if="uploadFlag"
    >
      <van-uploader :after-read="uploadVideo">
        <button>上传视频</button>
      </van-uploader>
    </div>
    <audio :src="audioSrc" ref="audioRef" autoplay></audio>
  </div>
</template>

<script>
import { Apis } from "@/apis";

export default {
  name: "videoCertification",
  data() {
    return {
      nameButton: "开始提问",
      startRecording: true,
      stopRecording: false,
      nextQuestion: false,
      index: 0,
      video: null,
      value: "",
      blob: "",
      showIos: false,
      recordedBlobs: [], // 视频音频 blobs
      audioSrc: "",
      mediaStreamTrack: {}, // 退出时关闭摄像头
      video_stream: "", // 视频stream,
      uploadLoading: false,
      uploadFlag: false
    };
  },
  //函数
  mounted() {
    this.audioSrc = this.$store.state.stashInfo[0].audioSrc;
  },
  destroyed() {
    this.mediaStreamTrack = {};
    this.video_stream = "";
    this.recordedBlobs = [];
  },
  methods: {
    async uploadVideo(file) {
      this.uploadLoading = true;
      try {
        const formData = new FormData();
        formData.append("video", file.file);
        formData.append("type", "001");
        const upload = await Apis.uploadVideo(formData);
        await Apis.saveVideo({
          userIdNo: this.$store.state.userInfo.userIdNo,
          videoType: this.$store.state.userInfo.videoType,
          videoUrl: upload.data
        });
        this.uploadLoading = false;
      } catch (e) {
        this.uploadLoading = false;
      }
    },
    question() {
      this.nameButton = "下一个问题";
      this.value = this.$store.state.stashInfo[this.index].text;
      this.audioSrc = this.$store.state.stashInfo[this.index].audioUrl;
      this.$refs.audioRef.play();
      if (this.index < this.$store.state.stashInfo.length - 1) {
        this.index = this.index + 1;
      } else {
        this.nextQuestion = false;
        this.stopRecording = true;
      }
    },
    // 调用打开摄像头功能
    StartRecord() {
      this.startRecording = false;
      this.nextQuestion = true;
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            volume: { min: 0.0, max: 0.3 },
            noiseSuppression: false,
            echoCancellation: false
          },
          video: { facingMode: "user" }
        })
        .then(async stream => {
          // 摄像头开启成功
          // this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
          this.video_stream = stream;
          this.$refs.video.srcObject = stream;
          await this.$refs.video.play();
          await this.record();
          this.startRecording = false;
          this.nextQuestion = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 视频录制
    async record() {
      let mediaRecorder;
      let options;
      this.recordedBlobs = [];
      if (typeof MediaRecorder.isTypeSupported === "function") {
        // 根据浏览器来设置编码参数
        if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
          options = {
            MimeType: "video/webm;codecs=h264"
          };
        } else if (MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
          options = {
            MimeType: "video/webm;codecs=h264"
          };
        } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
          options = {
            MimeType: "video/webm;codecs=vp8"
          };
        }
        mediaRecorder = new MediaRecorder(this.video_stream, options);
      } else {
        // console.log('isTypeSupported is not supported, using default codecs for browser');
        console.log("当前不支持isTypeSupported，使用浏览器的默认编解码器");
        mediaRecorder = new MediaRecorder(this.video_stream);
      }
      mediaRecorder.start();
      // 视频录制监听事件
      mediaRecorder.ondataavailable = e => {
        // 录制的视频数据有效
        if (e.data && e.data.size > 0) {
          this.recordedBlobs.push(e.data);
        }
      };
      // 停止录像后增加下载视频功能，将视频流转为mp4格式
      mediaRecorder.onstop = () => {
        this.blob = new Blob(this.recordedBlobs, { type: "video/mp4" });
      };
    },
    // 停止录制
    StopRecord() {
      this.stopRecording = false;
      this.uploadFlag = true;
      if (!this.$refs.video.srcObject) return;
      const stream = this.$refs.video.srcObject;
      const tracks = stream.getTracks();
      // 关闭摄像头和音频
      tracks.forEach(track => {
        track.stop();
      });
    }
  }
};
</script>

<style scoped lang="less">
.fixed-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .van-loading__text {
    color: #fff7cc;
  }
}
.shixin {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #bbdefb;
  position: relative;
  top: -39px;
  left: 9%;
}

.kongxin {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #fff;
  position: relative;
  top: -52px;
  left: 9%;
}

.center {
  display: flex;
  justify-content: center;
}

audio {
  display: none;
}

button {
  width: 70%;
  padding: 10px 20px;
  background-color: #428bca;
  color: #fff;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 15px;
  /* future proofing */
  -khtml-border-radius: 10px;
  /* for old Konqueror browsers */
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  font-weight: 900;
  font-size: 125%;
}

/* 隐藏video 所有控件 */
*::-webkit-media-controls-panel {
  display: none !important;
  -webkit-appearance: none;
}

*::--webkit-media-controls-play-button {
  display: none !important;
  -webkit-appearance: none;
}

*::-webkit-media-controls-start-playback-button {
  display: none !important;
  -webkit-appearance: none;
}

.question-text {
  max-height: 150px;
  overflow-y: scroll;
  display: block;
  margin: 0 auto;
  width: 96%;
  //border: 1px solid #CCCDD0;
  padding: 12px 24px;
  border-radius: 8px;
}
/deep/.van-uploader {
  width: 70%;
  margin: 0 auto;
  .van-uploader__input-wrapper,
  button {
    display: block;
    width: 100%;
  }
}
</style>
