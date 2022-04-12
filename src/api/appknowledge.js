// app内容管理——保养小知识相关接口
import request from '@/utils/request'

// 获取保养小知识的系列
export function fetchKnowledgeList(knowledgeParams) {
  // console.log(knowledgeParams)
  return request({
    url: '/api/v3/news/erp_listall',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取一个保养小知识的详情
export function fetchKnowledgeListDetail(knowledgeParams) {
  // console.log(knowledgeParams)
  return request({
    url: '/api/v3/news/erp_detail',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增（无效）
// export function addKnowledgeList(knowledgeParams,jsondata) {
//   // contentType:"application/json"表示发送给服务端的消息主体是序列化的JSON的字符串。所以传输的data必须是序列化的JSON字符串:JSON.stringify()
//   // jsondata = qs.stringify(jsondata)
//   console.log(jsondata)
//   console.log(knowledgeParams)
//   return request({
//     url: '/api/v3/news/erp_add',
//     method: 'post',
//     params: knowledgeParams,
//     jsondata,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }

// 系列删除
export function delKnowledgeList(knowledgeParams) {
  // console.log(knowledgeParams)
  return request({
    url: '/api/v3/news/erp_delete',
    method: 'get',
    params: knowledgeParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}



// 上传图片
export function knowledgeListUpload(knowledgeParams1, headimg) {
  // console.log(knowledgeParams1)
  return request({
    url: '/v3upload/admin_news',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: knowledgeParams1,
    data: headimg
  })
}
