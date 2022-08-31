<template>
  <!-- ”app内容管理“——保养小知识——保养小知识详情-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        {{ detailname }}
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="uploadsinglebtn"
            listid="13"
            @click="saveAppDetail"
          >保存</el-button>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-left">
        <el-form
          ref="numberValidateForm"
          :model="numberValidateForm"
          label-width="100px"
          style="margin-top: 30px"
          class="demo-dynamic"
        >
          <el-form-item
            label="标题"
            prop="name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input
              v-model="numberValidateForm.name"
              placeholder="请输入名称"
              type="name"
              ocomplete="off"
            />
          </el-form-item>

          <el-form-item label="图片" prop="image" required>
            <!-- :http-request="uploadFile" -->
            <el-upload
              class="avatar-uploader"
              action="/v3upload/admin_person2"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadFile"
            >
              <img v-if="numberValidateForm" :src="url + numberValidateForm.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div style="margin-top: 20px">（ 上传图片推荐尺寸：700 * 395 分辨率 ） </div>
          </el-form-item>

          <!-- <el-form-item label="专业" prop="major">
            <el-input
              v-model.number="numberValidateForm.major"
              placeholder="请输入专业名称"
              type="age"
              ocomplete="off"
            />
          </el-form-item>

          <el-form-item label="任职" prop="position">
            <el-input
              v-model.number="numberValidateForm.position"
              placeholder="请输入职位名称"
              type="age"
              ocomplete="off"
            />
          </el-form-item>

          <el-form-item label="所在国家" prop="country">
            <el-input
              v-model.number="numberValidateForm.country"
              placeholder="请输入国家名称"
              type="age"
              ocomplete="off"
            />
          </el-form-item> -->


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
  fetchKnowledgeListDetail,
  knowledgeListUpload
} from '@/api/appknowledge'
import { getToken } from '@/utils/auth'
import Tinymce from '@/components/Tinymce'
import axios from 'axios'
// import axios from 'axios'

export default {
  name: 'DetailCheckImgsKnowledge',
  components: { Tinymce },
  props: ['detailid', 'detailname'],
  data() {
    return {
      url: 'https://www.uniwarm.net',
      imageUrl: '',
      numberValidateForm: {
        name: '',
        content: '',
        image: ''
        // major: '',
        // position: '',
        // country: ''
      },
      listid: 13,

      // 发送给后端的数据
      knowledgeParams: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 13,
        itemid: this.detailid
      },
      knowledgeParams1: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 13
      },

      // 后端传来的数据
      knowledgeData: []
    }
  },

  created() {
    this.getKnowledgeList()
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },

    // 重新请求数据并刷新
    getKnowledgeList() {
      fetchKnowledgeListDetail(this.knowledgeParams)
        .then((response) => {
          console.log(response.detail)
          this.knowledgeData = response.detail
          this.numberValidateForm.name = this.knowledgeData.name
          this.numberValidateForm.image = this.knowledgeData.image
          this.numberValidateForm.major = this.knowledgeData.major
          this.numberValidateForm.position = this.knowledgeData.position
          this.numberValidateForm.country = this.knowledgeData.country
          this.numberValidateForm.content = this.knowledgeData.content
          // console.log(this.url + this.numberValidateForm.image)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 点击保存按钮
    saveAppDetail() {
      if (this.numberValidateForm.name === '') {
        this.$message({
          type: 'warning',
          message: '标题不能为空！'
        })
      } else if (this.numberValidateForm.image === '') {
        this.$message({
          type: 'warning',
          message: '图片不能为空！'
        })
      } else {
        this.$confirm('确定保存本次编辑？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            axios({
              url: '/erp/v3/news/erp_edit',
              method: 'post',
              params: {
                bizid: 'uniwarm',
                token: getToken(),
                listid: this.listid,
                itemid: this.detailid
              },
              data: this.numberValidateForm,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              console.log(this.knowledgeParams)
              console.log(this.numberValidateForm)
              console.log(res)
              if (res.data.res === 0) {
                this.$router.go(-1)
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
            })

            // this.$refs.img.src = this.uploadImage
            // this.$refs.imgDelete.style.display = 'none'
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消保存'
            })
          })
      }
    },

    // 上传照片
    uploadFile(file) {
      console.log(file)
      var formData = new FormData()
      formData.append('headimg', file.file)
      knowledgeListUpload(this.knowledgeParams1, formData).then((res) => {
        console.log(res)
        this.numberValidateForm.image = res.image
        if (res.res === 0) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          // this.getKnowledgeList()
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
          width: 350px;
          height: 200px;
          line-height: 200px;
          text-align: center;
        }
        // 主图
        .avatar {
          width: 350px;
          height: 200px;
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
