// 提供一些常用 utility 方法

/**
 * 将参数转为 queryString 添加到 url 中
 * @param {*} url
 * @param {*} params
 * @returns
 */
export function urlQuery(url, params) {
  if (!params) {
    return url;
  }
  let qstr = params2Query(params);
  if (url.indexOf("?") !== -1) {
    return url + "&" + qstr;
  } else {
    return url + "?" + qstr;
  }
}

/**
 * 参数转换为 queryString 格式
 * @param {*} params
 * @returns
 */
export function params2Query(params = {}) {
  var qstr = Object.keys(params)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
  return qstr;
}

/**
 * 获取当前浏览器环境信息
 * @returns
 */
export function browserEnv() {
  var u = window.navigator.userAgent;
  var ua = window.navigator.userAgent.toLocaleLowerCase();
  let _reg_mobile = /iphone|android|symbianos|windows\sphone/g;
  let isMobile = _reg_mobile.test(ua);
  return {
    // mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
    mobile: isMobile, // 是否为移动终端
    pc: !isMobile, // 是否为桌面pc
    trident: u.indexOf("Trident") > -1, // IE内核
    presto: u.indexOf("Presto") > -1, // opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, // 火狐内核
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf("Android") > -1 || u.indexOf("Mac") > -1, // 安卓终端
    iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf("iPad") > -1, // 是否为iPad
    webApp: u.indexOf("Safari") == -1, // 是否web应用程序，没有头部与底部
    qqbrw: u.indexOf("MQQBrowser") > -1, // QQ浏览器
    qq: ua.match(/QQ/i) == "qq", // QQ
    tim: u.indexOf("MQQBrowser") > -1 && u.indexOf("TIM") > -1, // QQ的TIM
    alipay: u.indexOf("Alipay") > -1, // 支付宝
    dingding: u.indexOf("DingTalk") > -1, // 钉钉
    weixin: u.indexOf("MicroMessenger") > -1, // 微信
    weixinWork:
      u.indexOf("MicroMessenger") > -1 && ua.match(/wxwork/i) == "wxwork", // 微信
    weibo: ua.match(/WeiBo/i) == "weibo", // 微博
    ucLowEnd: u.indexOf("UCWEB7.") > -1, //
    ucSpecial: u.indexOf("rv:1.2.3.4") > -1,
    webview:
      !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) &&
      u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    ucweb: (function () {
      try {
        return (
          parseFloat(
            u
              .match(/ucweb\d+\.\d+/gi)
              .toString()
              .match(/\d+\.\d+/)
              .toString()
          ) >= 8.2
        );
      } catch (e) {
        if (u.indexOf("UC") > -1) {
          return true;
        }
        return false;
      }
    })(),
    Symbian: u.indexOf("Symbian") > -1,
    ucSB: u.indexOf("Firofox/1.") > -1,
  };
}
