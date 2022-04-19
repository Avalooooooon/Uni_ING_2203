<template>
  <!-- 添加或修改业务对话框 -->
  <!--     :title="title" -->
  <el-dialog :visible.sync="open" width="75%" :close-on-click-modal="false">
    <div class="main-wrapper">
      <div slot="title" class="dialogTitle">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button> -->
        <span>{{ title }}</span>
      </div>
      <div class="titlebtn">
        <el-button class="downloadbtn" @click="cancel">下载素材</el-button>
      </div>
      <div class="puretext">
        为配合项目销售工作，更好的提高项目知名度、美誉度，增加积客量，圆满的完成销售任务，特制定如下广告计划。
        一、 宣传媒介
        广播类：根据济南广播市场分析，从受众人群、收听比例、价格服务等方面考虑，103.1交通调频于88.7音乐调频较适合本项目的推广。
        报纸广告类：根据济南市场报纸投放量调查，齐鲁晚报为现济南市场占有份额最大的报刊，覆盖人群广。济南时报每周三、五两天设有置业版块，楼盘信息相对集中，便于客户集中比较。以上两类报纸适合本项目的推广。
        户外广告类：根据项目进度、项目诉求卖点的深化等情况，及时跟进户外广告大牌、项目现场围挡、售楼处宣传画等的更新。
        二、 广告投放时间
        以市里新售楼处的落成及现场样板间的开放时间为节点，建议各类广告投放时间安排如下：
        1、9月1日前完成户外广告大牌的更新，广告内容以产品实景为主，并根据现场施工、绿化等情况分阶段更新。
        2、广播、报纸类广告建议在样板间开放前至少一周开始投放，预热市场；开放日前后3天加大投放量，集中强调样板房开放信息；样板间开放后各类媒体广告持续一个月（报纸类广告根据日期、版面不同.具体安排见附表），起到让我们的产品深入人心的作用；后期广告安排根据市场及现场销售情况再作调整。
      </div>

      <div class="applydetail">
        <div>申请人：{{ modulesData.name }}</div>
        <div>申请时间：{{ modulesData.requestdate }}</div>
        <div>审批人：{{ modulesData.title }}</div>
        <div>使用时间：{{ modulesData.requestdate }}</div>
        <div>审批时间：{{ modulesData.requestdate }}</div>
      </div>

      <div class="matlist">
        选择素材
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadFile"
        >
        </el-upload>
      </div>

      <div class="channellist">
        <el-table
          class="datalist"
          :data="modulesData2"
          style="width: 100%"
          height="100%"
          :header-cell-style="{
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
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// import {getById, addBizDefine, updateBizDefine} from "@/api/funds/routecenter/bizdefine";

