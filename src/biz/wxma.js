import Taro from "@tarojs/taro";

// 微信登录获取code
export function getLoginCode() {
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

// 授权获取电话号码
export function getPhoneNumber(e) {}
