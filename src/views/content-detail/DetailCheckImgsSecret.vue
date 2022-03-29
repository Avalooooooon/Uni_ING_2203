<template>
  <!-- ”小程序内容管理“——爱的密语——系列详情 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left"></i>
        爱的密语,具体名称: {{ detailname }}, 系列id: {{ detailid }}
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
            @click="checkdetail"
            detailid="002"
            detailname="品牌灵魂v2"
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
            @click="checkdetail"
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

    <!-- 主要内容显示区域 -->
    <div class="images-wrapper">
      <div class="singleimage" v-for="item in imgsData" :key="item.id">
        <div class="block">
          <img class="appimg" :src="'https://www.bizspace.cn'+item.image" />
          <!-- <img class="appimg" src="@/assets/ht.jpg" /> -->
          <div v-if="isDeleteing" ref="imgDelete" class="delete-img">
            <i class="el-icon-delete" @click="deleteimg()"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchSecretListDetail } from '@/api/wxsecret'
import { getToken } from '@/utils/auth'

export default {
  name: "DetailCheckImgs",
  props: ["detailid", "detailname"],

  data() {
    return {
      isDeleteing: false, // 删除状态

      // 发送给后端的数据
      secretParams:{
        bizid: "uniwarm",
        token: getToken(),
        se_id: this.detailid,
        page: 0,
      },
      // 后端传来的数据
      imgsData: [],

      trueimgsData: [
        // 遍历 可以使用push和pop添加和删除
      ],
    };
  },

watch: {

},

  mounted(){
      console.log(this.secretParams)

    fetchSecretListDetail(this.secretParams).then(response => {
      console.log(response.data)
      this.imgsData = response.data
      }).catch(err => {
        console.log(err)
      })
  
  },

  methods: {
    toback() {
      this.$router.go(-1);
    },

    // 点击上传图片按键
    checkdetail(event) {
      let detailid = event.currentTarget.getAttribute("detailid");
      let detailname = event.currentTarget.getAttribute("detailname");

      this.$router.push({
        name: "DetailAddImgset",
        query: {
          detailid: detailid,
          detailname: detailname,
        },
      });
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
    deleteimg() {
      this.$confirm("是否删除该张图片?", "删除", {
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