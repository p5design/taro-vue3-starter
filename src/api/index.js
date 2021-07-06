// 基于 http 与 urlConf 创建的 api 接口
import $http from "@/utils/http";
import { getBaseUrl, showLoading, hideLoading } from "./conf";

// 创建 urlConf
const createUrlConf = () => {
  // 读取 module 信息
  const modulesFiles = require.context("./modules", true, /\.js$/);
  const modules = modulesFiles.keys().reduce((_modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    _modules[moduleName] = value.default;
    return _modules;
  }, {});

  // 整合成一个 urlConf
  // const urlConf = {};
  // for (let m in modules) {
  //   let moduleConf = modules[m];
  //   Object.assign(urlConf, moduleConf);
  // }
  // return urlConf;
  return modules;
};
// 创建 API
const createAPI = (urlConf) => {
  const api = {};
  // 遍历并初始化接口配置
  for (let [moduleName, moduleConf] of Object.entries(urlConf)) {
    api[moduleName] = {};
    let currModule = api[moduleName];
    for (let [nm, uc] of Object.entries(moduleConf)) {
      currModule[nm] = function (params, options = {}) {
        try {
          // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
          options.baseURL = uc.baseURL || getBaseUrl(uc.url);
          uc.baseURL = options.baseURL;
          uc.method = uc.method || "get";

          // 显示加载提示
          if (uc.showLoading) {
            showLoading();
          }

          // 前置处理
          if (uc.before) {
            uc.before.call(this, options);
          }

          // 如果是自定义方法，直接调用
          if (typeof uc.method == "function") {
            // 因为不走axios, url需要拼接
            return uc.method.call(uc, params, options);
          }

          // 处理请求
          let handleFunction = $http[uc.method];
          const reqReturn = handleFunction(uc.url, params, options);

          // 隐藏加载提示
          if (uc.showLoading) {
            hideLoading();
          }

          // 后置处理
          if (uc.after) {
            let curr = this;
            return reqReturn.then((respData) => {
              return uc.after.call(curr, respData);
            });
          } else {
            return reqReturn;
          }
        } catch (err) {
          console.log("## api-error ##\n%s", JSON.stringify(err));
        }
      };
    }
  }

  return api;
};

// 初始化 API 实例
const urlConf = createUrlConf();
const api = createAPI(urlConf);

export default api;
