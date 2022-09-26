// 小程序内容管理——表情包相关接口
import request from '@/utils/request'

// 获取表情包的系列
export function fetchMemeList(memeParams) {
  console.log(memeParams)
  return request({
    url: '/erp/wechatweb/v1/service/get_st_se',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取一个表情包系列内的图片
export function fetchMemeListDetail(memeParams) {
  console.log(memeParams)
  return request({
    url: '/erp/wechatweb/v1/service/get_st_se_detail',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增
export function addMemeList(memeParamsAdd) {
  console.log(memeParamsAdd)
  return request({
    url: '/erp/wechatweb/v1/service/add_st_se',
    method: 'get',
    params: memeParamsAdd,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列删除
export function delMemeList(memeParams) {
  console.log(memeParams)
  return request({
    url: '/erp/wechatweb/v1/service/delete_st_se',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列设置封面
export function setMemeListFirst(memeParams) {
  console.log(memeParams)
  return request({
    url: '/erp/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列内图片删除
export function delMemeListDetail(memeParams) {
  console.log(memeParams)
  return request({
    url: '/erp/wechatweb/v1/service/delete_st_img',
    method: 'get',
    params: memeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 上传图片
export function memeListUpload(memeParams1, headimg) {
  console.log(memeParams1)
  return request({
    url: '/v3upload/admin_wx_sticker',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: memeParams1,
    data: headimg
  })
}
