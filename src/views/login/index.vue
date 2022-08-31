<template>
  <div>
    <div class="main" />
    <div class="content">
      <div class="login">
        <div class="login-left">
          <div style="margin-left: 15px">
            <div class="title">
              <img
                class="top-bar"
                src="../../assets/topbar.png"
                alt="欢迎登录"
              ><br>
              <div class="text">uniwarm运维管理平台</div>
            </div>
            <el-form
              ref="loginForm"
              style="margin-top: 5px"
              :inline="true"
              :model="loginForm"
              :rules="loginRules"
              class="demo-form-inline"
            >
              <el-form-item class="el-form-item" prop="username">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="账号"
                  class="input"
                  name="username"
                />
              </el-form-item>
              <el-form-item class="el-form-item" prop="password">
                <el-input
                  v-model="loginForm.password"
                  placeholder="密码"
                  class="input"
                  show-password
                  @keyup.enter.native="handleLogin()"
                />
              </el-form-item>
              <!--              <el-checkbox v-model="checked" class="check">-->
              <!--                <span style="font-size: 16px">自动登录</span>-->
              <!--              </el-checkbox>-->
              <el-button type="primary" class="submit" @click.prevent="handleLogin()">登 录</el-button>
            </el-form>
          </div>
        </div>
        <div class="login-right">
          <img src="../../assets/picture.png" alt="" style="width: 100%;height: 100%">
        </div>
      </div>
      <div class="backgroundOne" />
      <div class="backgroundTwo" />
    </div>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      // console.log('进行验证')
      if (!validUsername(value)) {
        callback(new Error('用户名格式不正确！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'dong',
        password: 'donglichao',
        bizid: 'uniwarm'
      },
      checked: true,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          // this.redirect = query.redirect
          this.redirect = '/content/wxcontent'
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //     this.loading = false
          //   })
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              console.log('登录成功')
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              sessionStorage.setItem('username', this.loginForm.username)
              this.$message.success('登陆成功')
              this.loading = false
            })
            .catch((e) => {
              this.tool.log(e)
              this.loading = false
              if (e.response) {
                this.$message.warning('账号或者密码输入有误')
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.main {
  background: url("../../assets/background.png");
  background-size: 100% 100%;
  height: 100vh;
  /*height: 100%;*/
  position: relative;
  width: 100%;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

.content {
  display: block;
  position: fixed;
  _position: relative;
  top: 50%;
  left: 50%;
  width: 1300px;
  height: 720px;
  margin-left: -650px;
  margin-top: -360px;
  z-index: 10;
  /*border: 2px solid red;*/
  /*box-shadow: 2px 2px 4px #A0A0A0, -2px -2px 4px #A0A0A0;*/
  /*background-color: #fff;*/
}

.login {
  /*border: 3px solid #1100ff;*/
  width: 100%;
  height: 100%;
  position: absolute;
  /*position: absolute;*/
  margin: 0 auto;
  bottom: 0;
  background: white;
  border-radius: 12px;
  z-index: 10;
  display: flex;
}

.login-left {
  width: 50%;
  height: 100%;
  float: left;
  /*border: 1px solid red;*/
}

.title {
  height: 200px;
  margin-left: 70px;
  margin-top: 80px;
}

.text {
  font-size: 28px;
  font-weight: 400;
  color: gray;
  margin-top: 18px;
}

.login-right {
  width: 50%;
  height: 100%;
  float: right;
  background-repeat: no-repeat;
}
.demo-form-inline{
  width: 100%;
  /*border: 1px solid black;*/
}
.el-form-item{
  width: 80%;
  /*border: 1px solid blue;*/
  margin-left: 70px;
}
.el-form-item:nth-of-type(2){
  margin-top: 20px;
}

/*.input {*/
/*  width: 100%;*/
/*  height: 60px;*/
/*  margin-left: 70px;*/
/*  margin-top: 30px;*/
/*  font-size: 18px;*/
/*}*/

::v-deep .el-input__inner {
  height: 55px;
  width: 500px;
}

.check {
  margin-left: 70px;
  margin-top: 40px;
}

.submit {
  width: 80%;
  height: 55px;
  margin-left: 70px;
  margin-top: 80px;
  font-size: 20px;
  background-color: rgb(39, 54, 72);
}

.backgroundOne {
  /*width: 60%;*/
  /*height: 40vh;*/
  /*position: absolute;*/
  /*margin-left: 20%;*/
  width: 96%;
  height: 104%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  /*border: 2px solid rebeccapurple;*/
  background-color: rgba(255, 255, 255, 0.4);
}

.backgroundTwo {
  width: 92%;
  height: 108%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  /*border: 2px solid rebeccapurple;*/
  background-color: rgba(255, 255, 255, 0.4);
}

.top-bar {
  width: 185px;
  height: 50px;
  margin-top: 50px;
}

body {
  max-width: 1366px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<!--

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
-->
