// app内容管理——设计师相关接口
import request from '@/utils/request'

// 获取设计师的系列
export function fetchDesignerList(designerParams) {
  console.log(designerParams)
  return request({
    url: '/api/v3/person2/erp_listall',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取一个设计师的详情
export function fetchDesignerListDetail(designerParams) {
  console.log(designerParams)
  return request({
    url: '/api/v3/person2/erp_detail',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增
export function addDesignerList(designerParams) {
  console.log(designerParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列删除
export function delDesignerList(designerParams) {
  console.log(designerParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列设置封面
export function setDesignerListFirst(designerParams) {
  console.log(designerParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列内图片删除
export function delDesignerListDetail(designerParams) {
  console.log(designerParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_img',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 上传图片
export function designerListUpload(designerParams1, headimg) {
  console.log(designerParams1)
  return request({
    url: '/v3upload/admin_wx_xxx',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: designerParams1,
    data: headimg
  })
}
