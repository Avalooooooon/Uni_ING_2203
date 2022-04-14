<template>
  <!--  视频详情-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <!-- <span class="lt">&lt;&nbsp;</span>  -->
<!--        <i class="el-icon-arrow-left" />-->
<!--        素材详情-->
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
          >保存</el-button>
        </div>
      </div>
    </div>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <el-form
        ref="numberValidateForm"
        :model="numberValidateForm"
        label-width="100px"
        style="margin-top: 30px"
        class="demo-dynamic"
      >
        <el-form-item
          label="请输入标题"
          prop="name"
          :rules="[{ required: true, message: '标题不能为空' }]"
        >
          <el-input
            v-model.number="numberValidateForm.name"
            placeholder="请输入封面标题"
            type="name"
            ocomplete="off"
          />
        </el-form-item>

        <el-form-item label="上传图片" prop="image" required>
          <!-- :http-request="uploadFile" -->
          <el-upload
            class="avatar-uploader"
            action="/v3upload/admin_person2"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadFile"
          >
<!--            <img v-if="numberValidateForm" :src="url + numberValidateForm.image" class="avatar">-->
            <i class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  paperListUpload,
  delPaperListDetail
} from '@/api/wxwallpaper'
import { getToken } from '@/utils/auth'
import {designerListUpload} from "@/api/appdesigner";
// import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'LibImagesetAdd',
  props: ['detailid', 'detailname'],
  // components: { Tinymce },

  data() {
    return {
      matId: '',
      url: 'https://www.bizspace.cn',
      numberValidateForm: {
        name: '',
        image: ''
      }
    }
  },

  created() {
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleSave() {
      this.$router.go(-1)
    },
    // 上传照片
    uploadFile(file) {
      console.log(file)
      var formData = new FormData()
      formData.append('headimg', file.file)
      designerListUpload(this.designerParams1, formData).then((res) => {
        console.log(res)
        this.numberValidateForm.image = res.image
        if (res.res === 0) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          // this.getDesignerList()
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    // 上传开始前判断待上传图片是否符合格式要求
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
  width: 100%;
  margin-top: 10px;
  height: calc(100vh - 5vh - 50px);
  //border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
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
  // 主要内容显示区域
  .content {
    width: 100%;
    //height: calc(100vh - 100px);
    //border: 1px solid red;

    // 左侧列表
    .content-top {
      width: 100%;
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
