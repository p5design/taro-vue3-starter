import Taro from "@tarojs/taro";
import $env from "@/biz/env";
import { getToken } from "@/biz/auth";
import { urlQuery } from "@/utils/common";
import { loginAuto } from "@/biz/wxuser";

// 基本url
export function getBaseUrl(url) {
  let BASE_URL = $env.apiBaseUrl;
  return BASE_URL;
}

// 显示加载提示
export function showLoading() {
  Taro.showNavigationBarLoading({});
}

// 关闭加载提示
export function hideLoading() {
  Taro.hideNavigationBarLoading({});
}

// 默认前置方法
export function handleOptions(options) {
  setTokenInHeader(options);
}

// 放置 queryString 中
export function setTokenInQueryString(options) {
  if (getToken()) {
    let _queryString = {};
    _queryString[$env.apiTokenName] = getToken();
    options.url = urlQuery(options.url, _queryString);
  }
}

// 放置 header 中
export function setTokenInHeader(options) {
  if (getToken()) {
    let _header = {};
    _header[$env.apiTokenName] = getToken();
    options.header = Object.assign(options.header || {}, _header);
  }
}

// 默认后置方法
export function handleReturn(respData) {
  return handleAjaxReturn(respData);
}

// 处理默认错误
export function isRespGood(respData) {
  // 非正常 http 返回, 200以上错误
  if (respData.status && respData.status > 200 && respData.msg) {
    return false;
  }
  return true;
}

// 处理返回结果
export function handleAjaxReturn(respData) {
  if (isRespGood(respData)) {
    // {
    //  "code": xxx,  #code不等于200都为失败
    //  "data": xxx , #data接口返回的数据，可能是对象也可能是列表，根据接口而定
    //  "message":xx  #message 接口异常时返回的信息
    // }
    if (respData.code == 0 || respData.code == 200) {
      return Promise.resolve(respData.data);
    } else {
      // 非200 给完整的返回结果
      // showErrorMsg("业务错误:" + respData.code, respData.msg);
      return Promise.resolve(respData);
    }
  }
  // 错误返回如何处理
  else {
    // 如果是token过期，则需要再次登录刷新token
    if (respData.status == 401) {
      loginAuto().then(() => {
        showErrorMsg("用户状态过期", "已刷新用户状态，请再次点击按钮发起请求");
      });
    }
    // 其他的则直接弹出提示框
    else {
      showErrorMsg(respData.msg, JSON.stringify(respData.data, null, 2));
    }
    Promise.resolve(null);
  }
}

export function showErrorMsg(title, content) {
  Taro.showModal({
    title,
    content,
    showCancel: false,
    success: function (res) {},
  });
}
