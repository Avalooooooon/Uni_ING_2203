<template>
  <!--  图文详情-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <!-- <span class="lt">&lt;&nbsp;</span>  -->
        <i class="el-icon-arrow-left" />
        素材详情
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="editlebtn"
            @click="handleEdit"
          >编辑</el-button>
          <el-button
            type="primary"
            class="dellebtn"
          >删除</el-button>
        </div>
      </div>
    </div>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div class="content">
        <div class="content-left">
          <div style="font-size: 16px;font-weight: bold;">素材名称</div><br>
          <div style="font-size: 13px;color: gray">上传人 20220413xxxxxxxxxxxx</div>
        </div>
        <div class="content-right">
          <Tinymce
            ref="editor"
            style="margin-top: 0px"
            :width="590"
            :height="700"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from '@/api/materiallib'
import { getToken } from '@/utils/auth'
import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'LibCheckDetail',
  components: { Tinymce },
  props: ['detailid', 'detailname'],

  data() {
    return {
      matId: '',
      token: getToken()
    }
  },

  created() {
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },
    // 编辑图文素材
    handleEdit() {
      this.$router.push({ path: '/material/matlib/libedit', query: { id: this.matId }})
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
  //border: 1px solid black;
  height: 5vh;
  //margin: 30px 2%;

  .back {
    color: #d79432;
    font-size: 16px;
    padding: 0;
    .el-icon-arrow-left {
      font-weight: bolder;
    }
  }
  .back:hover {
    cursor: pointer;
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
        background-color: #253647;
        color: white;
        border: none;
        margin-right: 0.5vw;
      }
      .dellebtn{
        height: 3vh;
        width: 3vw;
        padding: 0;
        background-color: #f56c6c;
        color: white;
        border: none;
      }
    }
  }
}

// 主要内容区域（多个）
.images-wrapper {
  width: 96%;
  margin-top: 10px;
  height: calc(100vh - 5vh - 50px);
  //border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 主要内容显示区域
  .content {
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;

    // 左侧列表
    .content-left {
      width: 35%;
      margin-left: 1.5%;
      height: 100%;
      //border: 1px solid black;
      // 列表输入框
      ::v-deep {
        .el-form {
          display: flex;
          flex-direction: column;
          .el-input {
            width: 250px;
          }

          // 照片上传组件
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 200px;
            height: 278px;
            line-height: 278px;
            text-align: center;
          }
          // 主图
          .avatar {
            width: 200px;
            height: 278px;
            display: block;
          }

        }
      }
    }

    // 右侧编辑器
    .content-right {
      width: 60%;
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
