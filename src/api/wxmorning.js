// 小程序内容管理——早安晚安相关接口
import request from '@/utils/request'

// 获取早安晚安的系列
export function fetchMorningList(morningParams) {
  console.log(morningParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se',
    method: 'get',
    params: morningParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取一个早安晚安系列内的图片
export function fetchMorningListDetail(morningParams) {
  console.log(morningParams)
  return request({
    url: '/api/wechatweb/v1/service/get_hello_se_detail',
    method: 'get',
    params: morningParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增
export function addMorningList(morningParams) {
  console.log(morningParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: morningParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列删除
export function delMorningList(morningParams) {
  console.log(morningParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: morningParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列设置封面
export function setMorningListFirst(morningParams) {
  console.log(morningParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: morningParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列内图片删除
export function delMorningListDetail(morningParams) {
  console.log(morningParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_img',
    method: 'get',
    params: morningParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 上传图片
export function morningListUpload(morningParams1, headimg) {
  console.log(morningParams1)
  return request({
    url: '/v3upload/admin_wx_wallpaper',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: morningParams1,
    data: headimg
  })
}
