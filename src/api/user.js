// request 就是axios创建出来的实例 (默认导出可以命名随意)
import request from '@/utils/request'

// 登录函数
// export导出的目的就是让组件使用
/**
 * @description: 登录函数
 * @param {*} data { mobile,password }
 * @return {*} promise
 */

export function loginAPI(data) {
  // return request.post('/park/login', data)
  // request返回的是一个Promise结果
  return request({
    url: '/park/login',
    method: 'POST',
    data
  })
}

/**
 * @description: 获取用户信息
 * @param {*} data {}
 * @return {*} promise
 */
export function getProfileAPI() {
  return request({
    url: '/park/user/profile',
    method: 'GET'
  })
}
