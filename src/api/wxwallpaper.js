import request from '@/utils/request'

// 获取壁纸的系列
export function fetchPaperList(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 获取一个壁纸系列内的图片
export function fetchPaperListDetail(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列新增
export function addPaperList(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列删除
export function delPaperList(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列设置封面
export function setPaperListFirst(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列内图片新增
export function addPaperListDetail(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

// 系列内图片删除
export function delPaperListDetail(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}