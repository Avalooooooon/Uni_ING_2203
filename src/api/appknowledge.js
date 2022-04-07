// app内容管理——设计师相关接口
import request from '@/utils/request'

// 获取设计师的系列
export function fetchKnowledgeList(knowledgeParams) {
  console.log(knowledgeParams)
  return request({
    url: '/api/v3/person2/erp_listall',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取一个设计师的详情
export function fetchKnowledgeListDetail(knowledgeParams) {
  console.log(knowledgeParams)
  return request({
    url: '/api/v3/person2/erp_detail',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增
export function addKnowledgeList(knowledgeParams) {
  console.log(knowledgeParams)
  return request({
    url: '/api/wechatweb/v1/service/add_wp_se',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列删除
export function delKnowledgeList(knowledgeParams) {
  console.log(knowledgeParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_se',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列设置封面
export function setKnowledgeListFirst(knowledgeParams) {
  console.log(knowledgeParams)
  return request({
    url: '/api/wechatweb/v1/service/get_wp_se_detail',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列内图片删除
export function delKnowledgeListDetail(knowledgeParams) {
  console.log(knowledgeParams)
  return request({
    url: '/api/wechatweb/v1/service/delete_wp_img',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 上传图片
export function knowledgeListUpload(knowledgeParams1, headimg) {
  console.log(knowledgeParams1)
  return request({
    url: '/v3upload/admin_wx_xxx',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: knowledgeParams1,
    data: headimg
  })
}
