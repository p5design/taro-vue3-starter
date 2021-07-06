
// tabbar图片
const tabRoot = "assets/images/app";
const tabPath = tabRoot + "/tab";
const tabSelPath = tabRoot + "/tab_sel";

// 测试
const test_api = 'pages/_test_api/index';
const test_component = 'pages/_test_component/index';

// 主包
const main_launcher = 'pages/launcher/index';
const main_tabpage1 = 'pages/tabpage1/index';
const main_tabpage2 = 'pages/tabpage2/index';
const main_tabpage3 = 'pages/tabpage3/index';
const main_tabpage4 = 'pages/tabpage4/index';

// 分包: role

export default {
  pages: [
    main_launcher,
    main_tabpage1,
    main_tabpage2,
    main_tabpage3,
    main_tabpage4,
    test_api,
    test_component,
  ],
  tabBar: {
    custom: true,
    color: "#cdcdcd",
    selectedColor: "#f9b336",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    list: [
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
        pagePath: main_tabpage3,
        text: "模块+",
        iconPath: tabRoot + "/tab_jump.png",
        selectedIconPath: tabRoot + "/tab_jump.png",
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
    ],
  },
  subpackages: [
  ],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: "#efefef",
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
