import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import * as user from '@/api/user'
import md5 from 'js-md5'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password,
      bizid
    } = userInfo

    return new Promise((resolve, reject) => {
      console.log('userInfo', userInfo)
      // 服务器需要的登录参数
      const payload = {
        username: username,
        password: md5(password),
        bizid: bizid
      }
      // 请求服务器
      user.login(payload).then(response => {
        console.log('112233')
        console.log(response)
        if (response.res === 0) {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          sessionStorage.setItem('headimg', response.headimg)
          resolve()
        } else {
          console.log('登陆账号错误')
          this.$router.push('/login')
          console.log('账号密码错误已返回')
        }
      }).catch(error => {
        reject(error)
        console.log('错误')
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      /**
       * 这里请求用户信息和权限，目前接口没做，只注释了，data写死
       * */
      // user.getInfo(state.token).then(response => {
      // const {
      //   data
      // } = response
      const {
        data
      } = {
        data: {
          roles: ['admin'],
          introduction: 'Administrator',
          avatar: 'https://cloud.xiaoxingbobo.top/nongzhibang/20210429/1107491622257669573',
          name: 'administrator'
        }
      }

      if (!data) {
        reject('Verification failed, please Login again.')
      }

      const {
        roles,
        name,
        avatar,
        introduction,
        token
      } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      commit('SET_TOKEN', token)
      resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
