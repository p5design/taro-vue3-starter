<template>
  <view class="vm-page bg-efefef vh">
    <view
      class="
        launcher-container
        at-row at-row__direction--column at-row__justify--between
      "
    >
      <view class="launcher-info">
        <view class="logo">
          <image
            :src="$assetsImage.main.launcher_logo"
            mode="widthFix"
            alt=""
          />
        </view>
      </view>
      <view class="launcher-loading">
        <AtActivityIndicator
          :size="36"
          mode="center"
          content="数据加载中..."
          :color="$env.appMainColor"
        ></AtActivityIndicator>
      </view>
    </view>
  </view>
</template>

<script>
import Taro, { getCurrentInstance } from "@tarojs/taro";
import $env from "@/biz/env";
import $assetsImage from "@/images";
import { loginAuto } from "@/biz/wxuser";
import { AtActivityIndicator } from "taro-ui-vue3";

export default {
  name: "Index",
  components: {
    AtActivityIndicator,
  },
  data() {
    return {
      $env,
      $assetsImage,
    };
  },
  methods: {},
  mounted() {},
  onReady() {
    let params = getCurrentInstance().router.params;
    this.$timeout(1200).then(() => {
      Taro.switchTab({ url: "/pages/tabpage1/index" });
    });
  },
};
</script>

<style lang="scss">
.launcher-container {
  height: 100vh;
  background-color: #000;
  padding: 30% 0 15% 0;
  color: #f9b336;

  .launcher-info {
    text-align: center;
    font-size: 36px;
    font-weight: bold;

    .logo {
      margin: 20px auto;
    }
  }

  .launcher-loading {
    text-align: center;
    position: relative;
  }
}
</style>
