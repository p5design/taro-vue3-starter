<template>
  <AtFloatLayout
    class="vm-picker-popup"
    :class="{ 'pos-top': top }"
    :isOpened="show"
    :title="title"
    @close="closePicker"
  >
    <view class="vm-picker-popup-container">
      <view class="at-row">
        <view
          :class="layoutClz(lyVal)"
          v-for="(lyVal, lyIdx) in layoutList"
          :key="'ly' + lyIdx"
        >
          <AtList>
            <AtListItem
              :title="selectLabel(lyIdx, selOption)"
              v-for="(selOption, selIdx) in selectList[lyIdx]"
              :key="lyIdx + '_' + selIdx"
              @click="chooseSelect(lyIdx, selIdx)"
              :arrow="moreSelect(lyIdx, selIdx)"
              :class="selectClz(lyIdx, selIdx)"
            />
          </AtList>
        </view>
      </view>
    </view>
  </AtFloatLayout>
</template>

<script>
import $bus from "vue3-eventbus";
import Taro from "@tarojs/taro";
import { AtFloatLayout, AtList, AtListItem } from "taro-ui-vue3";

export default {
  components: {
    AtFloatLayout,
    AtList,
    AtListItem,
  },
  emits: ["pickerClose", "pickerReset", "pickerChange"],
  props: {
    title: {
      type: String,
      default: "请选择",
    },
    show: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    layoutList: {
      type: Array,
      default() {
        return [12];
      },
    },
    selectIndex: {
      type: Array,
      default() {
        return [0];
      },
    },
    selectList: {
      type: Array,
      default() {
        return [["候选项1", "候选项2", "候选项3"]];
      },
    },
    selectConf: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selectChange: false,
      selectListLast: [],
      selectIndexLast: [],
    };
  },
  watch: {
    show(nval) {
      if (nval) {
        this.showPicker();
      }
    },
  },
  methods: {
    layoutClz(lyVal) {
      let atVal = {};
      atVal["at-col-" + lyVal] = true;
      return atVal;
    },
    selectLabel(lyIdx, selOption) {
      if (typeof selOption === "string" || typeof selOption === "number") {
        return selOption;
      }
      let optConf = this.selectConf[lyIdx];
      return selOption[optConf.label];
    },
    showPicker() {
      this.selectChange = false;
      this.selectListLast = [...this.selectList];
      this.selectIndexLast = [...this.selectIndex];
    },
    closePicker() {
      if (!this.selectChange) {
        // 恢复picker内容
        let selectList = [...this.selectListLast];
        let selectIndex = [...this.selectIndexLast];
        // $bus.emit("pickerReset", {  selectList, selectIndex });
        this.$emit("pickerReset", { selectList, selectIndex });
      }
      this.$emit("pickerClose");
    },
    isLastSelect(lyIdx) {
      let lyLen = this.layoutList.length;
      return lyIdx == lyLen - 1;
    },
    moreSelect(lyIdx, selIdx) {
      if (!this.isLastSelect(lyIdx)) {
        if (this.selectIndex.length > 0) {
          if (selIdx == this.selectIndex[lyIdx]) {
            return "right";
          }
        }
      }
      return "";
    },
    selectClz(lyIdx, selIdx) {
      let clz = {};
      if (this.selectIndex.length > 0) {
        if (this.selectIndex[lyIdx] == selIdx) {
          clz["active-select"] = true;
        }
      }
      return clz;
    },
    chooseSelect(lyIdx, selIdx) {
      let action = "switch";
      if (this.isLastSelect(lyIdx)) {
        action = "change";
        this.selectChange = true;
      }
      // $bus.emit("pickerChange", {  action, lyIdx, selIdx });
      this.$emit("pickerChange", { action, lyIdx, selIdx });
      if (action == "change") {
        this.closePicker();
      }
    },
  },
  mounted() {},
  unmounted() {},
};
</script>

<style lang="scss">
.vm-picker-popup {
  z-index: 5000;

  &.pos-top {
    .at-float-layout__container {
      bottom: auto;
      top: 0;
    }
  }

  .layout-header__title {
    padding-bottom: 0;
  }

  .at-list::after {
    display: none;
  }

  .at-list__item {
    padding: 12px 24px;
  }

  .active-select {
    color: #f9b336;
  }
}
</style>
