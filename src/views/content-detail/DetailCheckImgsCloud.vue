<template>
  <!-- ”APP内容管理“——云资源——系列详情 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        云资源-{{ detailname }}
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="uploadsinglebtn"
            detailid="002"
            detailname="品牌灵魂v2"
            @click="dialogVisibleType = true"
            >上传资源</el-button
          >
        </div>
      </div>
    </div>

    <!-- 弹窗1: 类型选择-->
    <el-dialog
      title="请选择素材类型进行上传"
      :visible.sync="dialogVisibleType"
      width="30%"
      center
    >
      <div class="dialogContent">
        <div class="uploadType">
          <div
            class="typeImg"
            @click="
              isImg = true;
              dialogVisible = true;
            "
          >
            <img
              style="
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin-bottom: 20px;
              "
              src="../../assets/tuji.png"
              alt=""
            /><br />
            <span>图片素材</span>
          </div>
        </div>
        <div class="uploadType">
          <div
            class="typeImg"
            @click="
              isImg = false;
              dialogVisible = true;
            "
          >
            <img
              style="
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin-bottom: 20px;
              "
              src="../../assets/video.png"
              alt=""
            /><br />
            <span>视频素材</span>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button class="resetlebtn" @click="dialogVisibleType = false"
          >取 消</el-button
        >
        <el-button
          class="filterlebtn"
          type="primary"
          @click="dialogVisibleType = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 弹窗2:上传图片素材 -->
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      v-if="isImg === true"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @close="closeImg()"
    >
      <div style="width: 100%; padding-bottom: 50px; text-align: center">
        <div v-if="beforeUp" class="beforeUp">
          <div v-if="showEmpty" class="showEmpty">
            <div class="typeImg">
              <img
                style="
                  width: 30px;
                  height: 30px;
                  vertical-align: middle;
                  margin-bottom: 20px;
                "
                src="../../assets/tupian.png"
                alt=""
              /><br />
            </div>
          </div>
          <div v-if="showEmpty" style="width: 100%; margin-top: 30px">
            （ 上传格式：仅支持jpg格式，分辨率不超过 200 * 200，大小不超过 299M
            ）
          </div>

          <el-upload
            ref="upload"
            class="upload-demo"
            action="/v3upload/admin_wx_wallpaper"
            :before-remove="beforeRemove"
            multiple
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleChange"
            :on-remove="onRemove"
          >
            <el-button v-if="showEmpty" class="addbtn" type="primary"
              >点击上传</el-button
            >
            <div v-if="showHave" class="continueBtn">
              <el-button class="showHaveAdd" type="primary">添加图片</el-button>
            </div>
          </el-upload>
          <div
            v-if="showHave"
            class="uploadBtn"
            style="width: 100%; margin-top: 10vh"
          >
            <el-button
              class="showHaveAddBtn"
              type="primary"
              @click="submitUpload()"
              >开始上传</el-button
            >
          </div>
        </div>
        <div v-if="loading && isImg" style="width: 100%">
          正在上传图片 {{ this.num }} / {{ this.fileListTotal }} ，请耐心等待...
        </div>
        <div
          v-if="afterUp && isImg"
          style="width: 300px; margin: 0 auto; text-align: center"
        >
          <div class="typeImg">
            <img
              style="
                width: 60px;
                height: 60px;
                vertical-align: middle;
                margin-bottom: 40px;
              "
              src="../../assets/success.png"
              alt=""
            />
            <div>上传完成</div>
          </div>
          <div v-if="errorList" style="width: 100%; padding: 30px">
            <span
              style="
                width: 100%;
                text-align: center;
                margin-bottom: 15px;
                font-weight: bold;
              "
              >部分图片上传失败，请查阅</span
            ><br />
            <div
              style="width: 100%; text-align: center; margin-top: 10px"
              v-for="item in errorFileName"
              :key="item"
            >
              <div style="color: red; margin-top: 3px">{{ item }}</div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 弹窗3:上传视频素材 -->
    <el-dialog
      title="上传视频"
      :visible.sync="dialogVisible"
      v-if="isImg === false"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @close="closeVideo()"
    >
      <div style="width: 100%; padding-bottom: 50px; text-align: center">
        <div v-if="beforeUp" class="beforeUp">
          <div v-if="showEmpty" class="showEmpty">
            <div class="typeImg">
              <img
                style="
                  width: 30px;
                  height: 30px;
                  vertical-align: middle;
                  margin-bottom: 20px;
                "
                src="../../assets/tupian.png"
                alt=""
              /><br />
            </div>
          </div>
          <div v-if="showEmpty" style="width: 100%; margin-top: 30px">
            （ 上传格式：视频仅支持？？？格式，分辨率不超过
            ？？？？？，大小不超过 ？？？？？ ）
          </div>

          <el-upload
            ref="upload"
            class="upload-demo"
            action="/v3upload/admin_wx_wallpaper"
            :before-remove="beforeRemove"
            multiple
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleChange"
            :on-remove="onRemove"
          >
            <el-button v-if="showEmpty" class="addbtn" type="primary"
              >点击上传</el-button
            >
            <div v-if="showHave" class="continueBtn">
              <el-button class="showHaveAdd" type="primary">添加图片</el-button>
            </div>
          </el-upload>
          <div
            v-if="showHave"
            class="uploadBtn"
            style="width: 100%; margin-top: 10vh"
          >
            <el-button
              class="showHaveAddBtn"
              type="primary"
              @click="submitUpload()"
              >开始上传</el-button
            >
          </div>
        </div>
        <div v-if="loading && isImg" style="width: 100%">
          正在上传图片 {{ this.num }} / {{ this.fileListTotal }} ，请耐心等待...
        </div>
        <div
          v-if="afterUp && isImg"
          style="width: 300px; margin: 0 auto; text-align: center"
        >
          <div class="typeImg">
            <img
              style="
                width: 60px;
                height: 60px;
                vertical-align: middle;
                margin-bottom: 40px;
              "
              src="../../assets/success.png"
              alt=""
            />
            <div>上传完成</div>
          </div>
          <div v-if="errorList" style="width: 100%; padding: 30px">
            <span
              style="
                width: 100%;
                text-align: center;
                margin-bottom: 15px;
                font-weight: bold;
              "
              >部分图片上传失败，请查阅</span
            ><br />
            <div
              style="width: 100%; text-align: center; margin-top: 10px"
              v-for="item in errorFileName"
              :key="item"
            >
              <div style="color: red; margin-top: 3px">{{ item }}</div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div v-for="item in imgsData" :key="item.id" class="singleimage">
        <div class="block">
          <img class="appimg" :src="'https://www.uniwarm.net' + item.image" />
          <div
            v-if="isDeleteing"
            ref="imgDelete"
            class="delete-img"
            @click="deleteimg(item)"
          >
            <i class="el-icon-delete" />
          </div>
        </div>
      </div>
      <div class="footer" v-if="showPag">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          :page-size="pagerow"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import {
  fetchMemeListDetail,
  memeListUpload,
  delMemeListDetail,
} from "@/api/appcloud";
import { getToken } from "@/utils/auth";

