<template>
  <view class="index">
    <view class="user-info">
      <view>token: {{ token }}</view>
      <view>phone: {{ phone }}</view>
      <view>phone_verify: {{ phone_verify }}</view>
      <view>token_tmp: {{ token_tmp }}</view>
    </view>
    <view v-for="apiConf in apiTest" :key="apiConf.label">
      <AtButton
        v-if="!apiConf.type"
        type="primary"
        @click="testAPI(apiConf.func)"
        >{{ apiConf.label }}</AtButton
      >
      <!-- <AtButton
        v-else-if="apiConf.type == 'getPhoneNumber'"
        type="primary"
        openType="getPhoneNumber"
        @onGetPhoneNumber="onGetPhoneNumber"
        >{{ apiConf.label }}</AtButton
      > -->
      <button
        v-else-if="apiConf.type == 'getPhoneNumber'"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneInfo"
      >
        {{ apiConf.label }}
      </button>
      <button
        v-else-if="apiConf.type == 'getUserInfo'"
        open-type="getUserInfo"
        @getuserinfo="onGetUserInfo"
      >
        {{ apiConf.label }}
      </button>
      <button v-else>{{ "未定义：" + apiConf.label }}</button>
    </view>
    <!-- <AtButton type="primary" @click="testGetLoginCode">登录Code</AtButton>
    <AtButton type="primary" @click="testGetPhoneSmsCode"
      >获取手机验证码</AtButton
    >
    <AtButton type="primary" @click="testGame">所有游戏</AtButton>
    <AtButton type="primary" @click="testGameChannel">游戏渠道</AtButton>
    <AtButton type="primary" @click="testGameServer">游戏服</AtButton>
    <AtButton type="primary" @click="testGameTree">游戏区服Tree</AtButton>

    <AtButton type="primary" @click="testWOWCamp">WOW所有阵营</AtButton> -->
  </view>
</template>

<script>
import { AtButton } from "taro-ui-vue3";
import { getWXMALoginCode } from "@/biz/wxuser";
import { setToken } from "@/biz/auth";
import Taro from "@tarojs/taro";

export default {
  name: "Index",
  components: {
    AtButton,
  },
  data() {
    return {
      phone: "",
      phone_verify: "",
      token: "",
      token_tmp: "",
      gameId: "1261576379477065729",
      channelId: "1261578418298880001",
      serverId: "",
      phoneInfoEncryptedData: {},
      userInfoEncryptedData: {},
      apiTest: [
        {
          label: "登录Code",
          func: "testGetLoginCode",
        },
        // {
        //   label: "获取手机验证码",
        //   func: "testGetPhoneSmsCode",
        // },
        {
          label: "获取微信用户手机号",
          func: "getPhoneInfo",
          type: "getPhoneNumber",
        },
        {
          label: "获取微信用户信息",
          func: "getUserInfo",
          type: "getUserInfo",
        },
        {
          label: "绑定用户信息",
          func: "bindUserInfo",
        },
        {
          label: "所有游戏",
          func: "testGame",
        },
        {
          label: "游戏渠道",
          func: "testGameChannel",
        },
        {
          label: "游戏服",
          func: "testGameServer",
        },
        {
          label: "游戏Tree",
          func: "testGameTree",
        },
        {
          label: "WOW所有阵营",
          func: "testWOWCamp",
        },
        {
          label: "WOW获取副本",
          func: "testWOWDungeon",
        },
        {
          label: "WOW获取职业",
          func: "testWOWOccupation",
        },
        {
          label: "WOW获取种族",
          func: "testWOWRace",
        },
        {
          label: "创建团本",
          func: "testRaceCreate",
        },
        {
          label: "修改团本",
          func: "testRaceCreate",
        },
        {
          label: "获取团本详情",
          func: "testRaceCreate",
        },
        {
          label: "完成团本",
          func: "testRaceCreate",
        },
        {
          label: "解散团本",
          func: "testRaceCreate",
        },
      ],
    };
  },
  methods: {
    testAPI(func) {
      let fexec = this[func];
      if (fexec) {
        fexec();
      } else {
        Taro.showModal({
          title: "未找到方法",
          content: "方法名称：" + func,
        });
      }
    },
    testGetLoginCode() {
      getWXMALoginCode().then((code) => {
        this.$api.wxma.login({ code }).then((data) => {
          if (data) {
            if (data.code == "1400") {
              this.token_tmp = data.data;
              setToken(null);
            } else {
              this.token = data.token;
              setToken(this.token);
            }
          }
        });
      });
    },
    testGetPhoneSmsCode() {
      this.$api.base
        .smsCode({
          phone: this.phone,
          type: "1",
        })
        .then((data) => {
          console.log(JSON.stringify(data, null, 2));
          this.phone_verify = data.data;
        });
    },
    onGetPhoneInfo(e) {
      console.log(JSON.stringify(e.detail, null, 2));
      this.phoneInfoEncryptedData = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      };
    },
    onGetUserInfo(e) {
      console.log(JSON.stringify(e.detail, null, 2));
      this.userInfoEncryptedData = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        rawData: e.detail.rawData,
        signature: e.detail.signature,
      };
    },
    bindUserInfo() {
      this.$api.wxma
        .bind({
          tempToken: this.token_tmp,
          phoneInfoEncryptedData: this.phoneInfoEncryptedData,
          userInfoEncryptedData: this.userInfoEncryptedData,
        })
        .then((data) => {
          if (data) {
            console.log(JSON.stringify(data, null, 2));
          }
        });
      // }
    },
    testGame() {
      this.$api.game.game().then((data) => {
        console.log(JSON.stringify(data, null, 2));
        if (data && data.lenght > 0) {
          this.gameId = data[0].gameId;
        }
      });
    },
    testGameChannel() {
      this.$api.game.gameChannel({ gameId: this.gameId }).then((data) => {
        console.log(JSON.stringify(data, null, 2));
      });
    },
    testGameServer() {
      this.$api.game
        .gameServer({ gameId: this.gameId, channelId: this.channelId })
        .then((data) => {
          console.log(JSON.stringify(data, null, 2));
        });
    },
    testGameTree() {
      this.$api.game.gameTree({ gameId: this.gameId }).then((data) => {
        console.log(JSON.stringify(data, null, 2));
      });
    },
    testWOWCamp() {
      this.$api.wow.wowCamp({}).then((data) => {
        console.log(JSON.stringify(data, null, 2));
      });
    },
    testWOWDungeon() {
      this.$api.wow.wowDungeon({}).then((data) => {
        console.log(JSON.stringify(data, null, 2));
      });
    },
    testWOWOccupation() {
      this.$api.wow.wowOccupation({}).then((data) => {
        console.log(JSON.stringify(data, null, 2));
      });
    },
    testWOWRace() {
      this.$api.wow.wowRace({}).then((data) => {
        console.log(JSON.stringify(data, null, 2));
      });
    },
    testTaroRequest() {
      Taro.request({
        method: "get",
        url: "http://114.67.95.55:8087/api/wow/camp",
        header: {
          Authorization: "0951c3bb70c54384be7b2aa13dfffff8",
        },
        baseURL: "",
      }).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    },
    testTaroRequest2() {
      Taro.request({
        method: "get",
        url: "http://114.67.95.55:8087/api/wow/camp",
        header: {
          Authorization: "401",
        },
        baseURL: "",
      }).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    },
  },
};
</script>

<style lang="scss"></style>
