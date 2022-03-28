<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">

            <el-row class="top-wrapper">
              <el-col style="width:6vw;">
                请输入标题：
              </el-col>
              <el-col :span="4">
                <el-form-item prop="title">
                  <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                    请输入封面标题
                  </MDinput>
                </el-form-item>
              </el-col>
              <el-col :span="14">
              </el-col>

              <el-col class="twobutton" :span="4">
                <el-button class="cancelbtn" v-loading="loading" type="warning" @click="cancelForm">
                  取消
                </el-button>
                <el-button class="donebtn" v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                  完成
                </el-button>
              </el-col>
            </el-row>

            <el-form-item class="imagewrapper" prop="image_uri" style="margin-bottom: 30px;">
              <div style="width:6vw;height:14px;line-height:14px;">上传封面：</div>
              <Upload v-model="postForm.image_uri" />
            </el-form-item>

            <!-- <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                    <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="Publish Time:" class="postInfo-container-item">
                    <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>

              </el-row>
            </div> -->

          </el-col>
        </el-row>


      </div>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { MDinput, Upload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
      },
      tempRoute: {}
    }
  },
  computed: {
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelForm() {
      this.$confirm('确定要取消编辑吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '已取消编辑',
            showClose: true,
            duration: 1000
          });
          setTimeout(()=>{this.$router.go(-1);},"500");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });          
        });

      // this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  },
  beforeDestroy() {
    this._timer && clearTimeout(this._timer);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
$upload-height: 13vw;
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 10px 30px 25px 35px;
    color:#777777;
    font-size: 14px;
    .top-wrapper{
      height: 8vh;
      margin-bottom: 1.5vh;
      display: flex;
      align-items: center;
      ::v-deep .el-form-item{
        margin:0;
      }
      
      // 调整输入的文字的大小和输入框位置
      ::v-deep .material-input{
          font-size:14px;
          height:4vh;
          padding:0 0 0 1vw;
      }

      ::v-deep .material-input__component{
          background-color: transparent;
          height:4vh;
          width:20vw;
          margin:0;
          padding:0;
          border:1px solid #C7CAD3 ;
          border-radius: 5px;
      }

      // 调整占位的文字的大小和位置
      ::v-deep .material-label{
          height:4vh;
          line-height:4vh;
          padding-left:1vw;
          font-size:12px;
      }

      ::v-deep .el-button--medium{
        font-size: 10px;
      }
      .twobutton{
        display: flex;
      }
      .cancelbtn{
        height:2.7vh;
        width:5vw;
        padding: 0;
        margin:0 0.5vw;
        background-color: transparent;
        color:#707275;
        border:1px solid #707275;
      }
      .donebtn{
        height:2.7vh;
        width:5vw;
        padding: 0;
        margin:0 0.5vw;
        background-color: transparent;
        color:#D79432;
        border:1px solid #D79432;
      }
    }

    // 控制上传框（一共包含三部分）的区域大小
    ::v-deep .el-form-item__content{
      color:#777777;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
    ::v-deep .upload-container{
      width: 80%;
      height: 25vh;

      // 控制写有提示文字的上传框大小
      .image-uploader{
        width: $upload-height;
        height: $upload-height;
        .el-upload-dragger{
          background-color: transparent;
          border:1px solid #C7CAD3 ;
          width: $upload-height;
          height: $upload-height;
          // 控制写有提示文字的上传框内的图标大小
          .el-icon-upload{
            color:#989A9E;
            margin-bottom:0vh;
            font-size: 40px;
          }
          // 控制写有提示文字的上传框内的文字大小
          .el-upload__text{
            color:#919191;
            font-size: 8px;
          }
        }
      }

      // 控制中间矩形框大小
      .image-preview.image-app-preview{
        width: 25vw;
        height: $upload-height;
      }
      // 控制右边正方形框大小
      .image-preview{
        width: $upload-height;
        height: $upload-height;
      }
    }



    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
