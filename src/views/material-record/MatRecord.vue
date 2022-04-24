<template>
  <!-- 素材投放——投放记录 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="60px"
        class="demo-dynamic"
      >
        <el-form-item label="投放名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" class="input" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="申请人" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
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
      <el-table
        class="datalist"
        :data="modulesData"
        style="width: 100%"
        height="100%"
        :header-cell-style="{
          background: '#E9EBF4',
          color: '#000000',
          fontSize: '13px',
        }"
        :cell-style="{ color: '#616369', fontSize: '14px' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="title"
          label="投放名称"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="name"
          label="申请人"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="requestdate"
          label="申请时间"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="usedate"
          label="使用时间"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="state"
          label="状态"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="finalOperate"
          label="最后操作人"
          min-width="160"
          align="center"
        />
        <el-table-column label="操作" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="buttons">
              <el-button
                :id="scope.row.id"
                class="filterbtn"
                @click="showDetailDialog"
              ><i class="el-icon-view el-icon--right" /> 查看</el-button>
              <el-button
                :id="scope.row.id"
                class="resetbtn"
                @click="showWithdrawDialog"
                icon="el-icon-delete"
              >删除</el-button>
            </div>
          </template>
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

    <!-- 使用弹窗组件 -->
    <RecordDetail v-if="openDetailDialog" ref="detailDialog" title="查看详情" />
    <RecordWithdraw
      v-if="openWithdrawDialog"
      ref="withdrawDialog"
      title="测试窗口"
    />
  </div>
</template>

<script>
// import {
//   fetchDesignerListDetail,
//   materialListUpload,
//   delDesignerListDetail,
// } from "@/api/appmaterial";
import RecordDetail from './RecordDetail'
import RecordWithdraw from './RecordWithdraw'

import { getToken } from '@/utils/auth'
// import axios from 'axios'

export default {
  name: 'MatRecord',
  // 注册组件
  components: { RecordDetail, RecordWithdraw },
  data() {
    return {
      // 显示窗口
      openDetailDialog: false,
      openWithdrawDialog: false,

      url: 'https://www.bizspace.cn',

      // 传给投放申请的数据
      chooseId: -1,
      chooseName: '',

      // 素材类型的可选值
      options: [
        { value: '001', label: '订单审核' },
        { value: '002', label: '审核通过' },
        { value: '003', label: '停止审核' }
      ],
      // 顶部：投放的名称、状态、申请人、上传时间、使用时间
      form: {
        title: '',
        state: '',
        name: '',
        applydate: '',
        usedate: ''
      },

      // 发送给后端的数据
      materialParams: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 8,
        itemid: this.detailid,
        page: 8
      },
      materialParamsdel: {
        bizid: 'uniwarm',
        token: getToken(),
        itemid: '',
        listid: 8
      },

      // 后端传来的数据
      modulesData: [
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '002'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '003'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '004'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '005'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        },
        {
          title: 'title1',
          name: 'aaa',
          requestdate: '2000-00-00 00:00',
          usedate: '2000-01-01 01:00',
          state: '订单审核',
          finalOperate: 'me',
          id: '001'
        }
      ],
      total: 300,
      pagerow: 20
    }
  },

  created() {
    // this.getMaterialList();
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      return 'transparent'
    },

    // 点击查看按钮，弹出素材详情
    showDetailDialog(event) {
      // this.$router.push({
      // name: "RecordDetail",
      // query: {
      //     matid: this.chooseId,
      //     matname: this.chooseName,
      //   },
      // });
      const id = event.currentTarget.getAttribute('id')

      this.openDetailDialog = true
      this.$nextTick(() => {
        this.$refs.detailDialog.init(id)
      })
    },
    // 点击删除按钮，弹出撤回
    showWithdrawDialog(event) {
      const id = event.currentTarget.getAttribute('id')

      this.openWithdrawDialog = true
      this.$nextTick(() => {
        this.$refs.withdrawDialog.init(id)
      })
    },

    // 重置表单
    reset() {
      this.$refs['form'].resetFields()
    },

    // 钩子函数：从后台拿数据
    getMaterialList() {
      this.materialParamsFetch.page = this.materialParamsFetch.page - 1
      fetchMaterialList(this.materialParamsFetch)
        .then((response) => {
          this.total = response.total
          this.modulesData = response.data
          this.materialParamsFetch.page = this.materialParamsFetch.page + 1
        })
        .catch((err) => {
          console.log(err)
        })
    },
    chooseMat(id, name) {
      this.chooseId = id
      this.chooseName = name
      console.log(name)
    },

    // 分页器
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.materialParams.page = currentPage
      console.log(this.materialParams.page)
      this.getMaterialList()
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
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
  height: 82%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 0 2% 0 0;
  //   margin-bottom: 10vh;
  // border: 1px solid black;

  // ::v-deep .el-table .red{
  //   background: red;
  // }
  // 主要内容显示区域
  .datalist {
    width: 100%;
    margin-top: 30px;
    ::v-deep {
      width: 100%;
      .el-table__header-wrapper .el-table__header tr th {
        width: 110px !important;
        border: 0;
      }
      .el-table__body tr:hover > td {
        background-color: #fff !important;
      }
      .transparent {
        background: #e9ebf4;
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
