<template>
  <!-- “小程序内容管理”主界面,显示的是四个系列 -->
  <div class="content-wrapper">
    <div class="module-wrapper" appid="1" appname="早安晚安">
      <img @click="toMorningDetail" class="appimg" src="https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png">
      <div @click="toMorningDetail" class="contentName">早安晚安</div>
    </div>
    <div class="module-wrapper" appid="2" appname="壁纸">
      <img @click="toWxDetail" class="appimg" src="https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/wallpaper.png">
      <div @click="toWxDetail" class="contentName">壁纸</div>
    </div>
    <div class="module-wrapper" appid="3" appname="表情包">
      <img @click="toMemeDetail" class="appimg" src="https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/sticker.png">
      <div @click="toMemeDetail" class="contentName">表情包</div>
    </div>
    <div class="module-wrapper" appid="4" appname="爱的密语">
      <img @click="toSecretDetail" class="appimg" src="https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/secret.png">
      <div @click="toSecretDetail" class="contentName">爱的密语</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WxContent',
  methods: {
    // 进入早安晚安详情
    toMorningDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'MorningDetail',
        query: {
          appid: appid,
          appname: appname
        }
      })
    },

    // 进入壁纸详情
    toWxDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'WxDetail',
        query: {
          appid: appid,
          appname: appname
        }
      })
    },

    // 进入表情包详情
    toMemeDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'MemeDetail',
        query: {
          appid: appid,
          appname: appname
        }
      })
    },

    // 进入爱的密语详情
    toSecretDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'DetailCheckImgsSecret',
        query: {
          appid: appid,
          appname: appname
        }
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
  //border: 1px solid black;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 0 20px;
  overflow-y: scroll;
}
.content-wrapper::-webkit-scrollbar{
  width: 3px;
}
.content-wrapper::-webkit-scrollbar-thumb{
  background: transparent;
  border-radius: 4px;
}
.content-wrapper:hover::-webkit-scrollbar-thumb{
  background: #E4E7ED;
}
.content-wrapper:hover::-webkit-scrollbar-track{
  background: #F3F4F9;
}

// 主要内容区域（单个）
.module-wrapper{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: flex-start;
  //border: 1px solid red;
  // width: 19.6%;  // (100-1*2)/5，根组件的左右margin为1%
  width: 50%;
  height: calc((100vh - 50px)/2);
  //padding: 0 25px 5px 25px;
  padding: 0 50px 0 50px;

  text-align: center;
  font-size: 14px;

  img{
    width: 100%;
    //height: calc(100% - 50px);
    height: 50vw;
    //margin-bottom: 10px;
  }
  .contentName{
    width: 100%;
    height: 50px;
    cursor: pointer;
    //border: 1px solid black;
    line-height: 50px;
    text-align: center;
  }
  img:hover{
    cursor: pointer;
  }
}

</style>
