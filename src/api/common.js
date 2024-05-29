// 公共接口
import request from '@/utils/request'

/**
 * 上传文件
 * @param {*} form 参数
 * @returns
 */
export function uploadFile(form) {
  return request({
    url: '/upload',
    method: 'POST',
    data: form
  })
}
