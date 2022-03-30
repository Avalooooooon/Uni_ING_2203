<template>
  <!-- ”小程序内容管理“——早安晚安——系列详情 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left"></i>
        {{ detailname }}
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            v-if="isDeleteing"
            type="primary"
            class="uploadsinglebtn"
            @click="savedetail"
            >保存</el-button
          >
          <el-button
            type="primary"
            class="uploadsinglebtn"
            detailid="002"
            detailname="品牌灵魂v2"
            @click="dialogVisible = true"
            >上传图片</el-button
          >
          <el-button type="primary" class="deletesinglebtn" @click="isdeleteimg"
            >删除图片</el-button
          >
        </div>
        <div class="btnsset">
          <el-button
            type="primary"
            class="editsetbtn"
            detailid="002"
            detailname="品牌灵魂v2"
            >编辑图集</el-button
          >
          <el-button type="primary" class="deletesetbtn" @click="deleteset"
            >删除图集</el-button
          >
        </div>
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
          action="/v3upload/admin_wx_wallpaper"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
    </el-dialog>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div class="singleimage" v-for="item in imgsData" :key="item.id">
        <div class="block">
          <img class="appimg" :src="'https://www.bizspace.cn' + item.image" />
          <div v-if="isDeleteing" ref="imgDelete" class="delete-img">
            <i class="el-icon-delete" @click="deleteimg(item)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchMorningListDetail,
  morningListUpload,
  delMorningListDetail,
} from "@/api/wxmorning";
import { getToken } from "@/utils/auth";
// import axios from 'axios'

export default {
  name: "DetailCheckImgsMorning",
  props: ["detailid", "detailname"],

  data() {
    return {
      isDeleteing: false, // 删除状态

      // 发送给后端的数据
      morningParams: {
        bizid: "uniwarm",
        token: getToken(),
        se_id: this.detailid,
        page: 0,
      },
      morningParams1: {
        bizid: "uniwarm",
        token: getToken(),
        s_id: this.detailid,
      },
      url: "https://www.bizspace.cn",
      morningParams2: {
        bizid: "uniwarm",
        token: getToken(),
        img_id: "",
      },

      // 后端传来的数据
      imgsData: [],

      dialogVisible: false, // 上传图片弹窗
      imageUrl: "",
    };
  },

  created() {
    // console.log(this.paperParams)
    this.getMorningList();
  },

  // mounted() {
  //   console.log(this.morningParams);

  //   fetchMorningListDetail(this.morningParams)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.imgsData = response.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },

  methods: {
    toback() {
      this.$router.go(-1);
    },

    getMorningList() {
      fetchMorningListDetail(this.morningParams)
        .then((response) => {
          console.log(response.data);
          this.imgsData = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // onChange(file) {
    //   console.log(file)
    //   this.headimg = file.file
    // const fr = new FileReader()
    // fr.readAsDataURL(file.raw)
    // fr.onload = () => {
    //   this.headimg = fr.result
    //   console.log(this.headimg)
    // }
    // },

    uploadFile(file) {
      console.log(file);
      var formData = new FormData();
      formData.append("headimg", file.file);
      morningListUpload(this.morningParams1, formData).then((res) => {
        console.log(res);
        this.imageUrl = this.url + res.image;
        if (res.res === 0) {
          this.$message({
            type: "success",
            message: "上传成功",
          });
          this.dialogVisible = false;
          this.imageUrl = "";
          this.getMorningList();
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
    },
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

    // 关闭上传图片弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 点击删除图片按键
    isdeleteimg() {
      this.isDeleteing = true;
    },

    // 点击删除图集按键
    deleteset() {
      this.$confirm("确定删除该图集？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs.img.src = this.uploadImage;
          this.$refs.imgDelete.style.display = "none";
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 进入删除状态后删除单张图片
    deleteimg(item) {
      // console.log(item)
      this.morningParams2.img_id = item.id;
      this.$confirm("是否删除该张图片？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          delMorningListDetail(this.morningParams2).then((res) => {
            console.log(res);
            if (res.res === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.dialogVisible = false;
              this.getMorningList();
            }
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // this.$confirm('是否删除该张图片?', '删除', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     this.$refs.img.src = this.uploadImage
      //     this.$refs.imgDelete.style.display = 'none'
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    },

    // 保存当前状态
    savedetail() {
      this.isDeleteing = false;
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
  height: 100%;
  margin: 0.7% 1%;
}

// 顶部区域
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 7vh;
  padding: 1.4% 0% 1% 0%;

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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 单图模块
  .singleimage {
    position: relative;
    width: 19.6%; // (100-1*2)/5，根组件的左右margin为1%
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
</style>