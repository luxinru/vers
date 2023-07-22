<template>
  <div class="login">
    <div class="login-txt">账号登录</div>
    <div class="login-div">
      <input
        v-model="userName"
        type="text"
        class="input-txt"
        id="username"
        placeholder="请输入用户名"
      />
    </div>
    <div class="login-div">
      <input
        v-model="password"
        type="password"
        class="input-txt"
        id="password"
        placeholder="请输入登录密码"
      />
    </div>
    <div class="login-submit" @click="onSubmit">登 录</div>
    <div class="login-tip"></div>
  </div>
</template>

<script>
import "./js/flexible.js";
import { Toast } from "vant";

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      if (!this.userName || !this.password) {
        Toast("请输入账号密码");
      } else if (this.userName !== "yzwrttp" || this.password !== "ttpk123") {
        Toast("账号或密码错误，请重新输入");
      } else {
        // window.location.href = './index.html'
        this.$router.push({ path: "/home" });
      }
    }
  }
};
</script>

<style lang="less">
.login {
  background-image: url("../../assets/img/bg.png");
  background-size: 100%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.login .login-txt {
  font-size: 0.41rem;
  color: #121212;
  font-weight: bold;
  line-height: 0.48rem;
  padding-top: 2.59rem;
  /* padding-left: .65rem; */
  padding-bottom: 1.37rem;
  box-sizing: border-box;
  text-align: center;
}

.login .login-div {
  width: 5.1rem;
  height: 0.82rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.38rem;
  margin-left: 50%;
  transform: translateX(-50%);
}

.login .login-div .input-txt {
  display: block;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  padding-left: 0.96rem;
  box-sizing: border-box;
  color: #121212;
  font-size: 0.27rem;
  background-color: #eff1f6;
  border-radius: 100px;
}

.login .login-div .input-txt::placeholder {
  color: #b3b3b3;
}

.login .login-submit {
  margin-top: 0.65rem;
  width: 5.1rem;
  height: 0.77rem;
  border-radius: 100px;
  background-color: #2a64f5;
  text-align: center;
  font-size: 0.27rem;
  color: #ffffff;
  font-weight: 500;
  line-height: 0.77rem;
  margin-left: 50%;
  transform: translateX(-50%);
}

.login .login-tip {
  font-size: 0.2rem;
  color: #b8b8b8;
  text-align: center;
  margin-top: 0.27rem;
  line-height: 0.26rem;
}
</style>
