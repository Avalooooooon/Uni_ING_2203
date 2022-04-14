<template>
  <!--  素材库-->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back">
        <div>
          素材名称 :
          <el-input v-model="form.title" size="mini" class="filterBox" placeholder="请输入" />
        </div>
        <div style="margin-left: 30px">
          素材类型 :
          <el-select
            v-model="form.type"
            class="filterBox"
            size="mini"
            style="width: 150px;min-width: 50px;margin-right: 40px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="margin-left: -10px">
          上传人 :
          <el-input v-model="form.name" size="mini" class="filterBox" placeholder="请输入" />
        </div>
        <div style="margin-left: 30px">
          上传时间 :
          <el-date-picker
            v-model="form.date"
            size="mini"
            class="filterBox"
            type="date"
            placeholder="选择日期"
          />
        </div>
      </div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="filterlebtn"
          >筛选</el-button>
          <el-button
            type="primary"
            class="resetlebtn"
          >重置</el-button>
          <el-button
            type="primary"
            class="uploadlebtn"
            @click="uploadMaterial"
          >上传素材</el-button>
        </div>
      </div>
      <el-dialog
        title="请选择素材类型进行上传"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <div class="dialogContent">
          <div class="uploadType" @click="uploadPictureMat">
            <div class="typeImg"></div>
            <div class="typeTitle">图文素材</div>
          </div>
          <div class="uploadType" @click="uploadVideoMat">
            <div class="typeImg"></div>
            <div class="typeTitle">视频素材</div>
          </div>
        </div>
        <div class="dialogContent">
          <div class="uploadType" @click="uploadImagesMat">
            <div class="typeImg"></div>
            <div class="typeTitle">图集素材</div>
          </div>
          <div class="uploadType">
            <div class="typeImg"></div>
            <div class="typeTitle">图片素材(暂无)</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <el-table
        :data="tableData"
        :show-header="false"
        border
        style="width: 100%"
      >
        <el-table-column
          label="图片"
          align="center"
          width="220"
        >
          <template slot-scope="scope">
            <img class="tableImg" :src="scope.row.image" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          width="300"
        />
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          width="150"
        />
        <el-table-column
          prop="uploadName"
          align="center"
          width="250px"
          label="上传人"
        />
        <el-table-column
          prop="date"
          align="center"
          width="300px"
          label="上传时间"
        />
        <el-table-column
          prop=""
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button style="color: #d79432;margin-right: 30px" type="text" @click="checkDetail(scope.row)">查看</el-button>
            <el-button style="color: #d79432;margin-right: 30px" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button style="color: #f56c6c" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          class="el-pagination"
          background
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!--        <el-pagination-->
        <!--          background-->
        <!--          layout="prev, pager, next"-->
        <!--          :current-page="paperParams.page"-->
        <!--          :page-size="pagerow"-->
        <!--          :total="total"-->
        <!--          @current-change="handleCurrentChange"-->
        <!--        />-->
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
// import axios from 'axios'

