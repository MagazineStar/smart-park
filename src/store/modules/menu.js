import { getProfileAPI } from '@/api/user'
// 导入动态路由
// import asyncRoutes from '@/router/asyncRoutes'
// 导入静态路由, 和清空路由方法
import { routes, resetRouter } from '@/router/index'
export default {
  namespaced: true,
  state: {
    // 储存权限标识
    permission: [],
    // 路由规则
    menuList: []
  },
  mutations: {
    // 修改state中数据的唯一方法
    setPermission(state, newPermission) {
      state.permission = newPermission
    },
    // 修改路由规则
    setMenuList(state, asyncRoutes) {
      state.menuList = [...routes, ...asyncRoutes]
    },
    // 清空路由方法
    clearMenuList(state) {
      state.menuList = []
      resetRouter()
    }
  },
  actions: {
    // 调用异步方法
    async getUserPermission(store) {
      const res = await getProfileAPI()
      // console.log(res)
      store.commit('setPermission', res.data.permissions)
      return res.data.permissions
    }
  },
  getters: {
    // 计算属性
  }
}
