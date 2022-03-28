<template>
<!-- “APP内容管理”主界面，显示的是五个系列 -->
  <div class="content-wrapper">
    <div class="module-wrapper" @click="toAppDetail" appid='1' appname='品牌故事'>
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'>
      品牌故事
    </div>
    <div class="module-wrapper" @click="toAppDetail" appid='002' appname='品牌灵魂'>
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'>
      品牌灵魂
    </div>
    <div class="module-wrapper" @click="toAppDetail">
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'>
      设计师
    </div>
    <div class="module-wrapper" @click="toAppDetail">
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'>
      资讯
    </div>
    <div class="module-wrapper" @click="toAppDetail">
      <img class="appimg" src='https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'>
      保养小知识
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContent',

  methods:{
    toAppDetail(e){
      let appid = event.currentTarget.getAttribute("appid")
      let appname = event.currentTarget.getAttribute("appname")

      this.$router.push({
        name:'AppDetail',
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
.content-wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 100%;
  height: 100%;
  margin: 0.7% 1%;
  
  /* background-color: antiquewhite; */
}
.module-wrapper{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: flex-start;

  // width: 19.6%;  // (100-1*2)/5，根组件的左右margin为1%
  width: 49%;
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