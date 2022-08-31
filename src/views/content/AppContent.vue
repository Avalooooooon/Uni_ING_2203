<template>
  <!-- “APP内容管理”主界面，显示的是三个系列 -->
  <div class="content-wrapper">
    <div class="module-wrapper" appid="003" appname="设计师" @click="toDesignerDetail">
      <img class="appimg" src="https://www.uniwarm.net/appsrc/biz/uniwarm/erp/ops/static/design.png">
      <div class="contentName">设计师</div>
    </div>
    <div class="module-wrapper" appid="004" appname="资讯" @click="toNewsDetail">
      <img class="appimg" src="https://www.uniwarm.net/appsrc/biz/uniwarm/erp/ops/static/news.png">
      <div class="contentName">资讯</div>
    </div>
    <div class="module-wrapper" appid="005" appname="保养小知识" @click="toKnowledgeDetail">
      <img class="appimg" src="https://www.uniwarm.net/appsrc/biz/uniwarm/erp/ops/static/maintain.png">
      <div class="contentName">保养小知识</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContent',

  methods: {
    toDesignerDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'DesignerDetail',
        query: {
          appid: appid,
          appname: appname
        }
      })
    },
    toNewsDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'NewsDetail',
        query: {
          appid: appid,
          appname: appname
        }
      })
    },
    toKnowledgeDetail(event) {
      const appid = event.currentTarget.getAttribute('appid')
      const appname = event.currentTarget.getAttribute('appname')

      this.$router.push({
        name: 'KnowledgeDetail',
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
  height: 50%;
  //padding: 0 25px 5px 25px;
  padding: 5px 50px 0 50px;

  text-align: center;
  font-size: 14px;

  img{
    width: 100%;
    height: calc(100% - 50px);
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
