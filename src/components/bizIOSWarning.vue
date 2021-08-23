<template>
  <AtModal :isOpened="showModal" @close="hide">
    <AtModalHeader>{{ title }}</AtModalHeader>
    <AtModalContent>{{ content }}</AtModalContent>
    <AtModalAction>
      <AtButton type="primary" size="small" openType="contact"
        >联系客服</AtButton
      >
    </AtModalAction>
  </AtModal>
</template>

<script>
import Taro from "@tarojs/taro";
import {
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
} from "taro-ui-vue3";

export default {
  components: {
    AtButton,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
  },
  emits: [],
  props: {
    title: {
      type: String,
      default: "重要提示",
    },
    content: {
      type: String,
      default: "由于相关规范，iOS端功能暂不可用。如有疑问，请联系在线客服。",
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    show() {
      console.log("show-ioswarning");
      this.showModal = true;
    },
    hide() {
      console.log("hide-ioswarning");
      this.showModal = false;
    },
  },
  mounted() {},
  unmounted() {},
};
</script>

<style lang="scss"></style>
