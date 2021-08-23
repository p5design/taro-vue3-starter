import { createApp } from 'vue'
import $bus from 'vue3-eventbus'
import $store from './store'
import $api from "@/api/index"
import { timeout } from "@/utils/common"
import { toast, alert } from "@/biz/tarox"
import './app.scss'


const App = createApp({
  onShow () {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use($store)
App.use($bus)
App.config.globalProperties.$api = $api
App.config.globalProperties.$timeout = timeout
App.config.globalProperties.$dialog = {
  toast,
  alert
}

export default App
