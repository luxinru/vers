import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    stashInfo: [{"text":"请问你是 aaa ,身份证号码是 610502199405285011 本人,对吗?","audioUrl":"https://authentication-oss.oss-cn-hangzhou.aliyuncs.com/user/audio/begin/610502199405285011.MP3"},{"text":"确保您的权益谈话有录像请谅解,您介绍自己亲友姓名 aa ,身份证号码 610502199405285011 ,作为贷款人委托扬州万融商务咨询有限公司提供居间服务到银行或者机构办理贷款,您自愿按照合同约定代为支付亲友贷款的中介费用,费用为贷款总额的 1%,我司是贷款中介公司不是银行提供的是中介服务.您支付的费用是我司给您朋友贷款的单纯中介费用,跟其他任何费用无关,对于合同内容您都正确理解,对于费用确认无误。并且愿意为此承担一切纠纷与责任,对吗?","audioUrl":"https://authentication-oss.oss-cn-hangzhou.aliyuncs.com/user/audio/agent/610502199405285011-0.MP3"},{"text":"面签已完成,非常感谢您的配合.","audioUrl":"https://authentication-oss.oss-cn-hangzhou.aliyuncs.com/user/audio/end/end.MP3"}], // 暂存播放录音的信息
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setStashInfo(state, stashInfo) {
      state.stashInfo = stashInfo
    }
  }
})
