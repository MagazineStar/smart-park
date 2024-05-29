import router from '@/router/index'
import store from '@/store/index'
import asyncRoutes from './router/asyncRoutes'

// 白名单
const whiteList = ['/login', '/404']

// 获取一级权限标识
function getFirstPermission(permission) {
  const firstPerArr = permission.map(item => {
    return item.split(':')[0]
  })
  // 去重
  // Set 不能存重复的数据（去重）但是他不是一个真是的数组 需要用Array.from来转化成真是的数组
  return Array.from(new Set(firstPerArr))
}
// 获取二级权限标识
function getSecondPermission(permission) {
  const secondPerArr = permission.map(item => {
    const arr = item.split(':')
    return `${arr[0]}:${arr[1]}`
  })
  // 去重
  // Set 不能存重复的数据（去重）但是他不是一个真是的数组 需要用Array.from来转化成真是的数组
  return Array.from(new Set(secondPerArr))
}
// 根据一级权限标识和二级权限标识和动态路由进行筛选
function getRoutes(firstPermission, secondPermission, asyncRoutes) {
  // 判断当前登陆人是不是管理员， 如果是管理员就不进行筛选了
  if (firstPermission.includes('*')) {
    return asyncRoutes
  }
  const firstRoutes = asyncRoutes.filter(item => firstPermission.includes(item.permission))
  // console.log(firstRoutes)
  const routes = firstRoutes.map(item => {
    return {
      ...item,
      children: item.children.filter(child => secondPermission.includes(child.permission))
    }
  })
  return routes
}

router.beforeEach(async(to, from, next) => {
  // to: 准备跳转路由器
  // from: 从哪个路由器跳转来
  // next: 放行 next()  重定向 next(路径)
  const token = store.state.user.token
  if (token) {
    // 有token
    if (to.path === '/login') {
      next('/')
    } else {
      next()
      // 1.拿到用户权限信息
      const permission = await store.dispatch('menu/getUserPermission')
      // console.log('全部权限标识', permission)
      // 2.根据权限规则，筛选出对应的一级路由标识
      const firstPermission = getFirstPermission(permission)
      // console.log('一级路由标识', firstPermission)
      // 3.根据权限规则，筛选出对应的二级路由标识
      const secondPermission = getSecondPermission(permission)
      // console.log('二级路由标识', secondPermission)
      // 4.根据一级权限标识和二级权限标识和动态路由进行筛选
      const routes = getRoutes(firstPermission, secondPermission, asyncRoutes)
      // console.log(routes)
      // 5.把筛选后路由展示在左侧  router.addRoute() 一条一天添加
      // 5.1先把筛选之后的路由添加到路由对象中（跳转）
      routes.forEach(item => router.addRoute(item))
      // 5.2再把筛选之后的路由添加到Vuex中 （渲染）
      store.commit('menu/setMenuList', routes)
    }
  } else {
    // 没有token 数组.includes() 方法判断是否在白名单中
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
