import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 1.存放数据
  // state: {},
  // 2.修改state中的数据（唯一入口）
  // mutations: {},
  // 3.调用异步方法，异步接口
  // actions: {},
  // 4.类似于计算属性，依赖state中的数据，进行计算新的数据
  // getters: {},
  // 组合模块的配置项（分模块）
  modules: {
    user,
    menu
  }
})

export default store
