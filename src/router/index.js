import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import asyncRoutes from './asyncRoutes'

export const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench'
  },
  {
    path: '/workbench',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/Workbench/index'),
      meta: { title: '工作台', icon: 'el-icon-data-board' }
    }]
  },
  {
    path: '/checkEnterprise/:id',
    component: () => import('@/views/Park/Enterprise/checkEnterprise')
  },
  {
    path: '/car/addMonthCard',
    component: () => import('@/views/Car/CarCard/addMonthCard')
  },
  {
    path: '/car/checkMonthCard',
    component: () => import('@/views/Car/CarCard/checkMonthCard')
  },
  {
    path: '/addEnterprise',
    component: () => import('@/views/Park/Enterprise/addEnterprise')
  },
  {
    path: '/sys/addRole',
    component: () => import('@/views/System/Role/AddRole')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

// 通过箭头函数 创建Router实例
const createRouter = () => new Router({
  // mode: 'history', // require service support
  // 示路由模式为history模式，需要后端服务的支持。
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
  // routes: [...routes, ...asyncRoutes]
})

const router = createRouter()

// 重置路由方法
export function resetRouter() {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher
}

export default router
