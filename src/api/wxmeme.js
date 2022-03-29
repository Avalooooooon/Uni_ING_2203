// 小程序内容管理——表情包相关接口
import request from '@/utils/request'

// 获取表情包的系列
export function fetchMemeList(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 获取一个表情包系列内的图片
export function fetchMemeListDetail(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列新增
export function addMemeList(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列删除
export function delMemeList(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列设置封面
export function setMemeListFirst(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列内图片新增
export function addMemeListDetail(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列内图片删除
export function delMemeListDetail(memeParams) {
  console.log(memeParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}