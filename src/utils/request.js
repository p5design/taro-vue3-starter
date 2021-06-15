// 网络请求封装
import Taro from "@tarojs/taro";
import qs from "qs";
import { urlQuery } from "@/utils/common";

// 检查响应状态
function checkStatus(response) {
  const status = response.statusCode || -1000; // -1000 自己定义，连接错误的status
  // const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  } else {
    let errorInfo = "";
    switch (status) {
      case -1:
        errorInfo = "远程服务响应失败,请稍后重试";
        break;
      case 400:
        errorInfo = "400：错误请求";
        break;
      case 401:
        errorInfo = "401：访问令牌无效或已过期";
        break;
      case 403:
        errorInfo = "403：拒绝访问";
        break;
      case 404:
        errorInfo = "404：资源不存在";
        break;
      case 405:
        errorInfo = "405：请求方法未允许";
        break;
      case 408:
        errorInfo = "408：请求超时";
        break;
      case 500:
        errorInfo = "500：访问服务失败";
        break;
      case 501:
        errorInfo = "501：未实现";
        break;
      case 502:
        errorInfo = "502：无效网关";
        break;
      case 503:
        errorInfo = "503：服务不可用";
        break;
      default:
        errorInfo = `连接错误`;
    }
    return {
      status,
      msg: errorInfo,
      data: response.data,
    };
  }
}

// 请求与响应
const httpInterceptor = (chain) => {
  const config = chain.requestParams;
  // 在发送请求之前做处理...
  config.method = config.method.toUpperCase();

  config.headers = Object.assign(
    config.method === "GET"
      ? {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        }
      : {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    config.headers
  );

  if (config.method === "POST") {
    const contentType = config.headers["Content-Type"];
    // 根据Content-Type转换data格式
    if (contentType) {
      if (contentType.includes("multipart")) {
        // 类型 'multipart/form-data;'
        // config.data = data;
      } else if (contentType.includes("json")) {
        // 类型 'application/json;'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data);
      } else {
        // 类型 'application/x-www-form-urlencoded;'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = qs.stringify(config.data);
      }
    }
  }

  // 如果是get方法，把参数加到querySting中
  // config.url = urlQuery(config.url, config.params);
  if (config.method === "GET") {
    config.url = urlQuery(config.url, config.params);
  }

  let contentType = "application/json";
  contentType = config.contentType || contentType;
  const options = {
    url: config.baseURL + config.url,
    data: config.data,
    method: config.method,
    header: {
      "content-type": contentType,
    },
  };

  // console.log("### req-options ###\n%s", JSON.stringify(options, null, 2));

  return chain.proceed(options).then((response) => {
    return Promise.resolve(checkStatus(response));
  });
};
Taro.addInterceptor(httpInterceptor);

// 发起请求
const request = async function (params) {
  const requestTask = Taro.request(params);
  const res = await requestTask;
  return res;
};

export default request;
