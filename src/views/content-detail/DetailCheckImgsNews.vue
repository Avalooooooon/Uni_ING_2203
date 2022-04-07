<template>
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        {{ detailname }}
      </div>
    </div>
    <div class="content">
      <el-form ref="numberValidateForm" :model="numberValidateForm" label-width="100px" style="margin-top: 30px" class="demo-dynamic">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[
            { required: true, message: '名称不能为空'}
          ]"
        >
          <el-input v-model.number="numberValidateForm.name" placeholder="请输入名称" type="age" style="width: 150px" ocomplete="off" />
        </el-form-item>
        <el-form-item
          label="封面图"
          prop="image"
          required
        >
          <el-upload
            class="avatar-uploader"
            list-type="picture-card"
            action="/v3upload/admin_wx_wallpaper"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="numberValidateForm.content" :width="1000" :height="400" />
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'DetailCheckImgsNews',
  components: { Tinymce },
  props: ['detailid', 'detailname'],
  data() {
    return {

      // 发送给后端的数据
      NewsParams: {
        bizid: 'uniwarm',
        token: getToken(),
        se_id: this.detailid,
        page: 1
      },
      url: 'https://www.bizspace.cn',
      imageUrl: '',
      numberValidateForm: {
        name: '',
        content: ''
      }
    }
  },

  created() {
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },

    uploadFile(file) {
      console.log(file)
      var formData = new FormData()
      formData.append('headimg', file.file)
      // morningListUpload(this.morningParams1, formData).then((res) => {
      //   console.log(res)
      //   this.imageUrl = this.url + res.image
      //   if (res.res === 0) {
      //     this.$message({
      //       type: 'success',
      //       message: '上传成功'
      //     })
      //     this.dialogVisible = false
      //     this.imageUrl = ''
      //     this.getMorningList()
      //   }
      // })
    },
    handleAvatarSuccess(res, file) {
      console.log(file)
    },
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
  margin: 0 1%;
}

// 顶部区域
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 5vh;
  padding: 1.4% 0 1% 0;

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
      margin: 0 2vw 0;

      .uploadsinglebtn {
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: #253647;
        color: white;
        border: none;
        margin-right: 0.5vw;
      }
      .deletesinglebtn {
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: transparent;
        color: #d79432;
        border: 1px solid #d79432;
      }
    }

    .btnsset {
      margin: 0 0 0 2vw;
      .editsetbtn {
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: transparent;
        color: #7d808a;
        border: 1px solid #7d808a;
        margin-right: 0.5vw;
      }
      .deletesetbtn {
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: transparent;
        color: #f56c6c;
        border: 1px solid #f56c6c;
      }
    }
  }
}

// 主要内容区域（多个）
.images-wrapper {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 单图模块
  .singleimage {
    position: relative;
    width: 19.6%; // (100-1*2)/5，根组件的左右margin为1%
    height: 100%;
    padding: 1% 5px 0 5px;

    .block {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: flex-start;
      width: 100%;
      height: 100%;
      // 模块主图
      .appimg {
        width: 100%;
        height: 95%;
      }
      // 删除状态下的删除栏
      .delete-img {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        position: absolute;
        bottom: 0px;
        height: 30px;
        line-height: 30px;
        margin: 0;
        background: rgba(59, 60, 61, 0.5);
        z-index: 999;
        cursor: pointer;
        text-align: center;
        i {
          display: block;
          font-size: 20px;
          color: white;
        }
      }
    }
  }
}
.footer{
  width: 100%;
  //border: 1px solid black;
  text-align: center;
  .el-pagination{
    margin-bottom: 40px;
    margin-top: 40px;
  }
}
</style>
