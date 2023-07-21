<template>
  <div class="fee-confirm">
    <app-nav-bar title="合同权益与费用确认"></app-nav-bar>
    <van-form @submit="onSubmit">
      <div class="block-item">客户信息录入</div>
      <van-field v-model="addForm.userName" :label-width="0" :label="''" name="客户姓名" placeholder="客户姓名" />
      <van-field v-model="addForm.userIdNo" :label-width="0" :label="''" name="身份证号" placeholder="输入身份证号" />
      <van-field v-model="addForm.fee" :label-width="0" label="费用点数" placeholder="费用点数">
        <template #right-icon>
          <div class="rate">%</div>
        </template>
      </van-field>
      <van-field readonly clickable name="calendar" v-model="addForm.date" :label-width="80" :label="''"
        placeholder="点击选择日期" @click="showCalendar = true">
        <template #left-icon>
          <img class="time" src="../../assets/img/time.png">
        </template>
      </van-field>
      <!-- <p class="tips">注：日期初始数字为当天日期，可手动修改</p> -->
      <van-button round block type="info" native-type="submit" class="form-submit">提交视频确认</van-button>
    </van-form>
    <van-popup v-model="showCalendar" round position="bottom">
      <van-datetime-picker v-model="addForm.date" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
        @cancel="showCalendar = false" @confirm="confirmDate" />
    </van-popup>
  </div>
</template>

<script>
import AppNavBar from "@/components/AppNavBar.vue";
import { Apis } from "@/apis";
import { formValidator } from "@/utils/validator";
import dayjs from "dayjs";
import moment from "moment";
export default {
  name: 'contract',
  components: { AppNavBar },
  data() {
    return {
      addForm: {
        userName: "",
        userIdNo: "",
        fee: "",
        date: dayjs().format("YYYY-MM-DD ")
      },
      minDate: new Date(1996, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17),
      showCalendar: false,
    }
  },
  methods: {

    async onSubmit() {
      if (!formValidator(this.addForm)) return
      const res = await Apis.confirmationContractAmount(this.addForm);
      await this.$store.commit("setStashInfo", res.data)

      const date = moment().format('YYYY年MM月DD日')

      this.$router.push({
        path: "/video-recording",
        query: {
          type: "003",
          tips: JSON.stringify([
            `请问你是${this.addForm.userName}，身份证号码是${this.addForm.userIdNo}本人，对吗？`,
            `确保您的权益谈话有录像请谅解，您这边自愿于${date}委托扬州万融商务咨询有限公司提供居间服务，到银行或者相关机构申请贷款申请，资料都由您本人提供，并且确保真实对吗？`,
            "我司是贷款信息居间服务公司，不是银行提供的，是贷款信息之间中介服务，居间服务费用为实际贷款总额度的7%，合同由您自愿签署，您支付的全额之间费用是我司单纯的中介费用跟其他包括，但不限于支付银行或者机构的本金及利息等费用无关，对于合同内容您都完全正确理解，不存在任何误解了对吗？"
          ])
        }
      });
    },
    confirmDate(value) {
      this.showCalendar = false;
      this.addForm.date = dayjs(value).format("YYYY-MM-DD ");
    }
  },
}
</script>

<style scoped lang="less">
.fee-confirm {
  background: #FFFFFF;
}

.block-item {
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  padding: 0 42px;
  margin-top: 34px;
  background: #F5F5F5;
  font-size: 28px;
  font-weight: 600;
  color: #4D515B;
}

/deep/.van-field {
  position: relative;
  width: 670px;
  height: 96px;
  margin: 20px auto 0;
  border-radius: 16px;
  border: 2px solid #CCCDD0;

  .rate {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -20px;
    right: -32px;
    width: 60px;
    height: 96px;
    background: #DBDBE1;
    border-radius: 0 16px 16px 0;
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: #DBDBE1;
    border-radius: 0 16px 16px 0;
  }
}

.form-submit {
  width: 656px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 316px auto 0;
  background: #3785FB;
  border-radius: 16px;
  font-size: 32px;
  font-weight: 600;
  color: #FFFFFF;
}

.tips {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  color: #FF0000;
  line-height: 24px;
}
</style>
