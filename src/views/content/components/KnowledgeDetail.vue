<template>
  <!-- ”app内容管理“——保养小知识 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <!-- <span class="lt">&lt;&nbsp;</span>  -->
        <i class="el-icon-arrow-left" />
        {{ appname }}
      </div>
      <div class="edit">
        <!--        <el-input-->
        <!--          v-model="searchkey"-->
        <!--          placeholder="请输入关键词搜索"-->
        <!--          suffix-icon="el-icon-search"-->
        <!--        />-->
        <!--        <i class="el-icon-sort" />-->
        <i class="el-icon-plus" listid="13" @click="toAddKnowledge" />
      </div>
    </div>
    <div class="moudle-wrapper">
      <!-- <div v-for="item in modulesData" :key="item.id" class="module-wrapper"> -->
      <div v-for="item in modulesData" :key="item.id" class="singlemoudle">
        <!--         <img class="appimg" src="@/assets/logo.jpg"> -->
        <img
          class="appimg"
          :src="
            item.image
              ? 'https://www.uniwarm.net' + item.image
              : images.emptyimg
          "
        >

        <div class="textversion">{{ item.name }}</div>
        <div class="timeversion">{{ item.create_date }}</div>

        <div class="editbtn">
          <el-button
            type="primary"
            class="checkbtn"
            :detailid="item.id"
            :detailname="item.name"
            @click="checkdetail"
          >查看</el-button>
          <el-button
            :id="item.id"
            type="primary"
            class="deletebtn"
            :detailid="item.id"
            @click="deletealert"
          >删除</el-button>
        </div>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="knowledgeParamsFetch.page"
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
  fetchKnowledgeList,
  addKnowledgeList,
  delKnowledgeList
} from '@/api/appknowledge'
import { getToken } from '@/utils/auth'

export default {
  name: 'AppDetail',
  props: ['appid', 'appname'],
  data() {
    return {
      images: {
        // 占位图
        emptyimg: require('@/assets/empty.jpg')
      },
      searchkey: '', // 用户输入到搜索框中的关键字
      list: [], // 存放搜索前的所有数据
      newlist: [], // 存放搜索结果

      // 后端传来的数据
      modulesData: [],
      total: 0,
      pagerow: 20,

      // 发送给后端的数据
      knowledgeParamsFetch: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 13,
        page: 1
      },
      knowledgeParamsDel: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 13,
        itemid: ''
      }
    }
  },

  created() {
    this.getKnowledgeList()
  },

  methods: {
    // 返回上一级
    toback() {
      this.$router.go(-1)
    },

    // 钩子函数：从后台拿数据
    getKnowledgeList() {
      this.knowledgeParamsFetch.page = this.knowledgeParamsFetch.page - 1
      fetchKnowledgeList(this.knowledgeParamsFetch)
        .then((response) => {
          this.total = response.total
          this.modulesData = response.data
          this.knowledgeParamsFetch.page = this.knowledgeParamsFetch.page + 1
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 点击顶部加号添加新系列
    toAddKnowledge(event) {
      const listid = event.currentTarget.getAttribute('listid')

      this.$router.push({
        name: 'AddKnowledge',
        query: {
          listid: listid
        }
      })
    },

    // 分页器
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.knowledgeParams.page = currentPage
      console.log(this.knowledgeParams.page)
      this.getKnowledgeList()
    },

    // 删除当前系列
    deletealert(event) {
      this.knowledgeParamsDel.itemid = event.currentTarget.id
      this.$confirm('确定要删除该资源吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          delKnowledgeList(this.knowledgeParamsDel)
            .then((response) => {
              console.log(response.data)
              this.getKnowledgeList()
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
        name: 'DetailCheckImgsKnowledge',
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
  margin: 0 2%;
}

// 头部
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 96%;
  height: 5vh;
  padding: 1.4% 0 1% 0;
  // 返回上一页
  .back {
    color: #d79432;
    font-size: 16px;
    cursor: pointer;
    .el-icon-arrow-left {
      font-weight: bolder;
    }
  }
  // 头部右侧功能区
  .edit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //width: 32%;
    height: 7vh;
    color: #989a9e;
    i {
      color: #6e6e70;
      font-size: 20px;
    }
    ::v-deep {
      // 搜索框
      .el-input {
        width: 17vw;
      }
      .el-input__inner {
        font-size: 10px;
        height: 3.5vh;
        background-color: transparent;
      }
      .el-input__icon {
        font-size: 14px;
        height: 3.5vh;
        line-height: 3.5vh;
      }
    }
  }
}

.moudle-wrapper {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  //border: 1px solid black;

  // 主要内容显示区域（单个）
  .singlemoudle {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: flex-start;
    // border: 1px solid blue;

    width: 20%;
    height: 100%;
    padding: 1% 5px 0 5px;
    text-align: center;
    font-size: 14px;

    // background-color: antiquewhite;
    .appimg {
      width: 100%;
      height: 60%;
      // border: 1px solid red;
      padding-bottom: 2px;
    }
    .textversion {
      font-size: 14px;
      height: 15%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      //border: 1px solid red;
      font-weight: bold;
      // margin: 0;
      margin: 2px 0 0 0;
    }
    .timeversion {
      font-size: 12px;
      height: 10%;
      line-height: 10%;
      //border: 1px solid red;
      font-weight: bold;
      margin: 0;
      //margin: 1.5vh 0 1vh 0;
    }

    ::v-deep .editbtn .el-button--medium {
      font-size: 12px;
    }
    .checkbtn {
      height: 3vh;
      width: 45%;
      padding: 0;
      background-color: #253647;
      color: white;
      border: none;
    }
    .deletebtn {
      height: 3vh;
      width: 45%;
      padding: 0;
      background-color: transparent;
      color: #f56c6c;
      border: 1px solid #f56c6c;
    }
  }

  .footer {
    width: 100%;
    //border: 1px solid black;
    text-align: center;
    .el-pagination {
      margin-top: 40px;
      margin-bottom: 40px;
    }
  }
}
</style>
