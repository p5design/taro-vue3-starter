import Taro from "@tarojs/taro";
let tabList = require("../custom-tab-bar/conf");

/**
 * 激活自定义 tabbar 的状态
 *
 * @param {function} callback
 */
export function activeTabbarItem(callback) {
  let currPath = Taro.Current.router.path;
  console.log("currPath: " + currPath);
  for (let i = 0; i < tabList.length; i++) {
    if (tabList[i].pagePath === currPath) {
      let currPage = Taro.getCurrentPages()[0];
      if (currPage.getTabBar) {
        currPage.getTabBar().setData({
          selected: i,
        });
      } else {
        console.log("# not-support: getTabBar #");
      }
      // 其他逻辑...
      callback && callback();
    }
  }
}
