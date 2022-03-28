<template>
    <div class="content-wrapper">
        <div class="topbar-wrapper">
            <div class="back" @click="toback">
                <i class="el-icon-arrow-left"></i>
                {{detailid}}@@{{detailname}}
            </div>
        </div>

        <div class="editor-container">
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
        </div>
    </div>
</template>

<script>
import Dropzone from './components/ArticleDetailImgset'
// import Dropzone from '@/components/Dropzone'


export default {
    name:"DetailAddImgset",
    components: { Dropzone },
    props:['detailid','detailname'],

    methods: {
        toback(){
            this.$router.go(-1)
        },
        dropzoneS(file) {
            console.log(file)
            this.$message({ message: 'Upload success', type: 'success' })
        },
        dropzoneR(file) {
            console.log(file)
            this.$message({ message: 'Delete success', type: 'success' })
        }
    }
}
</script>

<style lang="scss" scoped>
.content-wrapper{
//   width: 100%;
  height: 100%;
  margin: 0.7% 1%;
}

.topbar-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 7vh;
  padding: 1.4% 0% 1% 1%;

  .back{
    color:#D79432;
    font-size: 16px;
    .el-icon-arrow-left{
      font-weight:bolder;
    }
  }

  .edit{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 32%;
    height: 7vh;
    color: #989A9E;
    i{
      color:#6e6e70;
      font-size:20px;
    }

    ::v-deep{
      .el-input{
        width: 21vw;
      }
      .el-input__inner{
        font-size: 10px;
        height: 3.5vh;
        background-color: transparent;
      }
      .el-input__icon{
        font-size: 14px;
        height:3.5vh;
        line-height:3.5vh;
      }
    }
  }
}
</style>