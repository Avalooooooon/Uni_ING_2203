<template>
  <!-- ”app内容管理“——设计师——新增设计师-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        {{ listid }}：新增设计师
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="uploadsinglebtn"
            listid="8"
            @click="saveAppDetail"
          >提交</el-button>
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
            label="姓名"
            prop="name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input
              v-model.number="numberValidateForm.name"
              placeholder="请输入名称"
              type="age"
              style="width: 250px"
              ocomplete="off"
            />
          </el-form-item>

          <el-form-item label="照片" prop="image" required>
            <!-- :http-request="uploadFile" -->
            <el-upload
              class="avatar-uploader"
              action="/v3upload/admin_wx_xxx"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>

          <el-form-item label="专业" prop="major">
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
  fetchDesignerListDetail,
  designerListUpload,
  delDesignerListDetail,
} from "@/api/appdesigner";
import { getToken } from "@/utils/auth";
import Tinymce from "@/components/Tinymce";
// import axios from 'axios'

export default {
  name: "AddDesigner",
  components: { Tinymce },
  props: ["listid"],
  data() {
    return {
      url: "https://www.bizspace.cn",
      imageUrl: "",
      numberValidateForm: {
        name: "",
        content: "",
        image: "",
        major: "",
        position: "",
        country: "",
      },

      // 发送给后端的数据
      designerParams: {
        bizid: "uniwarm",
        token: getToken(),
        listid: 8,
        itemid: this.detailid,
      },
      designerParams1: {
        bizid: "uniwarm",
        token: getToken(),
        s_id: this.detailid,
      },
      designerParams2: {
        bizid: "uniwarm",
        token: getToken(),
        img_id: "",
      },

      // 后端传来的数据
      designerData: [],
    };
  },

  created() {
    // this.getDesignerList();
  },

  methods: {
    toback() {
      this.$router.go(-1);
    },

    getDesignerList() {
      fetchDesignerListDetail(this.designerParams)
        .then((response) => {
          console.log(response.detail);
          this.designerData = response.detail;
          this.numberValidateForm.name = this.designerData.name;
          // this.imageUrl = this.url + this.designerData.image;
          this.numberValidateForm.major = this.designerData.major;
          this.numberValidateForm.position = this.designerData.position;
          this.numberValidateForm.country = this.designerData.country;
          this.numberValidateForm.content = this.designerData.content;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击保存按钮
    saveAppDetail() {
      this.$confirm('确定提交本次新增？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.$refs.img.src = this.uploadImage
          // this.$refs.imgDelete.style.display = 'none'
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          })
        })
    },

    uploadFile(file) {
      console.log(file);
      var formData = new FormData();
      formData.append("headimg", file.file);
      // morningListUpload(this.morningParams1, formData).then((res) => {
      //   console.log(res)
      //   this.imageUrl = this.url + res.image
      //   if (res.res === 0) {
      //     this.$message({
      //       type: 'success',
      //       message: '上传成功'
      //     })
      //     this.imageUrl = ''
      //     this.getMorningList()
      //   }
      // })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 上传开始前判断待上传图片是否符合格式要求
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    
  },
};
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