export default {
  name: 'DetailCheckImgs',
  props: ['detailid', 'detailname'],

  data() {
    return {
      form: {
        title: '',
        type: '',
        name: '',
        date: ''
      },
      matId: '',
      centerDialogVisible: false,
      tableData: [{
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '视频',
        uploadName: 'xxx',
        date: '2016-05-02'
      }, {
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '图文',
        uploadName: 'xxx',
        date: '2016-05-02'
      }, {
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '图集',
        uploadName: 'xxx',
        date: '2016-05-02'
      }, {
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '视频',
        uploadName: 'xxx',
        date: '2016-05-02'
      }, {
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '视频',
        uploadName: 'xxx',
        date: '2016-05-02'
      }, {
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '视频',
        uploadName: 'xxx',
        date: '2016-05-02'
      }, {
        image: 'https://www.bizspace.cn/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
        title: '品牌灵魂xxxxxxx',
        type: '视频',
        uploadName: 'xxx',
        date: '2016-05-02'
      }],
      currentPage4: 4,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
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
      // this.paperParams.page = this.paperParams.page - 1
      // fetchPaperListDetail(this.paperParams)
      //   .then((response) => {
      //     console.log(response.data)
      //     this.total = response.total
      //     this.imgsData = response.data
      //     this.paperParams.page = this.paperParams.page + 1
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
    // 分页器
    // handleCurrentChange(currentPage) {
    //   console.log(currentPage)
    //   this.paperParams.page = currentPage
    //   console.log(this.paperParams.page)
    //   this.getPaperList()
    // },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },

    // 查看详情
    checkDetail(row) {
      console.log(row)
      if (row.type === '图文') {
        this.$router.push({ path: '/material/matlib/libcheckdetail', query: { id: row.id }})
      } else if (row.type === '视频') {
        this.$router.push({ path: '/material/matlib/libcheckVideo', query: { id: row.id }})
      } else if(row.type === '图集') {
        this.$router.push({ path: '/material/matlib/libimageset', query: { id: row.id }})
      }
    },
    // 编辑
    handleEdit(row) {
      if (row.type === '图文') {
        this.$router.push({ path: '/material/matlib/libedit', query: { id: row.id }})
      } else if (row.type === '视频') {
        this.$router.push({ path: '/material/matlib/libeditvideo', query: { id: row.id }})
      } else if (row.type === '图集') {
        this.$router.push({ path: '/material/matlib/libimagesetedit', query: { id: row.id }})
      }
    },

    // 顶部上传素材
    uploadMaterial() {
      this.centerDialogVisible = true
    },

    // 编辑新图集/上传新图集素材
    uploadImagesMat() {
      this.$router.push({ path: '/material/matlib/libimagesetadd', query: { id: this.matId }})
    },
    // 编辑新图集/上传图文素材
    uploadPictureMat() {
      this.$router.push({ path: '/material/matlib/libedit', query: { id: this.matId }})
    },
    // 编辑新图集/上传视频素材
    uploadVideoMat() {
      this.$router.push({ path: '/material/matlib/libeditvideo', query: { id: this.matId, status: 'false' }})
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
    uploadFile(file) {
      console.log(file)
      // this.openFullScreen2()
      var formData = new FormData()
      formData.append('headimg', file.file)
      paperListUpload(this.paperParams1, formData).then((res) => {
        console.log(res)
        this.imageUrl = this.url + res.image
        if (res.res === 0) {
          this.dialogVisible = false
          this.imageUrl = ''
          this.getPaperList()
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
        cancelButtonText: '取消'
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
              this.getPaperList()
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
      this.fetchPaperListDetail()
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
  //margin: 0 1%;
}

// 顶部区域
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  //border: 1px solid black;
  height: 5vh;
  margin: 30px 2%;

  .back {
    font-size: 14px;
    padding: 0;
    display: flex;
    //border: 1px solid black;
    .filterBox{
      width: 150px;
      min-width: 150px;
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

      .filterlebtn{
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: #253647;
        color: white;
        border: none;
        margin-right: 0.5vw;
      }
      .resetlebtn{
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: transparent;
        color: #253647;
        border: 1px solid #253647;
        margin-right: 0.5vw;
      }
      .uploadlebtn{
        height: 3vh;
        width: 5vw;
        padding: 0;
        background-color: rgb(207, 148, 39);
        color: white;
        border: none;
        //margin-right: 0.5vw;
      }
    }
  }
  .dialogContent{
    width: 100%;
    padding: 0 10px;
    text-align: center;
    //border: 1px solid black;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    .uploadType{
      width: 45%;
      height: 200px;
      cursor: pointer;
      //border: 1px solid red;
      .typeImg{
        width: 100%;
        height: 150px;
        background-color: rgb(0,0,0,0.5);
      }
      .typeTitle{
        width: 100%;
        height: 50px;
        //border: 1px solid blue;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}

// 主要内容区域（多个）
.images-wrapper {
  width: 96%;
  margin-top: 10px;
  //border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  margin-left: 2%;
  .tableImg{
    //width: 200px;
    //height: 150px;
    width: 100%;
    height: 100%;
    //border: 1px solid black;
  }

  .footer{
    width: 100%;
    //border: 1px solid black;
    //text-align: center;
    //margin-bottom: 30px;
    position: relative;
    //display: inline-block;
    //display: flex;
    .el-pagination{
      position: absolute;
      margin-top: 30px;
      //float: right;
      margin-bottom: 30px;
      right: 0;
    }
  }
}

</style>
