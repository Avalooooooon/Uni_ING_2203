<template>
<!-- “小程序内容管理”主界面,显示的是四个系列 -->
  <div class="content-wrapper">
    <div class="module-wrapper" @click="toWxDetail" appid='1' appname='早安晚安'>
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'>
      早安晚安
    </div>
    <div class="module-wrapper" @click="toWxDetail" appid='2' appname='壁纸'>
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/wallpaper.png'>
      壁纸
    </div>
    <div class="module-wrapper" @click="toMemeDetail" appid='3' appname='表情包'>
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/sticker.png'>
      表情包
    </div>
    <div class="module-wrapper" @click="toWxDetail" appid='4' appname='爱的密语'>
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/secret.png'>
      爱的密语
    </div>
  </div>
</template>

<script>
export default {
  name: 'WxContent',

  methods:{
    // 点击功能图片，进入该功能详情WxDetail
    toWxDetail(event){
      let appid = event.currentTarget.getAttribute("appid")
      let appname = event.currentTarget.getAttribute("appname")

      this.$router.push({
        name:'WxDetail',
        query:{
          appid:appid,
          appname:appname,
          },
      })
    },

    // 进入表情包详情
    toMemeDetail(event){
      let appid = event.currentTarget.getAttribute("appid")
      let appname = event.currentTarget.getAttribute("appname")

      this.$router.push({
        name:'MemeDetail',
        query:{
          appid:appid,
          appname:appname,
          },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 根组件
.content-wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 100%;
  height: 100%;
  margin: 0.7% 1%;
}

// 主要内容区域（单个）
.module-wrapper{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: flex-start;

  // width: 19.6%;  // (100-1*2)/5，根组件的左右margin为1%
  width: 49%;
  height: 49%;
  padding: 1% 25px 5px 25px;
  text-align: center;
  font-size: 14px;


  img{
    width: 100%;
    height:100%;
    margin-bottom: 10px;
  }
  img:hover{
    cursor: pointer;
  }
}



</style>