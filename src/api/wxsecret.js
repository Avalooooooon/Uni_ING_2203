// 小程序内容管理——爱的密语相关接口
import request from '@/utils/request'

// 获取爱的密语的系列
export function fetchSecretList(secretParams) {
  console.log(secretParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se',
    method: 'get',
    params: secretParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 获取一个爱的密语系列内的图片
export function fetchSecretListDetail(secretParams) {
  console.log(secretParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: secretParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列新增
export function addSecretList(secretParams) {
  console.log(secretParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: secretParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列删除
export function delSecretList(secretParams) {
  console.log(secretParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: secretParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列设置封面
export function setSecretListFirst(secretParams) {
  console.log(secretParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: secretParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列内图片删除
export function delSecretListDetail(secretParams) {
  console.log(secretParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_img',
    method: 'get',
    params: secretParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 上传图片
export function secretListUpload(secretParams1, headimg) {
  console.log(secretParams1)
  return request({
    url: '/v3upload/admin_wx_wallpaper',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: secretParams1,
    data: headimg
  })
}