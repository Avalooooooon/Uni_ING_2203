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
        <el-input
          v-model="searchkey"
          placeholder="请输入关键词搜索"
          suffix-icon="el-icon-search"
        />
        <i class="el-icon-sort" />
        <i class="el-icon-plus" @click="dialogVisible = true" />

        <!-- 编辑弹窗 -->
        <el-dialog title="新增系列" :visible.sync="dialogVisible">
          <el-form :model="form">
            <el-form-item label="系列名称：" :label-width="formLabelWidth">
              <el-input
                v-model="form.newSetName"
                placeholder="请输入新系列名称（40字以内）"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogVisible = false;
                adddetailimgset();
              "
            >确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <div v-for="item in modulesData" :key="item.id" class="module-wrapper">
      <!-- <img class="appimg" src="@/assets/logo.jpg"> -->
      <img
        class="appimg"
        :src="
          item.image ? 'https://www.bizspace.cn' + item.image : images.emptyimg
        "
      />
      <div class="textversion">{{ item.name }}</div>
      <div class="editbtn">
        <el-button
          type="primary"
          class="checkbtn"
          :detailid="item.id"
          :detailname="item.name"
          @click="checkdetail"
          >查看</el-button
        >
        <el-button
            :id="item.id"
            type="primary"
            class="deletebtn"
            :detailid="item.id"
            :detailname="item.name"
            @click="deletealert"
          >删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchKnowledgeList, addKnowledgeList, delKnowledgeList } from '@/api/appknowledge'
import { getToken } from '@/utils/auth'

export default {
  name: "KnowledgeDetail",
  props: ["appid", "appname"],
  data() {
    return {
      images: { // 占位图
        emptyimg: require('@/assets/empty.jpg')
      },
      searchKey: '', // 用户输入到搜索框中的关键字
      list: [], // 存放搜索前的所有数据
      newlist: [], // 存放搜索结果
      
      // 后端传来的数据
      modulesData: [],
      // 发送给后端的数据
      knowledgeParamsFetch: {
        bizid: 'uniwarm',
        token: getToken(),
        listid:8,
        page:0
      },
      knowledgeParamsAdd: {
        bizid: 'uniwarm',
        token: getToken(),
        se_name: ''
      },
      knowledgeParamsDel: {
        bizid: 'uniwarm',
        token: getToken(),
        se_id: ''
      },

      dialogVisible: false, // 弹窗显隐
      form: {
        newSetName: ''
      },
      formLabelWidth: '120px'
    };
  },

  mounted() {
    fetchKnowledgeList(this.knowledgeParamsFetch)
      .then((response) => {
        console.log(response.data)
        this.modulesData = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    // 返回上一级
    toback() {
      this.$router.go(-1);
    },

    // 添加新系列
    adddetailimgset() {
      this.knowledgeParamsAdd.se_name = this.form.newSetName
      addKnowledgeList(this.knowledgeParamsAdd)
        .then((response) => {
          // console.log(response.data);
          fetchKnowledgeList(this.knowledgeParamsFetch)
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
      this.form.newSetName = ''
    },

    // 删除当前系列
    deletealert(event) {
      this.knowledgeParamsDel.se_id = event.currentTarget.id
      this.$confirm('确定要删除该资源吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          delKnowledgeList(this.knowledgeParamsDel)
            .then((response) => {
              console.log(response.data)
              fetchKnowledgeList(this.knowledgeParamsFetch)
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
      const detailid = event.currentTarget.getAttribute("detailid");
      const detailname = event.currentTarget.getAttribute("detailname");

      this.$router.push({
        name: "DetailCheckImgsKnowledge",
        query: {
          detailid: detailid,
          detailname: detailname,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 98%;
  height: 5vh;
  padding: 1.4% 0 1% 1%;
}
.back {
  color: #d79432;
  font-size: 16px;
  cursor: pointer;
}
.el-icon-arrow-left {
  font-weight: bolder;
}
.edit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 32%;
  height: 7vh;

  color: #989a9e;
}
.edit i {
  color: #6e6e70;
  font-size: 20px;
}
::v-deep .edit .el-input {
  width: 21vw;
}
::v-deep .edit .el-input__inner {
  font-size: 10px;
  height: 3.5vh;
  background-color: transparent;
}
::v-deep .edit .el-input__icon {
  font-size: 14px;
  height: 3.5vh;
  line-height: 3.5vh;
}

.module-wrapper {
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
.appimg {
  width: 100%;
  // height: 16vh;
}
.textversion {
  font-size: 14px;
  font-weight: bold;
  margin: 1.5vh 0 1vh 0;
}

::v-deep .editbtn .el-button--medium {
  font-size: 12px;
}
.checkbtn {
  height: 3vh;
  width: 37%;
  padding: 0;
  background-color: #253647;
  color: white;
  border: none;
}
.deletebtn {
  height: 3vh;
  width: 40%;
  padding: 0;
  background-color: transparent;
  color: #f56c6c;
  border: 1px solid #f56c6c;
}
</style>
