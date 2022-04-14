<template>
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="title">素材库</div>
      <div class="btns">
        <div class="btnsimg">
          <el-button
            type="primary"
            class="cancelbtn"
            @click="toMaterialLib"
            >取消</el-button
          >
          <el-button
            type="primary"
            class="submitbtn"
            @click="submitMatApply"
            >提交</el-button
          >
        </div>
      </div>
    </div>

    <div class="content-head">
      <el-form
        ref="matForm"
        :model="matForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          label="投放名称"
          prop="name"
          :rules="[{ required: true, message: '名称不能为空' }]"
        >
          <el-input
            v-model="matForm.name"
            placeholder="请输入投放名称"
            type="name"
            ocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="使用说明"
          prop="instruction"
          :rules="[{ required: true, message: '使用说明不能为空' }]"
        >
          <el-input
            v-model="matForm.instruction"
            placeholder="请输入使用说明"
            type="name"
            ocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="使用时间"
          prop="instruction"
          :rules="[{ required: true, message: '使用时间不能为空' }]"
        >
          <el-date-picker
            v-model="matForm.time"
            type="date"
            placeholder="选择使用时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择素材" prop="material" required>
          <!-- action="/v3upload/admin_person2" -->
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
            <div class="edit">
              <div class="buttons">
                <!-- <el-button slot="trigger" type="primary" class="addbtn"
                  >添加素材</el-button> -->
                  <el-button class="addbtn" @click="toApplyChooseMat"
                  >添加素材</el-button>
                <!-- <el-button
                style="margin-left: 10px"
                size="small"
                type="success"
                @click="submitUpload"
                >上传到服务器</el-button
              > -->
              </div>
              <!-- <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <div class="middle-wrapper">
      <div class="title">投放渠道</div>
    </div>

    <div class="content-foot">
      <el-form
        :inline="true"
        :model="channelForm"
        ref="channelForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <div v-for="(item, index) in channelForm.channels" :key="index">
          <el-form-item
            :label="'渠道' + (index + 1)"
            :prop="'channels.' + index + '.channel'"
            :rules="[
              { required: true, message: '请选择渠道', trigger: 'change' },
            ]"
          >
            <el-select
              class="input"
              v-model="item.channel"
              placeholder="请选择渠道"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="'链接' + (index + 1)"
            :prop="'channels.' + index + '.link'"
            :rules="[
              { required: true, message: '链接不能为空', trigger: 'blur' },
            ]"
          >
            <el-input v-model="channelForm.link"></el-input>
          </el-form-item>

          <el-form-item
            :label="'运营号' + (index + 1)"
            :prop="'channels.' + index + '.name'"
            :rules="[
              { required: true, message: '运营号不能为空', trigger: 'blur' },
            ]"
          >
            <el-input v-model="channelForm.name"></el-input>
          </el-form-item>

          <i
            v-if="channelForm.channels.length > 1"
            class="el-icon-remove-outline"
            @click="delChannel(index)"
          ></i>
        </div>
      </el-form>
      <!-- <i class="el-icon-circle-plus" @click="addChannel"></i> -->
      <div class="buttons">
        <el-button class="addbtn" @click="addChannel">添加渠道</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   fetchDesignerListDetail,
//   materialListUpload,
//   delDesignerListDetail,
// } from "@/api/material";
import { getToken } from "@/utils/auth";
import axios from "axios";

export default {
  name: "MatApply",
  data() {
    return {
      url: "https://www.bizspace.cn",
      imageUrl: "",
      // 素材的投放名称、使用说明、使用时间
      matForm: {
        name: "",
        instruction: "",
        time: "",
      },
      // 上传的素材列表
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],

      // 渠道的名字、链接、运营号
      channelForm: {
        channels: [
          { channel: "", link: "", name: "" },
          { channel: "", link: "", name: "" },
        ], //默认展示一行部门数据
      },
      // 渠道的可选值
      options: [
        { value: "001", label: "小红书" },
        { value: "002", label: "抖音" },
        { value: "003", label: "快手" },
        { value: "004", label: "微博" },
      ],

      // 发送给后端的数据
      materialParams: {
        bizid: "uniwarm",
        token: getToken(),
        listid: 8,
        itemid: this.detailid,
      },
      materialParams1: {
        bizid: "uniwarm",
        token: getToken(),
        listid: 8,
      },

      // 后端传来的数据
      materialData: [],
    };
  },

  methods: {
    // 点击右上取消按钮，返回素材库页面
    toMaterialLib(event) {
      this.$router.push({
        name: "MatLib",
      });
    },

    // 点击右上提交按钮
    submitMatApply(event) {
      this.$confirm("确定提交本次申请？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() =>
          axios({
            url: "/api/v3/person2/xxx",
            method: "post",
            params: {
              bizid: "uniwarm",
              token: getToken(),
              listid: this.listid,
            },
            data: this.numberValidateForm,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log(this.materialParams);
            console.log(this.numberValidateForm);
            console.log(res);
            if (res.data.res === 0) {
              this.$router.go(-1);
              this.$message({
                type: "success",
                message: "上传成功",
              });
              setTimeout(() => {
                this.$router.push({
                  name: "MatRecord",
                });
              }, "500");
            } else {
              this.$message({
                type: "error",
                message: "上传失败",
              });
            }
          })
        )
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上传",
          });
        });

    },

    // 点击添加素材按钮
    toApplyChooseMat(event) {
      this.$router.push({
        name: "ApplyChooseMat",
      });
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    // 增加渠道条目
    addChannel() {
      this.channelForm.channels.push({ channel: "", link: "", name: "" });
    },
    // 删除渠道条目
    delChannel(index) {
      this.channelForm.channels.splice(index, 1);
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