<template>
  <!-- 图文编辑-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back">
        <span style="width: 150px">请输入标题 : </span>
        <el-input style="width: 300px" v-model="input" placeholder="请输入封面标题"></el-input>
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="editlebtn"
            @click="handleCancel"
          >取消</el-button>
          <el-button
            type="primary"
            class="dellebtn"
            @click="handleSave"
          >完成</el-button>
        </div>
      </div>
    </div>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div class="content">
        <div class="content-right">
          <Tinymce
            ref="editor"
            style="width: 100%"
            :height="600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  paperListUpload,
  delPaperListDetail
} from '@/api/wxwallpaper'
import { getToken } from '@/utils/auth'
import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'LibEdit',
  props: ['detailid', 'detailname'],
  components: { Tinymce },

  data() {
    return {
    }
  },

  created() {
  },

  methods: {
    // 编辑图文素材取消
    handleCancel() {
      this.$router.go(-1)
    },
    // 编辑图文素材保存
    handleSave() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
// 根组件
.content-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  //border: 1px solid red;
  padding: 30px 2%;
  box-sizing: border-box;
  //margin: 0 1%;
}

// 顶部区域
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //border: 1px solid red;
  height: 5vh;
  //margin: 30px 2%;
  .back{
    height: 100%;
    line-height: 5vh;
    //border: 1px solid black;
    display: flex;
  }

  ::v-deep {
    .btnsimg .el-button--medium {
      font-size: 12px;
    }
    .btnsset .el-button--medium {
      font-size: 12px;
    }
  }
  .btns {
    display: flex;

    .btnsimg {
      //margin: 0 2vw 0;

      .editlebtn{
        height: 3vh;
        width: 3vw;
        padding: 0;
        background-color: transparent;
        color: #253647;
        border: 1px solid #253647;
        margin-right: 0.5vw;
      }
      .dellebtn{
        height: 3vh;
        width: 3vw;
        padding: 0;
        background-color: transparent;
        color: #d79432;
        border: 1px solid #d79432;
        margin-right: 0.5vw;
      }
    }
  }
}

// 主要内容区域（多个）
.images-wrapper {
  width: 100%;
  margin-top: 10px;
  //height: calc(100vh - 5vh - 50px);
  //border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 主要内容显示区域
  .content {
    width: 100%;
    //border: 1px solid red;
    //height: calc(100vh - 100px);
    // 右侧编辑器
    .content-right {
      width: 100%;
      height: 100%;
      //border: 1px solid blue;
      // 需要隐藏的部分
      ::v-deep {
        // 顶部栏除了upload按钮的其他按钮
        .mce-container-body.mce-flow-layout {
          // visibility:hidden;
          width: 100%;
        }
        // 顶部栏下面的工具栏
        .mce-toolbar-grp.mce-container.mce-panel.mce-last {
          // display: none;
          width: 100%;
        }
        .mce-container.mce-flow-layout-item.mce-first.mce-last.mce-btn-group {
          width: 100%;
        }
      }
    }
  }
  .tableImg{
    width: 200px;
    height: 150px;
    //border: 1px solid black;
  }
}

</style>
