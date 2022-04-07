<template>
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <!-- <span class="lt">&lt;&nbsp;</span>  -->
        <i class="el-icon-arrow-left" />
        {{ appname }}
      </div>
      <div class="edit">
        <el-input
          v-model="searchkey"
          placeholder="请输入关键词搜索"
          suffix-icon="el-icon-search"
        />
        <i class="el-icon-sort" />
        <i class="el-icon-plus" @click="adddetail" />
      </div>
    </div>

    <div v-for="item in datalist" :key="item.id" class="module-wrapper">
      <img class="appimg" src="@/assets/topbar.png">
      <div class="textversion">
        {{ item.name }} 2022xxxx_v1
      </div>
      <!--      <div class="texttime">-->
      <!--        张三 上传时间2022/xx/xx xx:xx-->
      <!--      </div>-->
      <div class="editbtn">
        <el-button type="primary" class="checkbtn" :detailid="item.id" :detailname="item.name" @click="checkdetail">查看</el-button>
        <el-button type="primary" class="deletebtn" @click="deletealert">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnowledgeDetail',
  props: ['appid', 'appname'],
  data() {
    return {
      searchkey: '',
      datalist: [
        {
          id: '0001',
          name: '保养小知识1'
        },
        {
          id: '0002',
          name: '保养小知识2'
        },
        {
          id: '0003',
          name: '保养小知识3'
        },
        {
          id: '0004',
          name: '保养小知识4'
        }
      ]
    }
  },

  methods: {
    toback() {
      this.$router.go(-1)
    },

    adddetail() {
      this.$router.push({
        name: 'DetailAdd'
      })
    },

    deletealert() {
      this.$confirm('确定要删除该资源吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    checkdetail(e) {
      const detailid = event.currentTarget.getAttribute('detailid')
      const detailname = event.currentTarget.getAttribute('detailname')
      console.log(detailid)
      console.log(detailname)

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
.content-wrapper{
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
.topbar-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 98%;
  height: 5vh;
  padding: 1.4% 0 1% 1%;

}
.back{
  color:#D79432;
  font-size: 16px;
  cursor: pointer;
}
.el-icon-arrow-left{
  font-weight:bolder;
}
.edit{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 32%;
  height: 7vh;

  color: #989A9E;
}
.edit i{
  color:#6e6e70;
  font-size:20px;
}
::v-deep .edit .el-input{
  width: 21vw;
}
::v-deep .edit .el-input__inner{
  font-size: 10px;
  height: 3.5vh;
  background-color: transparent;
}
::v-deep .edit .el-input__icon{
  font-size: 14px;
  height:3.5vh;
  line-height:3.5vh;
}

.module-wrapper{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: flex-start;

  width: 19.6%;
  height: 27vh;
  padding: 1% 5px 0 5px;
  text-align: center;
  font-size: 14px;

  // background-color: antiquewhite;
}
.appimg{
  width: 100%;
  height: 16vh;
}
.textversion{
  font-size: 14px;
  font-weight: bold;
  margin:1.5vh 0 1vh 0;
}
.texttime{
  font-size: 10px;
  color:#777777;
  margin:0 0 1.5vh 0;
}

::v-deep .editbtn .el-button--medium{
  font-size: 12px;
}
.checkbtn{
  height:3vh;
  width:37%;
  padding: 0;
  background-color: #253647;
  color:white;
  border:none;
}
.deletebtn{
  height:3vh;
  width:40%;
  padding: 0;
  background-color: transparent;
  color:#F56C6C;
  border:1px solid #F56C6C;
}
</style>
