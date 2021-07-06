// 网络请求封装
import Taro from "@tarojs/taro";
import qs from "qs";
import { urlQuery, stringTemplate } from "@/utils/common";

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

  // 处理请求类型
  config.method = config.method.toUpperCase();

  // 处理 URL
  if (config.baseURL) {
    config.url = config.baseURL + config.url;
  }

  // 处理 RESTful 格式参数
  if (config.url.includes("{") && config.url.includes("}")) {
    let urlWithParams = stringTemplate(config.url, config.params);
    config.url = urlWithParams;
    delete config.params;
  }

  // GET/DELETE/HEAD 请求，参数放到 url 中
  if (
    config.method === "GET" ||
    config.method === "DELETE" ||
    config.method === "HEAD"
  ) {
    if (config.params) {
      config.url = urlQuery(config.url, config.params);
    }
  }

  // POST/PUT 请求， data参数的格式处理
  if (config.method === "POST" || config.method === "PUT") {
    const contentType =
      config.header &&
      (config.header["Content-Type"] || config.header["content-type"]);
    // 根据Content-Type转换data格式
    if (contentType && typeof config.data === "object") {
      if (contentType.includes("multipart")) {
        // 类型 'multipart/form-data;'
        // config.data = data;
      } else if (contentType.includes("json")) {
        // 类型 'application/json;'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data);
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        // 类型 'application/x-www-form-urlencoded;'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = qs.stringify(config.data);
      }
    }
  }

  // 继续处理
  return chain.proceed(config).then((resp) => {
    return Promise.resolve(checkStatus(resp));
  });
};
Taro.addInterceptor(httpInterceptor);

// 发起请求
const request = async function (options) {
  const requestTask = Taro.request(options);
  const resp = await requestTask;
  return resp;
};

export default request;
