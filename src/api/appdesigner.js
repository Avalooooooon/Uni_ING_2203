// app内容管理——设计师相关接口
import request from '@/utils/request'

// 获取设计师的系列
export function fetchDesignerList(designerParams) {
  // console.log(designerParams)
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
  // console.log(designerParams)
  return request({
    url: '/api/v3/person2/erp_detail',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增（无效）
// export function addDesignerList(designerParams,jsondata) {
//   // contentType:"application/json"表示发送给服务端的消息主体是序列化的JSON的字符串。所以传输的data必须是序列化的JSON字符串:JSON.stringify()
//   // jsondata = qs.stringify(jsondata)
//   console.log(jsondata)
//   console.log(designerParams)
//   return request({
//     url: '/api/v3/person2/erp_add',
//     method: 'post',
//     params: designerParams,
//     jsondata,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }

// 系列删除
export function delDesignerList(designerParams) {
  // console.log(designerParams)
  return request({
    url: '/api/v3/person2/erp_delete',
    method: 'get',
    params: designerParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}



// 上传图片
export function designerListUpload(designerParams1, headimg) {
  // console.log(designerParams1)
  return request({
    url: '/v3upload/admin_person2',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: designerParams1,
    data: headimg
  })
}
