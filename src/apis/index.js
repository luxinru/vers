import request from "@/apis/request";

// 获取详情
export const  Apis = {
  getDetail(params) {
    return request({
      url: "/authentication/getInfo",
      params
    })
  },
  // 视频上传
  uploadVideo(data) {
    return request({
      method: "post",
      url: "/oss/file/uploadVideo",
      data
    })
  },
  // 保存视频
  saveVideo(data) {
    return request({
      url: "/authentication/saveVideo",
      method: "post",
      data
    })
  },
  // 待支付费用确认
  confirmationAgentAmount(data) {
    return request({
      method: "post",
      url: "/authentication/confirmationAgentAmount",
      data
    })
  },
  // 贷款责任与告知
  notificationLoanLiability(data) {
    return request({
      method: "post",
      url: "/authentication/notificationLoanLiability",
      data
    })
  },
  // 合同与费用确认
  confirmationContractAmount(data) {
    return request({
      method: "post",
      url: "/authentication/confirmationContractAmount",
      data
    })
  },
  // 获取视频列表
  getVideoList(params) {
    return request({
      method: "get",
      url: "/authentication/getVideoList",
      params
    })
  },
}


