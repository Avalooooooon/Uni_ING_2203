<template>
  <!-- ”小程序内容管理“——爱的密语 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <!-- <span class="lt">&lt;&nbsp;</span>  -->
        <i class="el-icon-arrow-left"></i>
        爱的密语
      </div>
      <div class="edit" v-show="appname !== '早安晚安'">
        <!-- @input="searchEvent" -->
        <el-input
          placeholder="请输入关键词搜索"
          suffix-icon="el-icon-search"
          v-model="searchKey"          
        >
        </el-input>
        <i class="el-icon-sort"></i>
        <i class="el-icon-plus" @click="dialogVisible = true"></i>

        <!-- 编辑弹窗 -->
        <el-dialog title="新增系列" :visible.sync="dialogVisible">
          <el-form :model="form">
            <el-form-item label="系列名称：" :label-width="formLabelWidth">
              <el-input
                v-model="form.newSetName"
                placeholder="请输入新系列名称（40字以内）"
                autocomplete="off"
              ></el-input>
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
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>

    <!-- 显示模块 -->
    <div class="main-wrapper">
      <!-- :key="item.id" -->
      <div class="module-wrapper" v-for="item in modulesData" :key="item.id">
        <img
          class="appimg"
          :src="
            item.first
              ? 'https://www.bizspace.cn' + item.first
              : images.emptyimg
          "
        />
        <!-- <img class="appimg" :src="imgs.emptyimg"/> -->
        <div class="textversion">{{ item.se_name }}</div>
        <div class="texttime">张三 上传时间2022/xx/xx xx:xx</div>
        <div class="editbtn">
          <el-button
            type="primary"
            class="checkbtn"
            @click="checkdetail"
            :detailid="item.id"
            :detailname="item.se_name"
            >查看</el-button
          >
          <el-button
            :id="item.id"
            type="primary"
            class="deletebtn"
            @click="deletealert"
            :detailid="item.id"
            :detailname="appname + item.name"
            >删除</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchSecretList, addSecretList, delSecretList } from "@/api/wxsecret";
import { getToken } from "@/utils/auth";

export default {
  name: "SecretDetail",
  props: ["appid", "appname"],

  data() {
    return {
      images: { // 占位图
        emptyimg: require("@/assets/empty.jpg"),
      },
      searchKey: "", // 用户输入到搜索框中的关键字
      list: [], // 存放搜索前的所有数据
      newlist: [], // 存放搜索结果
      // 后端传来的数据
      modulesData: [],
      // 发送给后端的数据
      secretParamsFetch: {
        bizid: "uniwarm",
        token: getToken(),
      },
      secretParamsAdd: {
        bizid: "uniwarm",
        token: getToken(),
        se_name: "",
      },
      secretParamsDel: {
        bizid: "uniwarm",
        token: getToken(),
        se_id: "",
      },
      

      dialogVisible: false, // 弹窗显隐
      form: {
        newSetName: "",
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: "",
      },
      formLabelWidth: "120px",
    };
  },

  watch: {
    // 如果搜索框中的内容为空，显示全部内容
    searchKey(curr, old) {
      // 参数分别为新值和旧值
      if (curr == "") {
        this.newlist = this.list;
      }
    },
  },

  mounted() {
    fetchSecretList(this.secretParamsFetch)
      .then((response) => {
        console.log(response.data);
        this.modulesData = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    // 返回上一级
    toback() {
      this.$router.go(-1);
    },

    // 添加新系列
    adddetailimgset() {
      this.secretParamsAdd.se_name = this.form.newSetName;
      addSecretList(this.secretParamsAdd)
        .then((response) => {
          // console.log(response.data);
          fetchSecretList(this.secretParamsFetch)
                .then((response) => {
                  this.modulesData = response.data;
                })
                .catch((err) => {
                  console.log(err);
                });
        })
        .catch((err) => {
          console.log(err);
        });
        this.form.newSetName = ""
    },

    // 删除当前系列
    deletealert(event) {
      this.secretParamsDel.se_id = event.currentTarget.id;
      this.$confirm("确定要删除该资源吗？", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          delSecretList(this.secretParamsDel)
            .then((response) => {
              console.log(response.data);
              fetchSecretList(this.secretParamsFetch)
                .then((response) => {
                  this.modulesData = response.data;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
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
        // this.$router.go(0)

    },

    // 点击当前系列的查看按钮
    checkdetail(event) {
      let detailid = event.currentTarget.getAttribute("detailid");
      let detailname = event.currentTarget.getAttribute("detailname");

      this.$router.push({
        // name:'DetailAddImgset',
        name: "DetailCheckImgsSecret",
        query: {
          detailid: detailid,
          detailname: detailname,
        },
      });
    },

  },

  // 搜索功能，绑定@input，数据变化就监测
  searchEvent() {
    this.clearTimer();
    if (this.searchKey && this.searchKey.length > 0) {
      // 输入到搜索框中的关键字不为空
      //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
      this.timer = setTimeout(() => {
        this.$emit("searchHandler", this.searchKey);
      }, 500);
    } else {
      // 输入到搜索框中的关键字为空
      this.$emit("searchHandler", this.searchKey);
    }
  },
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },

  

  // 生命周期，先给搜索结果赋值为全部数据
  created() {
    this.newlist = this.list;
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

  // 右侧功能区
  .edit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 32%;
    height: 7vh;
    color: #989a9e;
    i {
      color: #6e6e70;
      font-size: 20px;
    }
    i:hover {
      cursor: pointer;
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

  // 弹窗样式
  ::v-deep .el-dialog {
    top: 15%;
    width: 45%;

    .el-dialog__body {
      padding-bottom: 0;
    }
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