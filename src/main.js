// 导入Vue构造函数
import Vue from 'vue'
// 类似于reset.css 清除浏览器默认样式
import 'normalize.css/normalize.css'
// 引入Element-ui组件库
import ElementUI from 'element-ui'
// 引入Element-ui组件库的样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 引入样式文件
import '@/styles/index.scss' // global css

// 引入App跟组件
import App from './App'

// 引入Vuex
import store from './store'

// 引入Vue-Router
import router from './router'

// 注册svg
import '@/icons'

// 导入permission.js
// import 除了导入某个成员之外 还可以执行导入的文件
import './permission'

// 导入全局自定义指令
import '@/directive/index'

// 导入微前端配置
import '@/registerMicroApp.js'

// 结果：把Element-ui中到处的所有组件 注册成全局组件
Vue.use(ElementUI)

// 上线后如果有警告 要不要展示
Vue.config.productionTip = false
console.log('VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)

// vue实例化
// 注入 router和store实例 方便在项目中使用 this.$router this.$store
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
