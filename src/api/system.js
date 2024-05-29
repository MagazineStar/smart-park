import request from '@/utils/request'
/**
 * 查询所有角色
 * @returns
 */
export function getRoleListAPI() {
  return request({
    url: '/park/sys/role',
    method: 'GET'
  })
}
/**
 * 获取tree权限列表
 * @returns
 */
export function getTreeListAPI() {
  return request({
    url: '/park/sys/permision/all/tree',
    method: 'GET'
  })
}
/**
 * 获取当前角色权限
 * @param {} roleId
 * @returns
 */
export function getRoleDetailAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`,
    method: 'GET'
  })
}
/**
 * 查询角色关联的用户列表
 * @param {*} roleId
 * @param {*} params
 * @returns
 */
export function getRoleUserListAPI(roleId, params) {
  return request({
    url: `/park/sys/roleUser/${roleId}`,
    method: 'GET',
    params
  })
}
/**
 * 创建角色
 * @returns
 */
export function createRoleUserAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'POST',
    data
  })
}
/**
 * 更改角色
 * @returns
 */
export function updateRoleAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'PUT',
    data
  })
}
/**
 * 删除角色
 * @returns
 */
export function delRoleUserAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`,
    method: 'DELETE'
  })
}
/**
 * 获取员工列表
 * @param { page, pageSize} params
 * @returns
 */
export function getEmployeeListAPI(params) {
  return request({
    url: '/park/sys/user',
    params
  })
}
/**
 * 添加员工
 * @returns
 */
export function createEmployeeAPI(data) {
  return request({
    url: `/park/sys/user`,
    method: 'POST',
    data
  })
}
/**
 * 删除员工
 * @returns
 */
export function delEmployeeAPI(id) {
  return request({
    url: `/park/sys/user/${id}`,
    method: 'DELETE'
  })
}

