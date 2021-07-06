// 其他图片必须走url
const ROOT_PATH = "http://proj-miniapp-wow.pangwu86.com";
const LOCAL_ROOT_PATH = "/assets/images";

// 通用包
const APP_PATH = ROOT_PATH + "/app";
const COMMON_PATH = ROOT_PATH + "/common";

// 业务包
const PKG_MAIN = ROOT_PATH + "/packages/main";

const _app = {
  avatar: APP_PATH + "/avatar_default.jpg",
};

// 本地图片
import launcher_logo from "@/images/packages/main/launcher_logo.png";

// 通用图片
const _com = {};

// 页面使用图片
const packages = {
  main: {
    launcher_logo: launcher_logo,
  },
};

const assetsImage = Object.assign(
  {
    _app,
    _com,
  },
  packages
);
export default assetsImage;
