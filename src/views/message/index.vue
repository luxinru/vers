<template>
  <div class="fee-confirm">
    <app-nav-bar title="贷款责任与告知"></app-nav-bar>
    <van-form @submit="onSubmit">
      <div class="block-item">客户信息录入</div>
      <van-field
        v-model="addForm.userName"
        :label-width="0"
        :label="''"
        name="客户姓名"
        placeholder="客户姓名"
      />
      <van-field
        v-model="addForm.userIdNo"
        :label-width="0"
        :label="''"
        name="身份证号"
        placeholder="输入身份证号"
      />
      <van-field
        v-model="addForm.fee"
        :label-width="0"
        label="费用点数"
        name="费用点数"
        placeholder="费用点数"
      >
        <template #right-icon>
          <div class="rate">%</div>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
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
      <p class="tips">注：日期初始数字为当天日期，可手动修改</p>
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
import { formValidator } from "@/utils/validator";
import dayjs from "dayjs";
import moment from "moment";

export default {
  name: "message",
  
  components: { AppNavBar },

  data() {
    return {
      addForm: {
        userName: "",
        userIdNo: "",
        fee: "",
        date: dayjs().format("YYYY-MM-DD ")
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      showCalendar: false
    };
  },

  methods: {
    async onSubmit() {
      if (!formValidator(this.addForm)) return;
      const res = await Apis.notificationLoanLiability(this.addForm);
      await this.$store.commit("setStashInfo", res.data);

      this.$router.push({
        path: "/video-recording",
        query: {
          type: "002"
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
  height: 96px;
  margin: 20px auto 0;
  border-radius: 16px;
  border: 2px solid #cccdd0;

  .rate {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -20px;
    right: -32px;
    width: 60px;
    height: 96px;
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
