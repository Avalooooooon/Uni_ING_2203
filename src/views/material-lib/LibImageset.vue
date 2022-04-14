<template>
  <!--  图集详情-->
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
            v-if="isDeleteing"
            type="primary"
            class="uploadsinglebtn"
            @click="savedetail"
          >保存</el-button>
          <el-button
            type="primary"
            class="uploadlebtn"
            @click="dialogVisible = true"
          >上传图片</el-button>
          <el-button
            type="primary"
            class="dellebtn"
            @click="isdeleteimg"
          >删除图片</el-button>
          <el-button
            type="primary"
            class="editlebtn"
            @click="handleEdit"
          >编辑图集</el-button>
          <el-button
            type="primary"
            class="delImgs"
          >删除图集</el-button>
        </div>
      </div>
      <!--上传图片弹窗-->
      <el-dialog
        title="上传图片"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div style="width: 100%; text-align: center">
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
          <div style="width: 100%;margin-top: 30px">分辨率推荐1125 x 2436像素（竖屏），大小不超过 2MB</div>
        </div>
      </el-dialog>

    </div>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div class="content">
        <div class="content-top">
          <div style="font-size: 16px;font-weight: bold;">素材名称</div><br>
          <div style="font-size: 13px;color: gray">上传人 20220413xxxxxxxxxxxx</div>
        </div>
      </div>
      <div v-for="item in imgsData" :key="item.id" class="singleimage">
        <div class="block">
          <img class="appimg" :src="'https://www.bizspace.cn' + item.image">
          <div v-if="isDeleteing" ref="imgDelete" class="delete-img">
            <i class="el-icon-delete" @click="deleteimg(item)" />
          </div>
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
// import Tinymce from '@/components/Tinymce'
// import axios from 'axios'

export default {
  name: 'LibCheckVideo',
  props: ['detailid', 'detailname'],
  // components: { Tinymce },

  data() {
    return {
      matId: '',
      dialogVisible: false,
      imgsData: [
        {
          id: '1',
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'
        },
        {
          id: '2',
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'
        },
        {
          id: '3',
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'
        },
        {
          id: '4',
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'
        },
        {
          id: '5',
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'
        },
        {
          id: '6',
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png'
        }
      ],
      isDeleteing: false // 删除状态
    }
  },

  created() {
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },
    handleEdit() {
      this.$router.push({ path: '/material/matlib/libimagesetedit', query: { id: this.matId }})
    },
    // 点击删除图片按键
    isdeleteimg() {
      this.isDeleteing = true
    },
    // 删除保存
    savedetail() {
      this.isDeleteing = false
    },
    // 进入删除状态后删除单张图片
    deleteimg(item) {
      // console.log(item)
      // this.paperParams2.img_id = item.id
      this.$confirm('是否删除该张图片？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // delPaperListDetail(this.paperParams2).then((res) => {
          //   console.log(res)
          //   if (res.res === 0) {
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功'
          //     })
          //     this.dialogVisible = false
          //     this.getPaperList()
          //   }
          // })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 上传图片
    uploadFile(file) {
      console.log(file)
      // this.openFullScreen2()
      var formData = new FormData()
      formData.append('headimg', file.file)
      // paperListUpload(this.paperParams1, formData).then((res) => {
      //   console.log(res)
      //   this.imageUrl = this.url + res.image
      //   if (res.res === 0) {
      //     this.dialogVisible = false
      //     this.imageUrl = ''
      //     this.getPaperList()
      //     this.$message({
      //       type: 'success',
      //       message: '上传成功'
      //     })
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '上传失败'
      //     })
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
    },

    // 关闭上传图片弹窗
    handleClose(done) {
      this.$confirm('确认关闭？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
      .uploadsinglebtn {
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: #253647;
        color: white;
        border: none;
        margin-right: 0.5vw;
      }

      .uploadlebtn{
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: #253647;
        color: white;
        border: none;
        margin-right: 0.5vw;
      }
      .dellebtn{
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: transparent;
        color: #d79432;
        border: 1px solid #d79432;
        margin-right: 4vw;
      }
      .editlebtn{
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: transparent;
        color: #253647;
        border: 1px solid #253647;
        margin-right: 0.5vw;
      }
      .delImgs{
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: transparent;
        color: #f56c6c;
        border: 1px solid #f56c6c;
        margin-right: 0.5vw;
      }
    }
  }
}

// 主要内容区域（多个）
.images-wrapper {
  width: 100%;
  //height: 100%;
  margin-top: 10px;
  //height: calc(100vh - 5vh - 50px);
  //border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 单图模块
  .singleimage {
    position: relative;
    width: 20%; // (100-1*2)/5，根组件的左右margin为1%
    height: 230px;
    padding: 1% 5px 0 5px;
    //border: 1px solid blue;
    .block {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: flex-start;
      width: 100%;
      height: 100%;
      //border: 1px solid red;
      // 模块主图
      .appimg {
        width: 100%;
        height:85%;
      }
      // 删除状态下的删除栏
      .delete-img {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        position: absolute;
        bottom: 0;
        height: 15%;
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
  // 主要内容显示区域
  .content {
    width: 100%;
    //height: calc(100vh - 100px);
    //border: 1px solid red;

    // 左侧列表
    .content-top {
      width: 98%;
      margin-left: 1%;
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
      width: 100%;
      //height: 600px;
      border: 1px solid black;
      margin-top: 30px;
      //background-color: rgb(0,0,0,0.5);
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
