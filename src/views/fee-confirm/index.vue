<template>
  <div class="fee-confirm">
    <app-nav-bar title="代支付费用确认"></app-nav-bar>
    <van-form @submit="onSubmit">
      <div class="block-item">代付人信息</div>
      <van-field
        v-model="addForm.agentName"
        :label-width="0"
        :label="''"
        placeholder="客户姓名"
      />
      <van-field
        v-model="addForm.agentIdNo"
        :label-width="0"
        :label="''"
        placeholder="输入身份证号"
      />
      <div class="block-item">贷款人信息</div>
      <van-field
        v-model="addForm.userName"
        :label-width="0"
        :label="''"
        placeholder="客户姓名"
      />
      <van-field
        v-model="addForm.userIdNo"
        :label-width="0"
        :label="''"
        placeholder="输入身份证号"
      />
      <van-field
        v-model="addForm.fee"
        :label-width="0"
        label="费用点数"
        placeholder="费用点数"
      >
        <template #right-icon>
          <div class="rate">%</div>
        </template>
      </van-field>
      <van-field
        name="calendar"
        v-model="addForm.date"
        :label-width="80"
        :label="''"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      >
        <template #left-icon>
          <img class="time" src="../../assets/img/time.png" />
        </template>
      </van-field>
      <!-- <p class="tips">注：日期初始数字为当天日期，可手动修改</p> -->
      <van-button
        round
        block
        type="info"
        native-type="submit"
        class="form-submit"
        >提交视频确认</van-button
      >
    </van-form>
    <van-popup v-model="showCalendar" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showCalendar = false"
        @confirm="confirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
import AppNavBar from "@/components/AppNavBar.vue";
import { Apis } from "@/apis";
import dayjs from "dayjs";
import { formValidator } from "@/utils/validator";

export default {
  name: "fee-confirm",
  components: { AppNavBar },
  data() {
    return {
      addForm: {
        agentName: "",
        agentIdNo: "",
        userName: "",
        userIdNo: "",
        fee: "",
        date: dayjs().format("YYYY-MM-DD ")
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      showCalendar: false,
      uploadFileList: []
    };
  },
  methods: {
    async onSubmit() {
      // if (!formValidator(this.addForm)) return;
      // const res = await Apis.confirmationAgentAmount(this.addForm);
      // await this.$store.commit("setUserInfo", {
      //   videoType: "001",
      //   userIdNo: this.addForm.userIdNo
      // });
      // await this.$store.commit("setStashInfo", res.data);
      this.$router.push({
        path: "/video-recording",
        query: {
          type: "001",
          tips: JSON.stringify([
            `请问你是${this.addForm.agentName}，身份证号码是${this.addForm.agentIdNo}本人，对吗？`,
            `确保您的权益谈话有录像请谅解，您介绍自己亲友姓名${this.addForm.userName}，身份证号码${this.addForm.userIdNo}，作为贷款人委托扬州万融商务咨询有限公司提供居间服务到银行或者机构办理贷款，您自愿按照合同约定代为支付亲友贷款的中介费用，费用为贷款总额的2%，我司是贷款中介公司不是银行提供的是中介服务。您支付的费用是我司给您朋友贷款的单纯中介费用，跟其他任何费用无关，对于合同内容您都正确理解，对于费用确认无误。并且愿意为此承担一切纠纷与责任，对吗？`,
            "面签已完成，非常感谢您的配合。"
          ])
        }
      });
    },
    confirmDate(value) {
      this.showCalendar = false;
      this.addForm.date = dayjs(value).format("YYYY-MM-DD ");
    }
  }
};
</script>

<style scoped lang="less">
.fee-confirm {
  padding-bottom: 40px;
  background: #ffffff;
}
.block-item {
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  padding: 0 42px;
  margin-top: 34px;
  background: #f5f5f5;
  font-size: 28px;
  font-weight: 600;
  color: #4d515b;
}
/deep/.van-field {
  position: relative;
  width: 670px;
  min-height: 96px;
  margin: 20px auto 0;
  border-radius: 16px;
  border: 2px solid #cccdd0;

  .rate {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    //top: -20px;
    top: -20px;
    bottom: -20px;
    right: -32px;
    width: 60px;
    background: #dbdbe1;
    border-radius: 0 16px 16px 0;
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: #dbdbe1;
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
  background: #3785fb;
  border-radius: 16px;
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
}
.tips {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  color: #ff0000;
  line-height: 24px;
}
</style>
