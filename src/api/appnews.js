// app内容管理——资讯相关接口
import request from '@/utils/request'

// 获取资讯的系列
export function fetchNewsList(newsParams) {
  console.log(newsParams)
  return request({
    url: '/erp/v3/news/erp_listall',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取一个资讯的详情
export function fetchNewsListDetail(newsParams) {
  console.log(newsParams)
  return request({
    url: '/erp/v3/news/erp_detail',
    method: 'get',
    params: newsParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 系列新增（无效）
// export function addNewsList(newsParams,jsondata) {
//   // contentType:"application/json"表示发送给服务端的消息主体是序列化的JSON的字符串。所以传输的data必须是序列化的JSON字符串:JSON.stringify()
//   // jsondata = qs.stringify(jsondata)
//   console.log(jsondata)
//   console.log(newsParams)
//   return request({
//     url: '/api/v3/news/erp_add',
//     method: 'post',
//     params: newsParams,
//     jsondata,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }

// 系列删除
export function delNewsList(newsParams) {
  console.log(newsParams)
  return request({
    url: '/erp/v3/news/erp_delete',
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
    url: '/v3upload/admin_news',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: newsParams1,
    data: headimg
  })
}
