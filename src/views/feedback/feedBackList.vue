<template>
  <!-- 反馈管理-反馈列表 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <el-input style="width: 300px;font-size: 12px" v-model="search" suffix-icon="el-icon-search" placeholder="请输入动态标题内容或用户昵称"></el-input>
    </div>
    <div class="content-head">
      <div class="feedbackList">
        <div class="listContent">
          需要将反馈问题的分类和筛选，最终整理出有效的可阅读的意见反馈汇总表。如果是BUG类，则需要转给测试和开发团队进行BUG重现，但是根据用户简单的文字描述和截图是比较难找到隐形BUG的，
          这时候需要在记录反馈用户的设备号、版本号、网络环境等信息，才能更加快速的定位和排查问题，最终帮助用户解决。如果是需求类，则需要产品团队评估用户需求是否合理，合理的需求即纳入需求池，
          后期整理方案转化成产品需求，最终变成可落地实现的功能点。 需要给用户的意见反馈进行答复，让用户获知自己的意见反馈，产品团队已经接受到并在解决中，以及何时能解决，这样有利于提高产品的
          参与度。但是一一的答复用户，对于企业来说成本较大，可考虑在产品上线初期采用一一回复的形式，产品成熟期可以考虑采用反馈表彰榜的形式来引导和鼓励用户进行意见反馈。
          需要将反馈问题的分类和筛选，最终整理出有效的可阅读的意见反馈汇总表。如果是BUG类，则需要转给测试和开发团队进行BUG重现，但是根据用户简单的文字描述和截图是比较难找到隐形BUG的，
          这时候需要在记录反馈用户的设备号、版本号、网络环境等信息，才能更加快速的定位和排查问题，最终帮助用户解决。如果是需求类，则需要产品团队评估用户需求是否合理，合理的需求即纳入需求池，
          后期整理方案转化成产品需求，最终变成可落地实现的功能点。 需要给用户的意见反馈进行答复，让用户获知自己的意见反馈，产品团队已经接受到并在解决中，以及何时能解决，这样有利于提高产品的
          参与度。但是一一的答复用户，对于企业来说成本较大，可考虑在产品上线初期采用一一回复的形式，产品成熟期可以考虑采用反馈表彰榜的形式来引导和鼓励用户进行意见反馈。
        </div>
        <div class="cusInfo">
          <span class="Info">熊大</span>
          <span class="Info">反馈类型 : 产品优化建议</span>
          <span class="Info">用户账号 : 15110036978</span>
          <span class="Info">时间 : 2022/9/7 11:12</span>
        </div>
      </div>
      <div class="feedbackList">
        <div class="listContent">
          需要将反馈问题的分类和筛选，最终整理出有效的可阅读的意见反馈汇总表。如果是BUG类，则需要转给测试和开发团队进行BUG重现，但是根据用户简单的文字描述和截图是比较难找到隐形BUG的，
          这时候需要在记录反馈用户的设备号、版本号、网络环境等信息，才能更加快速的定位和排查问题，最终帮助用户解决。如果是需求类，则需要产品团队评估用户需求是否合理，合理的需求即纳入需求池，
          后期整理方案转化成产品需求，最终变成可落地实现的功能点。 需要给用户的意见反馈进行答复，让用户获知自己的意见反馈，产品团队已经接受到并在解决中，以及何时能解决，这样有利于提高产品的
          参与度。但是一一的答复用户，对于企业来说成本较。
        </div>
        <div class="cusInfo">
          <span class="Info">熊er</span>
          <span class="Info">反馈类型 : 产品优化建议</span>
          <span class="Info">用户账号 : 15110036978</span>
          <span class="Info">时间 : 2022/9/7 11:12</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   fetchDesignerListDetail,
//   materialListUpload,
//   delDesignerListDetail,
// } from "@/api/material";
import { getToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'FeedBackList',
  // props: ['matid', 'matname'],

  data() {
    return {
      url: 'https://www.uniwarm.net',
      search: ''
    }
  },

  created() {
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
$formHeight: 28px;
// 根组件
.content-wrapper {
  display: flex;
  flex-direction: column;
  //flex-wrap: no-wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 96%;
  background-color: white;
  min-height: calc(100vh - 130px);
  //overflow-y: scroll;
  margin: 40px 2%;
}

// 头部
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 2% 0 2% 15px;
  position: relative;
  .title {
    font-size: 14px;
    font-weight: bolder;
  }

  // 设置按钮内字体大小
  ::v-deep {
    .btnsimg .el-button--medium {
      font-size: 12px;
    }
  }
}

// 上方列表
.content-head {
  display: flex;
  padding: 0 15px 15px 15px;
  flex-direction: row;
  flex-wrap: wrap;
  .feedbackList{
    width: 100%;
    border-bottom: 1px solid #f1f0f2;
    padding: 20px 0;
    .listContent{
      width: 100%;
      //border: 1px solid black;
      color: #9a999c;
      word-break:break-all;
      font-size: 12px;
      line-height: 25px;
    }
  }
  .cusInfo{
    width: 100%;
    height: 30px;
    margin-top: 10px;
    line-height: 30px;
    //border: 1px solid black;
    font-size: 13px;
    .Info{
      margin-right: 100px;

    }
  }
}
</style>
