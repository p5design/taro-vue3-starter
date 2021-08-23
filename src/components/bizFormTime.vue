<template>
  <view>
    <AtListItem
      :title="title"
      :extraText="label || labelDft"
      :class="optClz"
      arrow="right"
      @click="showPicker"
    />
    <BizPickerTime
      :show="picker"
      @picker-change="onPickerSelect"
      @picker-close="picker = false"
    ></BizPickerTime>
  </view>
</template>

<script>
import $bus from "vue3-eventbus";
import Taro from "@tarojs/taro";
import { AtListItem } from "taro-ui-vue3";
import BizPickerTime from "@/components/bizPickerTime";

export default {
  components: {
    AtListItem,
    BizPickerTime,
  },
  emits: ["change"],
  props: {
    top: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "时间",
    },
    label: {
      type: String,
      default: "",
    },
    labelDft: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      picker: false,
    };
  },
  computed: {
    optClz() {
      return this.label != "" && this.label != this.labelDft ? "selected" : "";
    },
  },
  watch: {},
  methods: {
    showPicker() {
      this.picker = true;
    },
    onPickerSelect(data) {
      this.$emit("change", data);
    },
  },
  mounted() {},
  unmounted() {},
};
</script>

<style lang="scss"></style>
