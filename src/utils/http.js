// 常用网络请求封装
import merge from "deepmerge";
import $request from "./request";

let http = {};

// GET
http.get = (url, params = {}, options = {}) => {
  return $request(
    merge(
      {
        method: "GET",
        url,
        params,
      },
      options
    )
  );
};

// POST 默认JSON
http.post = (url, params = {}, options = {}) => {
  return $request(
    merge(
      {
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: params,
      },
      options
    )
  );
};

http.postJson = (url, params = {}, options = {}) => {
  return http.post(url, params, options);
};

// POST form格式
http.postForm = (url, params = {}, options = {}) => {
  return $request(
    merge(
      {
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        data: params,
      },
      options
    )
  );
};

// PUT
http.put = (url, params = {}, options = {}) => {
  return $request(
    merge(
      {
        method: "PUT",
        url,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: params,
      },
      options
    )
  );
};

// 文件上传
http.uploadFile = (url, params = {}, options = {}) => {
  let data = params.data;
  delete params.data;
  return $request(
    merge(
      {
        method: "POST",
        url,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params,
        data,
      },
      options
    )
  );
};

//  文件上传，直接写body
http.uploadBody = (url, params = {}, options = {}) => {
  let data = params.data;
  delete params.data;
  let reqParams = merge(
    {
      method: "POST",
      url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params,
    },
    options
  );
  reqParams.data = data;
  return $request(reqParams);
};

export default http;