export default {
  name: "DetailCheckImgsCloud",
  props: ["detailid", "detailname"],

  data() {
    return {
      isDeleteing: true, // 删除状态
      isImg: "", // 要上传的素材类型是否为图片
      showPag: false,
      showEmpty: true,
      showHave: false,
      beforeUp: true,
      afterUp: false,
      hidden: true,
      loading: false,
      fileList: [],
      // 发送给后端的数据
      memeParams: {
        bizid: "uniwarm",
        token: getToken(),
        se_id: this.detailid,
        page: 0,
      },
      memeParams1: {
        bizid: "uniwarm",
        token: getToken(),
        s_id: this.detailid,
      },
      url: "https://www.uniwarm.net",
      memeParams2: {
        bizid: "uniwarm",
        token: getToken(),
        img_id: "",
      },
      page: 1,

      // 后端传来的数据
      imgsData: [],
      total: 0,
      pagerow: 20,
      dialogVisibleType: false, // 上传资源-选择类型弹窗
      dialogVisible: false, // 上传图片/视频弹窗
      imageUrl: "",
      nowTag: "",
      fileTotal: "",
      num: 1,
      tag: "",
      fileListTotal: "",
      errorList: false,
      errorFileName: [],
      fileName: "",
    };
  },

  created() {
    // console.log(this.paperParams)
    this.getMemeList();
  },

  methods: {
    toback() {
      this.$router.go(-1);
    },

    getMemeList() {
      this.memeParams.page = this.page - 1;
      fetchMemeListDetail(this.memeParams)
        .then((response) => {
          console.log(response.data);
          this.total = response.total;
          this.imgsData = response.data;
          if (this.imgsData.length > 0) {
            this.showPag = true;
          } else {
            this.showPag = false;
          }
          // this.memeParams.page = this.memeParams.page + 1
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分页器
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.page = currentPage;
      console.log(this.memeParams.page);
      this.getMemeList();
    },

    handleChange(file) {
      console.log("tett", this.fileList);
      console.log("handleChange::file", file);
      this.fileList.push(file);
      console.log("handleChange", this.fileList);
      this.showEmpty = this.fileList.length === 0;
      if (this.fileList.length !== 0) {
        this.showHave = true;
      }
      console.log(this.showEmpty);
    },
    // 删除文件之前的钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onRemove(file, fileList) {
      this.fileList = fileList;
      this.showEmpty = this.fileList.length === 0;
    },
    // 延迟的方法
    sleep(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime) return;
      }
    },
    submitUpload() {
      this.beforeUp = false;
      this.loading = true;
      this.fileListTotal = this.fileList.length;
      // 定义定时器开始时间为1
      let num = 1;
      // 顶一个定时器
      const timer = setInterval(() => {
        this.num = num;
        // 变量一直++
        num++;
        // 清除定时器
        if (num > this.fileList.length) {
          clearInterval(timer);
          setTimeout(() => {
            for (let i = 0; i < this.fileList.length; i++) {
              const file = this.fileList[i];
              const formData = new FormData();
              formData.append("headimg", file.raw);
              this.fileName = file.raw.name;
              console.log(this.fileName);
              memeListUpload(this.memeParams1, formData)
                .then((res) => {
                  console.log("morningListUpload => res", res);
                  if (res.res === 0) {
                    this.getMemeList();
                    this.fileList.length = 0;
                    this.fileList = [];
                    this.num = 1;
                    this.loading = false;
                    this.afterUp = true;
                    setTimeout(() => {
                      this.dialogVisible = false;
                      this.showEmpty = true;
                      this.showHave = false;
                      this.beforeUp = true;
                      this.afterUp = false;
                      this.loading = false;
                    }, 2000);
                  }
                })
                .catch(() => {
                  console.log(file.raw.name);
                  this.$message.error("部分图片上传失败！");
                  this.errorFileName.push(file.raw.name);
                  console.log(this.errorFileName);
                  this.errorList = true;
                  this.loading = false;
                  this.afterUp = true;
                  this.num = 1;
                });
            }
          }, 2000);
        }
      }, 500);
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        if (!isPNG) {
          this.$message.error("上传图片只能是 JPG, PNG 格式!");
        }
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG || (isPNG && isLt2M);
    },

    // 关闭上传图片弹窗
    handleClose(done) {
      done();
      this.fileList.length = 0;
      this.fileList = [];
      this.showEmpty = true;
      this.showHave = false;
      this.beforeUp = true;
      this.afterUp = false;
      this.loading = false;
      this.errorList = false;
      this.errorFileName = [];
      this.isImg = "";
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
      this.memeParams2.img_id = item.id;
      this.$confirm("是否删除该张图片？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMemeListDetail(this.memeParams2).then((res) => {
            console.log(res);
            if (res.res === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.dialogVisible = false;
              const totalPage = Math.ceil((this.total - 1) / this.pagerow);
              const currentPage = this.page > totalPage ? totalPage : this.page;
              this.page = currentPage < 0 ? 0 : currentPage;
              console.log(this.imgsData);
              console.log(this.imgsData.length);
              if (this.imgsData.length === 1) {
                console.log("该系列暂无内容");
                fetchMemeListDetail(this.memeParams)
                  .then((response) => {
                    console.log(response.data);
                    this.total = response.total;
                    this.imgsData = response.data;
                    if (this.imgsData.length > 0) {
                      this.showPag = true;
                    } else {
                      this.showPag = false;
                    }
                    // this.memeParams.page = this.memeParams.page + 1
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else if (this.imgsData.length > 1) {
                this.getMemeList();
              }
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
  height: calc(100vh - 50px);
  overflow-y: scroll;
  margin: 0 1%;
}

// 弹窗区域
.dialogContent {
  width: 100%;
  padding: 0 10px;
  text-align: center;
  //border: 1px solid black;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  .uploadType {
    width: 45%;
    height: 150px;
    //border: 1px solid red;
    .typeImg {
      height: 150px;
      border: 1px solid lightgray;
      border-radius: 5px;
      overflow: hidden;
      display: table-cell;
      width: 250px;
      vertical-align: middle;
      //background-color: rgb(0,0,0,0.5);
      cursor: pointer;
    }
    .typeTitle {
      width: 100%;
      height: 50px;
      //border: 1px solid blue;
      text-align: center;
      line-height: 50px;
    }
  }
}

.dialog-footer {
  .resetlebtn {
    height: 3vh;
    width: 5vw;
    padding: 0;
    background-color: transparent;
    color: #253647;
    border: 1px solid #253647;
    margin-right: 0.5vw;
  }
  .filterlebtn {
    height: 3vh;
    width: 5vw;
    padding: 0;
    background-color: #253647;
    color: white;
    border: none;
    margin-right: 0.5vw;
  }
}

.showEmpty {
  width: 50%;
  //border: 1px solid blue;
  margin: 0 auto;
  .typeImg {
    width: 100%;
    height: 150px;
    border: 1px solid lightgray;
    border-radius: 5px;
    line-height: 150px;
    //overflow: hidden;
    //display: table-cell;
    //vertical-align: middle;
    //padding-bottom: 30px;
  }
}
.upload-demo {
  //border: 1px solid black;
  position: relative;
  .addbtn {
    height: 3vh;
    width: 10vw;
    padding: 0;
    background-color: #253647;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 40px;
    position: absolute;
    bottom: -5vh;
    right: calc(50% - 5vw);
  }
  .continueBtn {
    width: 100%;
    //border:1px solid black;
    margin-top: 20px;
    display: flex;
    justify-content: space-around; //每个项目两侧的间隔相等align-items: center;
    position: absolute;
    bottom: -8vh;
    right: 0;
    .showHaveAdd {
      width: 14vw;
      height: 3vh;
      padding: 0;
      border: none;
      border: 1px solid #253647;
      background-color: white;
      color: #253647;
    }
    .showHaveAddBtn {
      width: 14vw;
      height: 3vh;
      padding: 0;
      border: none;
      background-color: #253647;
      color: white;
    }
    //.showHaveUploadBtn{
    //  width: 14vw;
    //  height: 3vh;
    //  padding: 0;
    //  border: none;
    //  background-color: #253647;
    //  color: white;
    //  display: flex;
    //  justify-content: flex-end;
    //}
  }
}

.uploadBtn {
  .showHaveAddBtn {
    width: 14vw;
    height: 3vh;
    padding: 0;
    border: none;
    background-color: #253647;
    color: white;
  }
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 单图模块
  .singleimage {
    position: relative;
    width: 15%; // (100-1*2)/5，根组件的左右margin为1%
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

        width: 40px;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        height: 40px;
        line-height: 40px;
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
.footer {
  width: 100%;
  //border: 1px solid black;
  margin-top: 30px;
  text-align: center;
  .el-pagination {
    margin-bottom: 40px;
  }
}
</style>
  