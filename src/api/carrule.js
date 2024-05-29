import request from '@/utils/request'
/**
 * 查看计费规则列表
 * @param {*} params
 * @returns
 */
export function getRuleListAPI(params) {
  return request({
    url: '/parking/rule/list',
    method: 'GET',
    params
  })
}
/**
 * 添加计费规则
 * @param {*} data
 */
export function addFeeRuleAPI(data) {
  return request({
    url: '/parking/rule',
    method: 'POST',
    data
  })
}
