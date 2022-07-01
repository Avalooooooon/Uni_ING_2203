<template>
  <!-- ”app内容管理“——设计师——新增设计师-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        新增设计师
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="uploadsinglebtn"
            listid="8"
            @click="saveAppDetail('numberValidateForm')"
          >提交</el-button>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-left">
        <el-form
          ref="numberValidateForm"
          :model="numberValidateForm"
          :rules="rules"
          label-width="100px"
          style="margin-top: 30px"
          class="demo-dynamic"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="numberValidateForm.name"
              placeholder="请输入名称"
              type="age"
              style="width: 250px"
              ocomplete="off"
            />
          </el-form-item>

          <!-- :on-change="handlePictureCardPreview" -->
          <el-form-item label="照片" prop="image">
            <el-upload
              class="avatar-uploader"
              action="/v3upload/admin_person2"
              :auto-upload="false"
              :file-list="filelist"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadFile"
              :on-change="handlePictureCardPreview"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div style="margin-top: 20px">（ 上传图片推荐尺寸：750 * 1000 分辨率 ） </div>
          </el-form-item>

          <el-form-item label="专业" prop="major">
            <el-input
              v-model="numberValidateForm.major"
              placeholder="请输入专业名称"
              type="age"
              ocomplete="off"
            />
          </el-form-item>

          <el-form-item label="任职" prop="position">
            <el-input
              v-model="numberValidateForm.position"
              placeholder="请输入职位名称"
              type="age"
              ocomplete="off"
            />
          </el-form-item>

          <el-form-item label="所在国家" prop="country">
            <el-input
              v-model="numberValidateForm.country"
              placeholder="请输入国家名称"
              type="age"
              ocomplete="off"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="content-right">
        <Tinymce
          ref="editor"
          v-model="numberValidateForm.content"
          style="margin-top: 0px"
          :width="590"
          :height="700"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  addDesignerList,
  designerListUpload,
  setDesignerImage
} from '@/api/appdesigner'
import { getToken } from '@/utils/auth'
import Tinymce from '@/components/Tinymce'
import axios from 'axios'

// import axios from 'axios'

export default {
  name: 'AddDesigner',
  components: { Tinymce },
  props: ['listid'],
  data() {
    return {
      url: 'https://www.bizspace.cn',
      imageUrl: '',
      numberValidateForm: {
        name: '',
        content: '',
        image: '',
        major: '',
        position: '',
        country: ''
      },
      // 上传列表
      filelist: [],
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        image: [{ required: true, message: ' ', trigger: 'blur' }]
      },

      // 发送给后端的数据
      designerParams: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: this.listid
      },
      designerParams1: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 8
      },

      // 后端传来的数据
      designerData: []
    }
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },

    // 点击保存按钮
    saveAppDetail(formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        if (this.numberValidateForm.name) {
          if (this.numberValidateForm.image) {
            this.$confirm('确定提交本次新增？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() =>
                axios({
                  url: '/api/v3/person2/erp_add',
                  method: 'post',
                  params: {
                    bizid: 'uniwarm',
                    token: getToken(),
                    listid: this.listid
                  },
                  data: this.numberValidateForm,
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then((res) => {
                  console.log(this.designerParams)
                  console.log(this.numberValidateForm)
                  console.log(res)
                  if (res.data.res === 0) {
                    this.$router.go(-1)
                    this.$message({
                      type: 'success',
                      message: '上传成功'
                    })
                  } else {
                    this.$message({
                      type: 'error',
                      message: '上传失败'
                    })
                  }
                })
              )
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消上传'
                })
              })
          } else {
            this.$alert('请上传设计师照片')
            return false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    uploadFile(file) {
      console.log(file)
      var formData = new FormData()
      // formData.append("headimg", file.file);
      formData.append('headimg', this.filelist[0].raw)
      designerListUpload(this.designerParams1, formData).then((res) => {
        console.log(res)
        this.numberValidateForm.image = res.image
        this.imageUrl = this.url + res.image
        console.log(this.imageUrl)
        if (res.res === 0) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        }
      })
    },

    handleAvatarSuccess() {
      this.numberValidateForm.image = this.url + res.image
      // this.$refs.numberValidateForm.resetFields(); //清除图片校验文字
    },

    // on-change事件，判断图片类型、大小、尺寸是否符合要求
    handlePictureCardPreview(file) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.raw.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传的照片只能是 JPG 格式!')
        this.filelist.pop()
        return false
      }
      if (!isLt5M) {
        this.$message.error('上传的照片大小不能超过 5MB!')
        this.filelist.pop()
        return false
      }

      const url = URL.createObjectURL(file.raw)
      new Promise(function(resolve, reject) {
        const width = 750
        const height = 1000
        const img = new Image()
        img.onload = function() {
          const valid = img.width === width && img.height === height
          valid ? resolve() : reject()
        }
        img.src = url
      }).then(
        () => {
          this.filelist.push(file)
          const truefile = this.filelist[0]
          console.log(truefile)
          this.uploadFile(truefile)
          return file
        },
        () => {
          this.$message.error('上传图片推荐尺寸为 750 * 1000 且为 jpg 格式 !')
          this.filelist.pop()
          return Promise.reject()
        }
      )
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
    }
  }
}
// 主要内容显示区域
.content {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;

  // 左侧列表
  .content-left {
    width: 40%;
    height: 100%;
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
          border: 1px dashed gray;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: lightgray;
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
</style>
