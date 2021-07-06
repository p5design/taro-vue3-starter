const tabRoot = "/assets/images/app";
const tabPath = tabRoot + "/tab";
const tabSelPath = tabRoot + "/tab_sel";

// 主包
const main_tabpage1 = "pages/tabpage1/index";
const main_tabpage2 = "pages/tabpage2/index";
const main_tabpage3 = "pages/tabpage3/index";
const main_tabpage4 = "pages/tabpage4/index";

const test_component = "pages/_test_component/index";

const tabList = [
  {
    pagePath: main_tabpage1,
    text: "模块1",
    iconPath: tabPath + "/tab0.png",
    selectedIconPath: tabSelPath + "/tab0.png",
  },
  {
    pagePath: main_tabpage2,
    text: "模块2",
    iconPath: tabPath + "/tab1.png",
    selectedIconPath: tabSelPath + "/tab1.png",
  },
  {
    pagePath: test_component,
    text: "添加",
    iconPath: tabRoot + "/tab_jump.png",
    isJump: true,
  },
  {
    pagePath: main_tabpage3,
    text: "模块3",
    iconPath: tabPath + "/tab2.png",
    selectedIconPath: tabSelPath + "/tab2.png",
  },
  {
    pagePath: main_tabpage4,
    text: "模块4",
    iconPath: tabPath + "/tab3.png",
    selectedIconPath: tabSelPath + "/tab3.png",
  },
];

module.exports = tabList;
module.exports.default = tabList;
