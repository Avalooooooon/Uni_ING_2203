<template>
  <!-- ”小程序内容管理“——壁纸——系列详情 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        {{ detailname }}
      </div>
      <div class="btns">
        <div class="btnsimg">
<!--          <el-button-->
<!--            v-if="isDeleteing"-->
<!--            type="primary"-->
<!--            class="uploadsinglebtn"-->
<!--            @click="savedetail"-->
<!--          >保存</el-button>-->
          <el-button
            type="primary"
            class="uploadsinglebtn"
            detailid="002"
            detailname="品牌灵魂v2"
            @click="dialogVisible = true"
          >上传图片</el-button>
<!--          <el-button-->
<!--            type="primary"-->
<!--            class="deletesinglebtn"-->
<!--            @click="isdeleteimg"-->
<!--          >删除图片</el-button>-->
        </div>
        <!--        <div class="btnsset">-->
        <!--          <el-button-->
        <!--            type="primary"-->
        <!--            class="editsetbtn"-->
        <!--            detailid="002"-->
        <!--            detailname="品牌灵魂v2"-->
        <!--          >编辑图集</el-button>-->
        <!--          <el-button-->
        <!--            type="primary"-->
        <!--            class="deletesetbtn"-->
        <!--            @click="deleteset"-->
        <!--          >删除图集</el-button>-->
        <!--        </div>-->
      </div>
    </div>

<!--    &lt;!&ndash;上传图片弹窗&ndash;&gt;-->
<!--    <el-dialog-->
<!--      title="上传图片"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%"-->
<!--      :before-close="handleClose"-->
<!--    >-->
<!--      <div style="width: 100%; text-align: center">-->
<!--        <el-upload-->
<!--          class="avatar-uploader"-->
<!--          list-type="picture-card"-->
<!--          action="/v3upload/admin_wx_wallpaper"-->
<!--          :show-file-list="false"-->
<!--          :on-success="handleAvatarSuccess"-->
<!--          :before-upload="beforeAvatarUpload"-->
<!--          :http-request="uploadFile"-->
<!--        >-->
<!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--          <i v-else class="el-icon-plus avatar-uploader-icon" />-->
<!--        </el-upload>-->
<!--        <div style="width: 100%;margin-top: 30px">分辨率推荐1125 x 2436像素（竖屏），大小不超过 2MB</div>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <!--上传图片弹窗-->
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div style="width: 100%; padding-bottom: 50px; text-align: center;">

        <div v-if="beforeUp" class="beforeUp">
          <div v-if="showEmpty" class="showEmpty">
            <div class="typeImg">
              <img style="width: 30px;height: 30px;vertical-align:middle; margin-bottom: 20px" src="../../assets/tupian.png" alt=""><br>
              <!--<span>点击选择图片</span>-->
            </div>
          </div>
          <div v-if="showEmpty" style="width: 100%;margin-top: 30px;">（ 上传格式：仅支持jpg格式，分辨率不超过 200 * 200，大小不超过 299M ）</div>

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
            <el-button v-if="showEmpty" class="addbtn" type="primary">点击上传</el-button>
            <div v-if="showHave" class="continueBtn">
              <el-button class="showHaveAdd" type="primary">添加图片</el-button>
            </div>
          </el-upload>
          <div v-if="showHave" class="uploadBtn" style="width: 100%; margin-top: 10vh;">
            <el-button class="showHaveAddBtn" type="primary" @click="submitUpload()">开始上传</el-button>
          </div>
        </div>
        <div v-if="loading" style="width: 100%">
          正在上传图片 {{ this.num }} / {{ this.fileListTotal }} ，请耐心等待...
        </div>
        <div v-if="afterUp" style="width: 300px;margin: 0 auto;text-align: center">
          <div class="typeImg">
            <img style="width: 60px;height: 60px;vertical-align:middle; margin-bottom: 40px" src="../../assets/success.png" alt="">
            <div>上传完成</div>
          </div>
          <div v-if="errorList" style="width: 100%;padding: 30px;">
            <span style="width: 100%;text-align: center;margin-bottom: 15px;font-weight: bold;">部分图片上传失败，请查阅</span><br>
            <div style="width: 100%;text-align: center;margin-top: 10px" v-for="item in errorFileName" :key="item">
              <div style="color: red; margin-top: 3px">{{item}}</div><br>
            </div>
          </div>
        </div>

      </div>
    </el-dialog>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div v-for="item in imgsData" :key="item.id" class="singleimage">
        <div class="block">
          <img class="appimg" :src="'https://www.bizspace.cn' + item.image">
          <div v-if="isDeleteing" ref="imgDelete" class="delete-img" @click="deleteimg(item)">
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
  fetchPaperListDetail,
  paperListUpload,
  delPaperListDetail
} from '@/api/wxwallpaper'
import { getToken } from '@/utils/auth'
import {fetchMemeListDetail, memeListUpload} from "@/api/wxmeme";
import {morningListUpload} from "@/api/wxmorning";
// import axios from 'axios'

