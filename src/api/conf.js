import errCode from "./error";
import $env from "@/biz/env";
import { getToken } from "@/biz/auth";

// 基本url
export function getBaseUrl(url) {
  let BASE_URL = $env.apiBaseUrl;
  return BASE_URL;
}

// 默认前置方法
export function handleOptions(options) {
  setTokenInHeaders();
}

// 放置 params 中
export function setTokenInParams(options) {
  let _params = {};
  _params[$env.apiTokenName] = getToken();
  options.params = Object.assign(options.params || {}, _params);
}

// 放置 headers 中
export function setTokenInHeaders(options) {
  let _headers = {};
  _headers[$env.apiTokenName] = getToken();
  options.headers = Object.assign(options.headers || {}, _headers);
}

// 默认后置方法
export function handleReturn(respData) {
  return handleAjaxReturn(respData);
}

export function handleAjaxReturn(respData) {
  // {
  //  "code": xxx,  #code不等于200都为失败
  //  "data": xxx , #data接口返回的数据，可能是对象也可能是列表，根据接口而定
  //  "message":xx  #message 接口异常时返回的信息
  // }
  if (respData.code == 0 || respData.code == 200) {
    return Promise.resolve(respData.data);
  } else {
    console.log("### resp-error ###\n%s", JSON.stringify(respData));
    return Promise.reject(respData.message);
  }
}
