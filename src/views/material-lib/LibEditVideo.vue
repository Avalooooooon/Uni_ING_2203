<template>
  <!--  视频编辑-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back">
        <span style="width: 140px;font-size: 13px">请输入标题</span>
        <el-input v-model="input" placeholder="请输入封面标题"></el-input>
        <el-button
          type="primary"
          style="font-size: 12px;width: 150px"
          class="filterlebtn"
        >更换视频</el-button>
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
    <el-dialog
      title="保存素材"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="width: 300px;margin: 0 auto;text-align: center">
        <div class="typeImg">
          <img style="width: 40px;height: 40px;vertical-align:middle; margin-bottom: 20px" src="../../assets/loading.png" alt="">
          <img style="width: 40px;height: 40px;vertical-align:middle; margin-bottom: 20px" src="../../assets/success.png" alt="">
          <div>正在上传，请耐心等待...</div>
          <div>上传成功</div>
        </div>
      </div>
    </el-dialog>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div class="content">
        <div class="content-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from '@/api/materiallib'
import { getToken } from '@/utils/auth'
// import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'LibEditVideo',
  props: ['detailid', 'detailname'],
  // components: { Tinymce },

  data() {
    return {
      dialogVisible: false,
      token: getToken()
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
      this.dialogVisible = true
      // this.$router.go(-1)
    },
    // 关闭保存素材弹窗
    handleClose(done) {
      this.$confirm('确认关闭？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          done()
        })
        .catch((_) => {
        })
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

    .filterlebtn{
      height: 3vh;
      width: 5vw;
      margin: 1vh 2vw;
      padding: 0;
      background-color: #253647;
      color: white;
      border: none;
      margin-right: 0.5vw;
    }
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
.typeImg{
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  display: table-cell;
  width: 300px;
  vertical-align: middle;
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
    .content-bottom {
      width: 900px;
      height: 600px;
      margin-top: 30px;
      background-color: rgb(0,0,0,0.5);
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
