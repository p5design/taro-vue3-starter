// 微信用户相关
import Taro from "@tarojs/taro";
import $store from "@/src/store";
import $api from "@/api/index";
import { isLogin, setLoginInfo, setTokenTmp } from "./auth";

// 未登录，调整授权页面
export function checkLoginStatus(toAuthPage) {
  if (!isLogin()) {
    if (toAuthPage) {
      Taro.navigateTo({
        url: "/packageUser/pages/authorization/index",
      });
    }
    return false;
  }
  return true;
}

// 小程序 登录获取code
export function getWXMALoginCode() {
  return new Promise((resolve) => {
    Taro.login().then((res) => {
      if (res.code) {
        resolve(res.code);
      } else {
        resolve(null);
      }
    });
  });
}

// 自动登录
export async function loginAuto(initData = false) {
  let code = await getWXMALoginCode();
  let data = await $api.wxma.login({ code });
  if (data) {
    if (data.code == "1400") {
      console.log("## login-auto ##\ntmp-token：%s", data.data);
      setTokenTmp(data.data);
    } else {
      console.log("## login-auto ##\ntoken：%s", data.token);
      setLoginInfo(data.token, data);
      if (initData) {
        // 加载初始化数据
        await loadInitData();
      }
      return true;
    }
  }
  return false;
}

// 加载初始化数据
export async function loadInitData() {}