export default {
  name: 'DetailCheckImgs',
  props: ['detailid', 'detailname'],

  data() {
    return {
      isDeleteing: true, // 删除状态
      showEmpty: true,
      showHave: false,
      beforeUp: true,
      afterUp: false,
      hidden: true,
      loading: false,
      fileList: [],
      // 发送给后端的数据
      paperParams: {
        bizid: 'uniwarm',
        token: getToken(),
        se_id: this.detailid,
        page: 0
      },
      showPag: false,
      paperParams1: {
        bizid: 'uniwarm',
        token: getToken(),
        s_id: this.detailid
      },
      url: 'https://www.bizspace.cn',
      paperParams2: {
        bizid: 'uniwarm',
        token: getToken(),
        img_id: ''
      },

      // 后端传来的数据
      imgsData: [],
      total: 0,
      pagerow: 20,
      page: 1,

      dialogVisible: false, // 上传图片弹窗
      imageUrl: '',
      nowTag: '',
      fileTotal: '',
      num: 1,
      tag: '',
      fileListTotal: '',
      errorList: false,
      errorFileName: [],
      fileName: ''
    }
  },

  created() {
    // console.log(this.paperParams)
    this.getPaperList()
  },
  methods: {
    toback() {
      this.$router.go(-1)
    },

    getPaperList() {
      this.paperParams.page = this.page - 1
      fetchPaperListDetail(this.paperParams)
        .then((response) => {
          console.log(response.data)
          this.total = response.total
          this.imgsData = response.data
          if (this.imgsData.length > 0) {
            this.showPag = true
          } else {
            this.showPag = false
          }
          // this.paperParams.page = this.paperParams.page + 1
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 分页器
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.page = currentPage
      console.log(this.paperParams.page)
      this.getPaperList()
    },

    // openFullScreen2() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    //   setTimeout(() => {
    //     loading.close()
    //   }, 2000)
    // },
    handleChange(file) {
      console.log('tett', this.fileList)
      console.log('handleChange::file', file)
      this.fileList.push(file)
      console.log('handleChange', this.fileList)
      this.showEmpty = this.fileList.length === 0
      if (this.fileList.length !== 0) {
        this.showHave = true
      }
      console.log(this.showEmpty)
    },

    // uploadFile(file) {
    //   console.log(file)
    //   var formData = new FormData()
    //   formData.append('headimg', file.file)
    //   morningListUpload(this.morningParams1, formData).then((res) => {
    //     console.log(res)
    //     this.imageUrl = this.url + res.image
    //     if (res.res === 0) {
    //       this.$message({
    //         type: 'success',
    //         message: '上传成功'
    //       })
    //       this.dialogVisible = false
    //       this.imageUrl = ''
    //       this.getMorningList()
    //     }
    //   })
    // },
    // 删除文件之前的钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
      this.showEmpty = this.fileList.length === 0
    },
    // 延迟的方法
    sleep(numberMillis) {
      var now = new Date()
      var exitTime = now.getTime() + numberMillis
      // eslint-disable-next-line no-constant-condition
      while (true) {
        now = new Date()
        if (now.getTime() > exitTime) return
      }
    },
    submitUpload() {
      this.beforeUp = false
      this.loading = true
      this.fileListTotal = this.fileList.length
      // 定义定时器开始时间为1
      let num = 1
      // 顶一个定时器
      const timer = setInterval(() => {
        this.num = num
        // 变量一直++
        num++
        // 清除定时器
        if (num > this.fileList.length) {
          clearInterval(timer)
          setTimeout(() => {
            for (let i = 0; i < this.fileList.length; i++) {
              const file = this.fileList[i]
              const formData = new FormData()
              formData.append('headimg', file.raw)
              this.fileName = file.raw.name
              console.log(this.fileName)
              paperListUpload(this.paperParams1, formData).then((res) => {
                console.log('morningListUpload => res', res)
                if (res.res === 0) {
                  this.getPaperList()
                  this.fileList.length = 0
                  this.fileList = []
                  this.num = 1
                  this.loading = false
                  this.afterUp = true
                  setTimeout(() => {
                    this.dialogVisible = false
                    this.showEmpty = true
                    this.showHave = false
                    this.beforeUp = true
                    this.afterUp = false
                    this.loading = false
                  }, 2000)
                }
              })
                .catch(() => {
                  console.log(file.raw.name)
                  this.$message.error('部分图片上传失败！')
                  this.errorFileName.push(file.raw.name)
                  console.log(this.errorFileName)
                  this.errorList = true
                  this.loading = false
                  this.afterUp = true
                  this.num = 1
                })
            }
          }, 2000)
        }
      }, 500)
      // this.beforeUp = false
      // this.loading = true
      // // 定义定时器开始时间为0
      // let progressnuw = 0
      // // 顶一个定时器
      // const timer = setInterval(() => {
      //   // 变量一直++
      //   progressnuw++
      //   // 获取重新赋值
      //   this.nuw = progressnuw
      //   // 清楚定时器
      //   if (progressnuw >= 100) {
      //     clearInterval(timer)
      //     this.num = 0
      //     setTimeout(() => {
      //       for (let i = 0; i < this.fileList.length; i++) {
      //         const file = this.fileList[i]
      //         const formData = new FormData()
      //         formData.append('headimg', file.raw)
      //         console.log(formData)
      //         paperListUpload(this.paperParams1, formData).then((res) => {
      //           console.log(res)
      //           if (res.res === 0) {
      //             this.getPaperList()
      //             this.fileList.length = 0
      //             this.fileList = []
      //             this.showEmpty = true
      //             this.nuw = 0
      //           } else {
      //             this.$message({
      //               type: 'error',
      //               message: '上传失败'
      //             })
      //           }
      //         })
      //       }
      //       this.loading = false
      //       this.afterUp = true
      //       setTimeout(() => {
      //         this.dialogVisible = false
      //         this.showEmpty = true
      //         this.showHave = false
      //         this.beforeUp = true
      //         this.afterUp = false
      //         this.loading = false
      //       }, 2000)
      //     }, 3000)
      //   }
      // }, 30)
    },
    handleAvatarSuccess(res, file) {
      console.log(file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        if (!isPNG) {
          this.$message.error('上传图片只能是 JPG, PNG 格式!')
        }
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG || isPNG && isLt2M
    },

    // 关闭上传图片弹窗
    handleClose(done) {
      done()
      this.fileList.length = 0
      this.fileList = []
      this.showEmpty = true
      this.showHave = false
      this.beforeUp = true
      this.afterUp = false
      this.loading = false
      this.errorList = false
      this.errorFileName = []
    },

    // 点击删除图片按键
    isdeleteimg() {
      this.isDeleteing = true
    },

    // 点击删除图集按键
    deleteset() {
      this.$confirm('确定删除该图集？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$refs.img.src = this.uploadImage
          this.$refs.imgDelete.style.display = 'none'
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 进入删除状态后删除单张图片
    deleteimg(item) {
      // console.log(item)
      this.paperParams2.img_id = item.id
      this.$confirm('是否删除该张图片？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delPaperListDetail(this.paperParams2).then((res) => {
            console.log(res)
            if (res.res === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.dialogVisible = false
              const totalPage = Math.ceil((this.total - 1) / this.pagerow)
              const currentPage = this.page > totalPage ? totalPage : this.page
              this.page = currentPage < 0 ? 0 : currentPage
              if (this.imgsData.length === 1) {
                console.log('该系列暂无内容')
                fetchPaperListDetail(this.paperParams)
                  .then((response) => {
                    console.log(response.data)
                    this.total = response.total
                    this.imgsData = response.data
                    if (this.imgsData.length > 0) {
                      this.showPag = true
                    } else {
                      this.showPag = false
                    }
                    // this.paperParams.page = this.paperParams.page + 1
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              } else if (this.imgsData.length > 1) {
                this.getPaperList()
              }
            }
          })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
      this.isDeleteing = false
      // this.fetchPaperListDetail()
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
  //border: 1px solid black;
  margin: 0 1%;
}

.showEmpty{
  width: 50%;
  //border: 1px solid blue;
  margin: 0 auto;
  .typeImg{
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
.upload-demo{
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
  .continueBtn{
    width: 100%;
    //border:1px solid black;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;//每个项目两侧的间隔相等align-items: center;
    position: absolute;
    bottom: -8vh;
    right: 0;
    .showHaveAdd{
      width: 14vw;
      height: 3vh;
      padding: 0;
      border: none;
      border: 1px solid #253647;
      background-color: white;
      color: #253647;
    }
    .showHaveAddBtn{
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

.uploadBtn{
  .showHaveAddBtn{
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
  height: 80%;
  //border: 1px solid black;
  //border: 1px solid black;
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
    //border: 1px solid blue;
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
        height:95%;
      }
      // 删除状态下的删除栏
      .delete-img {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 40px;
        position: absolute;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        top: 0;
        right: 0;
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

  .footer{
    width: 100%;
    //border: 1px solid black;
    margin-top: 30px;
    text-align: center;
    .el-pagination{
      margin-bottom: 40px;
    }
  }
}

</style>
