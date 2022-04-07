// app内容管理——资讯相关接口
import request from '@/utils/request'

// 获取资讯的系列
export function fetchNewsList(newsParams) {
  console.log(newsParams)
  return request({
    url: '/api/v3/person2/erp_listall',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取资讯的详情
export function fetchNewsListDetail(newsParams) {
  console.log(newsParams)
  return request({
    url: '/api/v3/person2/erp_detail',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增
export function addNewsList(newsParams) {
  console.log(newsParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列删除
export function delNewsList(newsParams) {
  console.log(newsParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列设置封面
export function setNewsListFirst(newsParams) {
  console.log(newsParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列内图片删除
export function delNewsListDetail(newsParams) {
  console.log(newsParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_img',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 上传图片
export function newsListUpload(newsParams1, headimg) {
  console.log(newsParams1)
  return request({
    url: '/v3upload/admin_wx_xxx',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: newsParams1,
    data: headimg
  })
}
