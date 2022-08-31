import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  data = qs.stringify(data)
  console.log(data)
  return request({
    url: '/erp/wechatweb/v1/service/login',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({})
}
