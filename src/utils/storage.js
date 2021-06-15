// 存储全局数据
// 自动对 对象 类型数据进行序列化/反序列化
import Taro from "@tarojs/taro";

export function set(key, value) {
  if (!key) {
    return;
  }
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  Taro.setStorageSync(key, value);
}

export function get(key) {
  var value = Taro.getStorageSync(key);
  if (!value) {
    return value;
  }
  if (value[0] === "{" || value[0] === "[") {
    value = JSON.parse(value);
  }
  return value;
}

export function remove(k) {
  Taro.removeStorageSync(k);
}

export function clear() {
  Taro.clearStorageSync();
}

export default {
  set,
  get,
  remove,
  clear,
};