export default {
  name: "RecordDetail",
  data() {
    return {
      // 后端传来的数据
      modulesData: {
        title: "title1",
        name: "aaa",
        requestdate: "2000-00-00 00:00",
        usedate: "2000-01-01 01:00",
        state: "订单审核",
        finalOperate: "me",
        id: "001",
      },
      // 后端传来的数据
      modulesData2: [
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
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
    };
  },
  methods: {
    // 窗口初始化方法，nextTick方法可以添加逻辑，如打开窗口时查询数据填充
    init(bizId) {
      this.open = true;
      //   this.$nextTick(() => {
      //     // getById(bizId).then(response => {
      //     //     this.bizform = response.data;
      //     //     this.open = true;
      //     //     this.title = "bizId";
      //     // });
      //     this.bizform = response.data;
      //     this.open = true;
      //     this.title = "bizId";
      //   });
      this.title = bizId;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["bizform"].validate((valid) => {
        if (valid) {
          if (this.bizform.id != undefined) {
            updateBizDefine(this.bizform).then((response) => {
              if (response.data) {
                this.msgSuccess("修改成功");
                this.open = false;
                // 调用主页面的getList方法刷新主页面
                this.$parent.getList();
              } else {
                this.msgError(response.resultMsg);
              }
            });
          } else {
            addBizDefine(this.bizform).then((response) => {
              if (response.data) {
                this.msgSuccess("新增成功");
                this.open = false;
                // 调用主页面的getList方法刷新主页面
                this.$parent.getList();
              } else {
                this.msgError(response.resultMsg);
              }
            });
          }
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
$titleHeight: 70px;
$formHeight: 28px;
// 弹窗内容外面的div
.el-dialog {
  position: relative;
}
.main-wrapper {
  height: 60vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

// 弹窗整体
::v-deep .el-dialog {
  // 标题区
  .el-dialog__header {
    height: $titleHeight;
    line-height: $titleHeight;
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
    .el-dialog__headerbtn {
      position: static;
    }
    // 右侧关闭键
    .el-dialog__close.el-icon.el-icon-close {
      color: #253647;
      font-size: 20px;
    }
  }
  // 内容区
  .el-dialog__body {
    padding-top: 5px;
  }
}

// 标题区域
.dialogTitle {
  height: $titleHeight;
  line-height: $titleHeight;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: 0px;

  .downloadbtn {
    height: 3.5vh;
    width: 5vw;
    padding: 0;
    background-color: #253647;
    color: white;
    border: none;
    border-radius: 2px;
    position: absolute;

    right: 0px;
  }
}
.titlebtn {
  height: $titleHeight;
  line-height: $titleHeight;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: 0px;
  right: 60px;

  .downloadbtn {
    height: 3.5vh;
    width: 5vw;
    padding: 0;
    background-color: #253647;
    color: white;
    border: none;
    border-radius: 2px;
  }
}

// 纯文本区域
.puretext {
  color: #949494;
  font-size: 12px;
  line-height: 2;
}

// 中部单行列表区域
.applydetail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333333;
}

// 选择素材区域
.matlist ::v-deep {
  height: 20%;

  .upload-demo:hover {
    border-color: #409eff;
  }
  .upload-demo {
    width: 35%;
    height: 100%;
    padding: 2px 10px 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // 三个内容位置及样式
    // 提示语
    .el-upload__tip {
      order: 2;
      margin: 0;
      height: 3vh;
      line-height: 3vh;
    }
    // 文件列表
    .el-upload-list.el-upload-list--text {
      order: -2;
      padding-bottom: 5px;
    }
  }
}

// 渠道列表区域
.channellist {
  .datalist {
    width: 100%;
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
// 根组件
.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 96%;
  background-color: white;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  margin: 2% 2%;
}

// 头部
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 3.5% 0 1% 3%;
  .title {
    font-size: 14px;
    font-weight: bolder;
  }

  // 设置按钮内字体大小
  ::v-deep {
    .btnsimg .el-button--medium {
      font-size: 12px;
    }
  }
  .btns {
    display: flex;

    .btnsimg {
      margin: 0 2vw 0;
      .cancelbtn {
        height: 3.5vh;
        width: 5vw;
        padding: 0;
        background-color: #253647;
        color: white;
        border: none;
        margin-right: 0.5vw;
        border-radius: 2px;
      }
      .submitbtn {
        height: 3.5vh;
        width: 5vw;
        padding: 0;
        background-color: #d79432;
        color: white;
        border: none;
        margin-right: 0.5vw;
        border-radius: 2px;
      }
    }
  }
}

// 上方列表
.content-head {
  display: flex;
  flex-direction: column;
  ::v-deep {
    .el-form.demo-dynamic {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
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
            width: 330px;
            // 提示文字字体大小
            font-size: 12px;
            .el-input__inner {
              height: $formHeight;
              line-height: $formHeight;
            }
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

      // 素材上传组件
      .upload-demo:hover {
        border-color: #409eff;
      }
      .upload-demo {
        width: 330px;
        height: 240px;
        padding: 2px 10px 10px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        // 三个内容位置及样式
        // 提示语
        .el-upload__tip {
          order: 2;
          margin: 0;
          height: 3vh;
          line-height: 3vh;
        }
        // 文件列表
        .el-upload-list.el-upload-list--text {
          order: -2;
          padding-bottom: 5px;
        }
        // 按钮和按钮内字体大小
        .buttons .el-button--medium {
          font-size: 8px;
        }
        .addbtn {
          height: 3vh;
          width: 14vw;
          padding: 0;
          background-color: #253647;
          color: white;
          border: none;
          border-radius: 4px;
        }
      }
    }
  }
}

// 中部标题
.middle-wrapper {
  display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 3.5% 0 1% 3%;
  .title {
    font-size: 14px;
    font-weight: bolder;
  }
}

// 下方列表
.content-foot {
  display: flex;
  flex-direction: column;
  ::v-deep {
    .el-form.demo-dynamic {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
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
            width: 300px;
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
          .el-select .el-input {
            width: 150px;
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
      .el-icon-remove-outline {
        height: $formHeight;
        line-height: $formHeight;
        font-size: 24px;
        cursor: pointer;
      }
    }
    // 添加渠道按钮和按钮内字体大小
    .buttons .el-button--medium {
      font-size: 8px;
    }
    .addbtn {
      margin-left: 100px;
      margin-bottom: 80px;
      height: 3vh;
      width: 150px;
      padding: 0;
      background-color: #253647;
      color: white;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>