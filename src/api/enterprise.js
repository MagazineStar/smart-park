import request from '@/utils/request'

/**
 * 获得企业列表
 * @param {*} params 参数
 * @returns
 */
export function getEnterpriseListAPI(params) {
  return request({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}
/**
 * 获取企业所属行业列表
 * @returns
 */
export function getIndustryListAPI() {
  return request({
    url: '/park/industry',
    method: 'GET'
  })
}
/**
 * 添加企业
 * @param {*} data 参数
 * @returns
 */
export function addEnterpriseAPI(data) {
  return request({
    url: '/park/enterprise',
    method: 'POST',
    data
  })
}
/**
 * 获取合同详情
 * @param {*} id
 * @returns
 */
export function getEnterpriseDetailAPI(id) {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'GET'
  })
}
/**
 * 更新企业
 * @param {*} data
 * @returns
 */
export function updateExterpriseAPI(data) {
  return request({
    url: '/park/enterprise',
    method: 'PUT',
    data
  })
}
/**
 * 删除企业
 * @param {*} id
 * @returns
 */
export function deleteEnterpriseAPI(id) {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'DELETE'
  })
}
/**
 * 获取租赁楼宇列表
 * @returns
 */
export function getRentBuildingAPI() {
  return request({
    url: '/park/rent/building'
  })
}
/**
 *添加/续租企业的租赁合同
 * @param {*} data
 * @returns
 */
export function addRentAPI(data) {
  return request({
    url: '/park/enterprise/rent',
    method: 'POST',
    data
  })
}
/**
 * 企业租赁信息列表-展开查看
 * @param {*} id
 * @returns
 */
export function getEnterpriseRentBuildingAPI(id) {
  return request({
    url: `/park/enterprise/rent/${id}`,
    method: 'GET'
  })
}
/**
 * 退租功能
 * @param {*} id
 * @returns
 */
export function outRentAPI(id) {
  return request({
    url: `/park/enterprise/rent/${id}`,
    method: 'PUT'
  })
}
/**
 * 删除租赁合同
 * @param {*} id
 * @returns
 */
export function deleteEnterpriseRentAPI(id) {
  return request({
    url: `/park/enterprise/rent/${id}`,
    method: 'DELETE'
  })
}
