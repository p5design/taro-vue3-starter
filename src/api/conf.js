import { createBaseConf } from "taro-api";
import Taro from "@tarojs/taro";
import $env from "@/biz/env";
import { getToken } from "@/biz/auth";

function showErrorMsg(title, content, callback) {
  Taro.showModal({
    title,
    content,
    showCancel: false,
    success: function (res) {
      callback && callback();
    },
  });
}

// 1. 创建基本配置
let baseConf = createBaseConf($env.apiBaseUrl, $env.apiTokenName, getToken);

baseConf.handleReturn = (respData) => {
  if (!(respData.status && respData.status > 200 && respData.msg)) {
    // {
    //  "code": xxx,  #code不等于200都为失败
    //  "data": xxx , #data接口返回的数据，可能是对象也可能是列表，根据接口而定
    //  "message":xx  #message 接口异常时返回的信息
    // }
    if (respData.code == 0 || respData.code == 200) {
      return Promise.resolve(respData.data);
    } else {
      // 非200 给完整的返回结果
      showErrorMsg("业务错误:" + respData.code, respData.msg);
      return Promise.reject(respData);
    }
  }
  // 错误返回如何处理
  else {
    // 如果是token过期，则需要再次登录刷新token
    if (respData.status == 401) {
      showErrorMsg("用户状态过期", "请点击确认重新登录", function () {
        Taro.reLaunch({
          url: "/pages/launcher/index",
        });
      });
    }
    // 其他的则直接弹出提示框
    else {
      // showErrorMsg(respData.msg, JSON.stringify(respData.data, null, 2));
      showErrorMsg(respData.msg, "内部错误，请稍后再尝试");
    }
    Promise.resolve(null);
  }
};

export default baseConf;
