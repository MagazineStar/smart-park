import request from '@/utils/request'

/**
 *获取月卡列表
 * @param {*} params 参数
 * @returns
 */
export function getCardListAPI(params) {
  return request({
    url: '/parking/card/list',
    method: 'GET',
    params
  })
}
/**
 * 新增月卡
 * @param {*} data 参数
 * @returns
 */
export function addCardAPI(data) {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}
/**
 * 获取月卡详情
 * @param {*} id 月卡id
 * @returns
 */
export function getCarDetailAPI(id) {
  return request({
    url: `/parking/card/detail/${id}`,
    method: 'GET'
  })
}
/**
 * 编辑接口
 * @param {*} data 参数
 * @returns
 */
export function editCardAPI(data) {
  return request({
    url: '/parking/card/edit',
    method: 'PUT',
    data
  })
}
/**
 * 删除月卡
 * @param {*} id 参数
 * @returns
 */
export function deleteCardAPI(id) {
  return request({
    url: `/parking/card/${id}`,
    method: 'DELETE'
  })
}
