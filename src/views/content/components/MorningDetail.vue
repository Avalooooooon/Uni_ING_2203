<template>
  <!-- ”小程序内容管理“——早安晚安 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <!-- <span class="lt">&lt;&nbsp;</span>  -->
        <i class="el-icon-arrow-left" />
        早安晚安
      </div>
    </div>

    <!-- 显示模块 -->
    <div class="main-wrapper">
      <!-- :key="item.id" -->
      <div v-for="item in modulesData" :key="item.id" class="module-wrapper">
        <img
          class="appimg"
          :src="
            item.first
              ? 'https://www.bizspace.cn' + item.first
              : images.emptyimg
          "
        >
        <!-- <img class="appimg" :src="imgs.emptyimg"/> -->
        <div class="textversion">{{ item.se_name }}</div>
        <div class="texttime">张三 上传时间2022/xx/xx xx:xx</div>
        <div class="editbtn">
          <el-button
            type="primary"
            class="checkbtn"
            :detailid="item.id"
            :detailname="item.se_name"
            @click="checkdetail"
          >查看</el-button>
          <el-button
            :id="item.id"
            type="primary"
            class="deletebtn"
            :detailid="item.id"
            :detailname="appname + item.name"
            @click="deletealert"
          >删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMorningList, delMorningList } from '@/api/wxmorning'
import { getToken } from '@/utils/auth'

export default {
  name: 'MorningDetail',
  props: ['appid', 'appname'],

  data() {
    return {
      images: {
        // 占位图
        emptyimg: require('@/assets/empty.jpg')
      },

      // 后端传来的数据
      modulesData: [],
      // 发送给后端的数据
      morningParamsFetch: {
        bizid: 'uniwarm',
        token: getToken()
      },
      morningParamsDel: {
        bizid: 'uniwarm',
        token: getToken(),
        se_id: ''
      }
    }
  },

  watch: {},

  mounted() {
    fetchMorningList(this.morningParamsFetch)
      .then((response) => {
        console.log(response.data)
        this.modulesData = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  },

  // 生命周期，先给搜索结果赋值为全部数据
  created() {
    this.newlist = this.list
  },

  methods: {
    // 返回上一级
    toback() {
      this.$router.go(-1)
    },

    // 删除当前系列
    deletealert(event) {
      this.morningParamsDel.se_id = event.currentTarget.id
      this.$confirm('确定要删除该资源吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          delMorningList(this.morningParamsDel)
            .then((response) => {
              console.log(response.data)
              fetchMorningList(this.morningParamsFetch)
                .then((response) => {
                  this.modulesData = response.data
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
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
      // this.$router.go(0)
    },

    // 点击当前系列的查看按钮
    checkdetail(event) {
      const detailid = event.currentTarget.getAttribute('detailid')
      const detailname = event.currentTarget.getAttribute('detailname')

      this.$router.push({
        // name:'DetailAddImgset',
        name: 'DetailCheckImgsMorning',
        query: {
          detailid: detailid,
          detailname: detailname
        }
      })
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
  //border: 1px solid black;
  width: 98%;
  height: 5vh;
  padding: 1.4% 0 1% 0;

  // 返回上层
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
}

// 主要内容区域（多个）
.main-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // 单系列模块
  .module-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: flex-start;

    width: 19.6%; // (100-1*2)/5，根组件的左右margin为1%
    padding: 1% 5px 0 5px;
    margin-bottom: 1vh;
    text-align: center;
    font-size: 14px;

    // 模块主图
    .appimg {
      width: 100%;
      height: 85%;
    }

    // 模块主图下的两行文字
    .textversion {
      font-size: 14px;
      font-weight: bold;
      margin: 1.5vh 0 1vh 0;
    }
    .texttime {
      font-size: 10px;
      color: #777777;
      margin: 0 0 1.5vh 0;
    }

    // 当前系列的按钮
    ::v-deep .editbtn .el-button--medium {
      font-size: 12px;
    }
    // 当前系列的查看按钮
    .checkbtn {
      height: 3vh;
      width: 37%;
      padding: 0;
      background-color: #253647;
      color: white;
      border: none;
    }
    // 当前系列的删除按钮
    .deletebtn {
      height: 3vh;
      width: 40%;
      padding: 0;
      background-color: transparent;
      color: #f56c6c;
      border: 1px solid #f56c6c;
    }
  }
}
</style>
