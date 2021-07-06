const path = require("path");
const config = {
  projectName: "p5d-taro-vue3",
  date: "2021-6-11",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  alias: {
    "@/src": path.resolve(__dirname, "..", "src"),
    "@/api": path.resolve(__dirname, "..", "src/api"),
    "@/biz": path.resolve(__dirname, "..", "src/biz"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/composables": path.resolve(__dirname, "..", "src/composables"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/images": path.resolve(__dirname, "..", "src/assets/images"),
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "vue3",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    esnextModules: ["taro-ui-vue3"],
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    webpackChain(chain) {
      chain.resolve.alias.set(
        "@tarojs/components$",
        "@tarojs/components/dist-h5/vue3/index.js"
      );
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
