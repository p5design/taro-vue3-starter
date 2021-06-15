<template>
  <view class="index">
    <view v-for="apiConf in apiTest" :key="apiConf.label">
      <button type="primary" @click="testAPI(apiConf.func)">
        {{ apiConf.label }}
      </button>
    </view>
  </view>
</template>

<script>
import { getLoginCode } from "@/biz/wxma";

export default {
  name: "Index",
  components: {
    AtButton,
  },
  data() {
    return {
      token: "",
      gameId: "1003",
      channelId: "45",
      serverId: "",
      apiTest: [
        {
          label: "登录Code",
          func: "testGetLoginCode",
        },
        {
          label: "获取手机验证码",
          func: "testGetPhoneSmsCode",
        },
      ],
    };
  },
  methods: {
    testAPI(func) {
      this[func]();
    },
    testGetLoginCode() {
      getLoginCode().then((code) => {
        console.log("wxma-code:" + code);
        this.$api.wxma.login({ code }).then((data) => {
          console.log(JSON.stringify(data, null, 2));
        });
      });
    },
    testGetPhoneSmsCode() {
      this.$api.base
        .smsCode({
          phone: "18506419566",
          type: "1",
        })
        .then((data) => {
          console.log(JSON.stringify(data, null, 2));
        });
    },
  },
};
</script>

<style></style>
