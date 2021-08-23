// 基于 Taro 接口封装的一些辅助方法
import Taro from "@tarojs/taro";
import { set, get, remove } from "@/utils/storage";
let tabList = require("../custom-tab-bar/conf");

/**
 * 激活自定义 tabbar 的状态
 *
 * @param {function} callback
 */
export function activeTabbarItem(callback) {
  let currPath = Taro.Current.router.path;
  for (let i = 0; i < tabList.length; i++) {
    if (tabList[i].pagePath === currPath) {
      let currPage = Taro.getCurrentPages()[0];
      if (currPage.getTabBar()) {
        let tBar = currPage.getTabBar();
        tBar.setData &&
          tBar.setData({
            selected: i,
          });
        console.log("# switch-tabbar %d #", i);
      } else {
        console.log("# not-support: getTabBar #");
      }
      // 其他逻辑...
      callback && callback();
    }
  }
}

/**
 * toast 支持消失时回调函数
 *
 * @param {*} params
 * @param {*} callback
 */
export function toast(params, callback) {
  Taro.showToast(params);
  if (params.duration && callback) {
    setTimeout(callback, params.duration);
  }
}

/**
 * alert 弹出提示
 *
 * @param {*} content
 * @param {*} callback
 */
export function alert(content, callback) {
  Taro.showModal({
    title: "提示",
    content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        callback && callback();
      }
    },
  });
}

/**
 * 返回上一页并设置某个返回值
 *
 * @param {*} data
 */
export function navigateBack(data) {
  let pages = Taro.getCurrentPages(); // 获取当前的页面栈
  let prevPage = pages[pages.length - 2]; //  获取上一页面
  prevPage.setData(data);
  Taro.navigateBack({
    delta: 1,
  });
}

/**
 *
 * @returns 上一页返回的内容
 */
export function getNavigateBackData() {
  let pages = Taro.getCurrentPages();
  let currPage = pages[pages.length - 1]; // 获取当前页面
  let data = currPage.__data__;
  return data;
}

const NAVI_PAGE = "navigate_page";

/**
 * 设置跳转页面信息
 *
 * @param {*} pagePath
 * @param {*} pageIntro
 * @param {*} isTab
 */
export function naviPage(pagePath, pageIntro = "", isTab = false) {
  set(NAVI_PAGE, {
    pagePath,
    pageIntro,
    isTab,
  });
}

export function getNaviPageData() {
  let np = get(NAVI_PAGE);
  remove(NAVI_PAGE);
  return np;
}

export function systemInfo() {
  return Taro.getSystemInfoSync({});
}

export function isIOS() {
  let sysInfo = systemInfo();
  if (sysInfo.model.indexOf("iP") != -1) {
    return true;
  }
  return false;
}

/**
 * 自动检查版本，提示更新
 */
export function appAutoUpdate() {
  const updateManager = Taro.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    console.log("app-for-update: " + res.hasUpdate);
  });
  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: function (res) {
        if (res.confirm) {
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(function () {
    Taro.showModal({
      title: "更新提示",
      content: "新版本上线了，请删除当前小程序，重新搜索打开新版",
    });
  });
}

/**
 * 显示分享餐单按钮
 */
export function showShareMenu() {
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
}
