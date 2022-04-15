<template>
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <el-form
        :inline="true"
        :model="form"
        ref="form"
        label-width="60px"
        class="demo-dynamic"
      >
        <el-form-item label="投放名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select class="input" v-model="form.state" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请人" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="申请时间" prop="applydate">
          <el-date-picker
            v-model="form.applydate"
            size="mini"
            class="filterBox"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <el-form-item label="使用时间" prop="usedate">
          <el-date-picker
            v-model="form.date"
            size="mini"
            class="filterBox"
            type="usedate"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>

      <div class="buttons">
        <el-button class="filterbtn" @click="filter">筛选</el-button>
        <el-button class="resetbtn" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="middle-wrapper">
      <el-table class="datalist" :data="modulesData">
        <el-table-column prop="title" label="投放名称" width="140">
        </el-table-column>
        <el-table-column prop="name" label="申请人" width="120">
        </el-table-column>
        <el-table-column prop="requestdate" label="申请时间" width="140">
        </el-table-column>
        <el-table-column prop="usedate" label="使用时间" width="140">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="140">
        </el-table-column>
        <el-table-column prop="finalOperate" label="最后操作人" width="140">
        </el-table-column>
        <el-table-column label="操作">
          <div class="buttons">
            <el-button class="filterbtn" @click="toRecordDetail"
              >查看</el-button
            >
            <el-button class="resetbtn" @click="withDraw">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="content-foot">
      <el-pagination
        class="el-pagination"
        background
        :current-page="materialParams.page"
        :page-size="pagerow"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import {
//   fetchDesignerListDetail,
//   materialListUpload,
//   delDesignerListDetail,
// } from "@/api/appmaterial";
import { getToken } from "@/utils/auth";
import axios from "axios";

export default {
  name: "MatRecord",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),

      images: {
        // 占位图
        emptyimg: require("@/assets/empty.jpg"),
      },
      url: "https://www.bizspace.cn",
      imageUrl: "",

      // 传给投放申请的数据
      chooseId: -1,
      chooseName: "",

      // 素材类型的可选值
      options: [
        { value: "001", label: "订单审核" },
        { value: "002", label: "审核通过" },
        { value: "003", label: "停止审核" },
      ],
      // 投放的名称、状态、申请人、上传时间、使用时间
      form: {
        title: "",
        state: "",
        name: "",
        applydate: "",
        usedate: "",
      },

      // 发送给后端的数据
      materialParams: {
        bizid: "uniwarm",
        token: getToken(),
        listid: 8,
        itemid: this.detailid,
        page: 8,
      },
      materialParamsdel: {
        bizid: "uniwarm",
        token: getToken(),
        itemid: "",
        listid: 8,
      },

      // 后端传来的数据
      modulesData: [
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "001",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "002",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "003",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "004",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "005",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "001",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "001",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "001",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "001",
        },
        {
          title: "title1",
          name: "aaa",
          requestdate: "2000-00-00 00:00",
          usedate: "2000-01-01 01:00",
          state: "订单审核",
          finalOperate: "me",
          id: "001",
        },
      ],
      total: 300,
      pagerow: 20,
    };
  },

  created() {
    // this.getMaterialList();
  },

  methods: {
    // 点击查看按钮，去素材详情页
    toRecordDetail(event) {
      this.$router.push({
        name: "RecordDetail",
        // query: {
        //     matid: this.chooseId,
        //     matname: this.chooseName,
        //   },
      });
    },
    // 点击删除按钮，去撤回页
    withDraw(event) {
      //   this.materialParamsDel.itemid = event.currentTarget.id;
      this.$confirm("确定要删除该投放吗？", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          //   delNewsList(this.materialParamsDel)
          //     .then((response) => {
          //       console.log(response.data);
          //       this.getNewsList();
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //     });
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

    // 重置表单
    reset() {
      this.$refs["form"].resetFields();
    },

    // 钩子函数：从后台拿数据
    getMaterialList() {
      this.materialParamsFetch.page = this.materialParamsFetch.page - 1;
      fetchMaterialList(this.materialParamsFetch)
        .then((response) => {
          this.total = response.total;
          this.modulesData = response.data;
          this.materialParamsFetch.page = this.materialParamsFetch.page + 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseMat(id, name) {
      this.chooseId = id;
      this.chooseName = name;
      console.log(name);
    },

    // 分页器
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.materialParams.page = currentPage;
      console.log(this.materialParams.page);
      this.getMaterialList();
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>


<style lang="scss" scoped>
$formHeight: 28px;
// 根组件
.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  width: 100%;
  padding-left: 2%;
  height: calc(100vh - 50px);
  overflow-y: scroll;
}

// 头部列表
.topbar-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ::v-deep {
    .el-form.demo-dynamic {
      margin-top: 20px;
      .el-form-item--medium {
        margin-bottom: 10px;
        .el-form-item__label {
          height: $formHeight;
          line-height: $formHeight;
          // label字体大小
          font-size: 12px;
        }
        .el-form-item__content {
          line-height: $formHeight;
          margin-bottom: 8px;

          // 列表输入框
          .el-input {
            height: $formHeight;
            line-height: $formHeight;
            width: 150px;
            // 提示文字字体大小
            font-size: 12px;
            .el-input__inner {
              height: $formHeight;
              line-height: $formHeight;
            }
            .el-select__caret.el-input__icon.el-icon-arrow-up {
              margin-top: 4px;
            }
            .el-select__caret.el-input__icon.el-icon-arrow-up.is-reverse {
              margin-top: -4px;
            }
          }
          // 选择框大小
          .el-select .el-input {
            width: 100px;
          }
          // 日期框大小
          .el-date-editor--date {
            width: 135px;
          }
          // 错误文字字体大小
          .el-form-item__error {
            font-size: 12px;
            margin-left: 14px;
          }
          .el-date-editor {
            .el-input__icon.el-icon-date {
              margin-left: 4px;
              line-height: $formHeight;
            }
          }
        }
      }
    }
    // 添加渠道按钮和按钮内字体大小
    .buttons .el-button--medium {
      font-size: 8px;
      margin-top: 4px;
    }
    .buttons {
      margin: 0 2vw 0 0;
      .filterbtn {
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: #253647;
        color: white;
        border: 1px solid #253647;
        border-radius: 2px;
        margin-right: 0.5vw;
      }
      .resetbtn {
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: transparent;
        color: #253647;
        border: 1px solid #253647;
        border-radius: 2px;
      }
    }
  }
}

// 中部内容显示区
.middle-wrapper {
  width: 100%;
  height: 37%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 0 2% 1%;
  //   margin-bottom: 10vh;
  // border: 1px solid black;

  // 主要内容显示区域
  .datalist {
    ::v-deep {
      .el-table.datalist.el-table--fit.el-table--enable-row-hover.el-table--enable-row-transition.el-table--medium {
        background-color: red;
      }
      .el-table__header-wrapper.el-table__header{
        color: red;

      }
      // 按钮样式
      .buttons .el-button--medium {
        font-size: 14px;
      }
      .buttons {
        .filterbtn {
          height: 3vh;
          padding: 0;
          background-color: transparent;
          color: #d79432;
          border: none;
          margin-right: 10px;
        }
        .resetbtn {
          height: 3vh;
          padding: 0;
          background-color: transparent;
          color: #f56c6c;
          border: none;
        }
      }
    }
  }
}

// 下方分页器
.content-foot {
  position: absolute;
  right: 10px;
  bottom: 10px;

  .el-pagination {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>