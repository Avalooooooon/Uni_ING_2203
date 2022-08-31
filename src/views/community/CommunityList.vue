<template>
  <!-- 素材投放——投放申请界面 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="btns">
        <div class="btnsimg">
          <el-date-picker
            v-model="form.dateTime"
            class="checkTime"
            type="daterange"
            size="mini"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
          <el-autocomplete
            v-model="form.name"
            class="search"
            prefix-icon="el-icon-search"
            size="mini"
            :fetch-suggestions="querySearch"
            placeholder="请输入动态标题内容或用户昵称"
            @select="handleSelect"
          />
        </div>
      </div>
    </div>

    <div v-for="item in postList" :key="item" class="content-head">
      <el-card :body-style="{ padding: '0px' }" class="box-card">
        <div class="card-content">
          <div style="width: 100%;height: 160px;display: flex" @click="handleDetail">
            <div style="width: 30%;height: 100%;border-radius: 5px;border: 1px solid lightgray;">
              <img style="height: 100%;width: 100%;" src="../../assets/p1.jpg" alt="">
            </div>
            <div style="width: 70%;height: 100%;padding:0 10px;">
              <div style="width:100%; height: 30px;box-sizing: border-box;padding-left: 10px;line-height: 30px;font-size: 15px;font-weight: bold;white-space: nowrap; overflow: hidden;text-overflow:ellipsis;">{{ item.title }}</div>
              <div style="width: 100%;height: 85px;padding: 10px;font-size: 13px;color: gray;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;text-overflow:ellipsis;">
                {{ item.content }}
              </div>
              <div style="width: 100%;height: 40px;line-height: 40px;display: flex;font-size: 13px;margin-top: 10px;padding-left: 10px;">
                <div style="height: 40px;line-height: 30px;margin-right: 20px;">
                  <i class="el-icon-thumb" /> {{ item.awesome }}
                </div>
                <div style="height: 40px;line-height: 30px;margin-right: 20px;">
                  <i class="el-icon-star-off" /> {{ item.collect }}
                </div>
                <div style="height: 40px;line-height: 30px;">
                  <i class="el-icon-chat-dot-square" /> {{ item.discuss }}
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%;height: 40px;line-height: 40px;display: flex;font-size: 13px;position: relative;">
            <div style="width: 100%;height: 40px;line-height: 40px;font-size: 12px;">
              <i class="el-icon-user-solid" /><span style="margin-left: 5px;">{{ item.name }}</span><span style="margin-left: 10px;">{{ item.time }}</span>
            </div>
            <div style="color: #ca9313;line-height: 30px;position: absolute;right: 10px; cursor: pointer;display: block;">
              <button style="width: 80px;height: 25px;margin-top: 5px;color: white; background-color: #273648;font-size: 12px;border: none;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// import {
//   fetchDesignerListDetail,
//   materialListUpload,
//   delDesignerListDetail,
// } from "@/api/material";
import { getToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'DetailCommunity',
  // props: ['matid', 'matname'],

  data() {
    return {
      url: 'https://www.uniwarm.net',
      postList: [
        {
          title: '中方回应“佩洛西访台”：严阵以待',
          content: '7月25日，外交部发言人赵立坚主持例行记者会。路透社记者提问，《金融时报》报道称，中方在美国众议长佩洛西可能访台的问题上加强了警告。消息人士说，这可能会导致中方的军事反应。请问中方对该报道有何回应？如果不采取军事行动，若佩洛西访台，中方将以何种方式回应？',
          name: '北京日报客户端',
          time: '2022-07-25 16:22',
          awesome: '1.5w',
          collect: '2564',
          discuss: '8362'
        }
      ],
      form: {
        dateTime: '',
        name: ''
      }
    }
  },

  created() {
  },

  methods: {
    handleDetail() {
      console.log('123')
      this.$router.push({
        name: 'DetailCommunity'
      })
    },
    // 冻结帖子弹窗
    freeze() {
      this.$confirm('确定要冻结该评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '冻结成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
  //flex-wrap: no-wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 96%;
  background-color: white;
  height: calc(100vh - 130px);
  overflow-y: scroll;
  margin: 40px 2%;
}

// 头部
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 2% 0 2% 3%;
  position: relative;
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
    //width: 100%;
    display: flex;
    position: absolute;
    right: 3vw;
    //border: 1px solid black;
    .search {
      height: 100%;
      width: 12vw;
      min-width: 230px;
      padding: 0;
      border-radius: 2px;
      margin-left: 1vw;
    }
      .checkTime {
        height: 100%;
        width: 15vw;
        min-width: 200px;
        //padding: 0;
        border-radius: 2px;
        margin-right: 0.5vw;
      }
    //}
  }
}

// 上方列表
.content-head {
  display: flex;
  //flex-direction: column;
  //justify-content: center;
  //border: 1px solid red;
  padding: 15px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  .box-card {
    width: 23%;
    height: 210px;
    min-width: 350px;
    margin-left: 15px;
    margin-right: 15px;
    cursor: pointer;
    margin-bottom: 30px;
    .card-content{
      //border: 1px solid blue;
      width: 100%;
      height: 200px;
      box-sizing: border-box;
      padding: 10px;
    }
  }
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
