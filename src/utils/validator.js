import {Toast} from "vant";
import utils from "./myUtils"

export function formValidator(form) {
  if(form.agentName == '') {
    Toast('请输入代付人姓名');
    return false
  }
  if(form.agentIdNo == '') {
    Toast('请输入代付人身份证号');
    return false
  }
  if(form.agentIdNo && !utils.isIdCard(form.agentIdNo)) {
    Toast('代付人身份证号错误');
    return false
  }
  if(form.userName == '') {
    Toast('请输入客户姓名');
    return false
  }
  if(form.userIdNo == '') {
    Toast('请输入客户身份证号');
    return false
  }
  if(form.userIdNo && !utils.isIdCard(form.userIdNo)) {
    Toast('代付人身份证号错误');
    return false
  }
  if(form.fee == '') {
    Toast('请输入费用点数');
    return false
  }
  if(form.date == '') {
    Toast('请选择日期');
    return false
  }
  return true
}
