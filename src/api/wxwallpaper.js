// 小程序内容管理——壁纸相关接口
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
    }
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
    }
  })
}

// 系列新增
export function addPaperList(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列删除
export function delPaperList(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
    }
  })
}

// 系列内图片删除
export function delPaperListDetail(paperParams) {
  console.log(paperParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_img',
    method: 'get',
    params: paperParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 上传图片
export function paperListUpload(paperParams1, headimg) {
  console.log(paperParams1)
  return request({
    url: '/v3upload/admin_wx_wallpaper',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: paperParams1,
    data: headimg
  })
}
