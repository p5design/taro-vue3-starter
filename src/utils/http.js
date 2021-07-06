// 常用网络请求封装
import merge from "deepmerge";
import $request from "./request";
import Taro from "@tarojs/taro";

let http = {};

// GET
http.get = (url, params, options) => {
  return $request(
    merge(
      {
        method: "GET",
        url,
        params,
        header: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      },
      options
    )
  );
};

// DELETE
http.delete = (url, params, options) => {
  return $request(
    merge(
      {
        method: "DELETE",
        url,
        params,
        header: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      },
      options
    )
  );
};

// POST 默认JSON
http.post = (url, params, options) => {
  return http.postJson(url, params, options);
};

// POST json格式
http.postJson = (url, params, options) => {
  return $request(
    merge(
      {
        method: "POST",
        url,
        header: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: params,
      },
      options
    )
  );
};

// POST form格式
http.postForm = (url, params, options) => {
  return $request(
    merge(
      {
        method: "POST",
        url,
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        data: params,
      },
      options
    )
  );
};

// PUT
http.put = (url, params, options) => {
  return $request(
    merge(
      {
        method: "PUT",
        url,
        header: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: params,
      },
      options
    )
  );
};

// 单个文件上传 仅支持 Taro.uploadFile 接口
// 参考文档 https://nervjs.github.io/taro/docs/apis/network/upload/uploadFile
http.uploadFile = (url, params, options) => {
  return new Promise((resolve) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(function (res) {
      const tempFilePaths = res.tempFilePaths;
      // TODO fix url
      Taro.uploadFile({
        url,
        filePath: tempFilePaths[0],
        name: "file",
        formData: params,
      }).then(function (res) {
        const data = res.data;
        resolve(data);
      });
    });
  });
};

export default http;
