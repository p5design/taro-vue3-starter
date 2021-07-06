<template>
  <view class="vm-page bg-efefef vh">
    <view>模块3</view>
  </view>
</template>

<script>
import { activeTabbarItem } from "@/biz/tabbar";
export default {
  name: "Index",
  components: {},
  methods: {},
  mounted() {
    activeTabbarItem();
  },
};
</script>

<style lang="scss"></style>
