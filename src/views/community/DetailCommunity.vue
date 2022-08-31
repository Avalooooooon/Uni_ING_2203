<template>
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="back" @click="toback">
        <i class="el-icon-arrow-left" />
        动态详情
      </div>
    </div>

    <div class="content-head">
      <div class="postDetails">
        <div style="width: 100%;font-size: 15px;font-weight: bold;">
          中方回应“佩洛西访台”：严阵以待
        </div>
        <div style="width: 100%;height: 50px;line-height: 50px;font-size: 12px;color: gray;">
          <i class="el-icon-user-solid" /><span style="margin-left: 5px;">北京日报客户端</span><span style="margin-left: 10px;">2022 / 07 / 25 16:22</span>
          <button style="width: 80px;height: 25px;margin-top: 5px;margin-left: 50px;color: white; background-color: #273648;font-size: 12px;border: none;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
        </div>
        <div style="width: 90%;height: 70%;background-color: #e9ebf4"><img style="height: 100%;width: 100%;" src="../../assets/p1.jpg" alt=""></div>
        <div style="width: 90%;position: relative;font-size: 25px;box-sizing: border-box;padding: 10px 0;display: flex;">
          <i style="font-weight: bold;cursor: pointer;" class="el-icon-arrow-left" />
          <i style="font-weight: bold;position: absolute;cursor: pointer;right: 0;" class="el-icon-arrow-right" />
        </div>
        <div style="width: 90%;font-size: 14px;color: gray;line-height: 25px;">
          7月25日，外交部发言人赵立坚主持例行记者会。路透社记者提问，《金融时报》报道称，中方在美国众议长佩洛西可能访台的问题上加强了警告。消息人士说，这可能会导致中方的军事反应。请问中方对该报道有何回应？如果不采取军事行动，若佩洛西访台，中方将以何种方式回应？
        </div>
        <div style="width: 90%;height: 40px;line-height: 40px;display: flex;font-size: 13px;margin-top: 10px;">
          <div style="height: 40px;line-height: 30px;margin-right: 20px;">
            <i class="el-icon-thumb" /> 100
          </div>
          <div style="height: 40px;line-height: 30px;margin-right: 20px;">
            <i class="el-icon-star-off" /> 100
          </div>
          <div style="height: 40px;line-height: 30px;">
            <i class="el-icon-chat-dot-square" /> 100
          </div>
        </div>
      </div>
      <div style="width: 1%;height: 95%;margin-top: 1.25%;border-left: 1px solid #e3e5ed;"></div>
      <div style="width: 69%;padding: 0 20px 20px 40px;">
        <h4>评论 (100)</h4>
        <div class="Comment-list">

          <div style="border-bottom: 1px solid #e3e5ed; padding: 30px 0 40px 0;">
            <div class="Comment-head">
              <div class="avatar"></div>
              <div class="avatar-message">
                <div class="comment-message" style="font-weight: bold;">熊大</div>
                <div class="comment-message" style="color: #898989;font-size: 13px;position: relative;">
                  请问您说的维修方案，预估需要多少钱呢？
                  <span style="position: absolute;right: 150px;">2022 / 02 / 05  14:00</span>
                  <button style="position: absolute;font-weight: bold;right: 40px;width: 80px;height: 25px;margin-left: 50px;color: #d19324; background-color: white;font-size: 12px;border: 1px solid #d19324;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
                </div>
              </div>
            </div>
            <div class="reply">
              <div>
                <span style="color: #d19324;font-weight: bold">辛黛瑞拉</span> 回复 <span style="color: #d19324;font-weight: bold">白雪公主</span> : 您预算多少呢？
                <span style="position: absolute;right: 150px;color: #898989;">2022 / 02 / 05  14:00</span>
              </div>
              <div>
                <span style="color: #d19324;font-weight: bold">辛黛瑞拉</span> 回复 <span style="color: #d19324;font-weight: bold">仙女酵母</span> : 您预算多少呢？
                <span style="position: absolute;right: 150px;color: #898989;">2022 / 02 / 05  14:00</span>
              </div>
              <div style="color: #d19324;cursor: pointer;margin-top: 5px;font-weight: bold" @click="openComment">共5条回复 ></div>
            </div>
          </div>

          <div style="border-bottom: 1px solid #e3e5ed;padding: 30px 0 40px 0;">
            <div class="Comment-head">
              <div class="avatar"></div>
              <div class="avatar-message">
                <div class="comment-message" style="font-weight: bold;">熊大</div>
                <div class="comment-message" style="color: #898989;font-size: 13px;position: relative;">
                  请问您说的维修方案，预估需要多少钱呢？
                  <span style="position: absolute;right: 150px;">2022 / 02 / 05  14:00</span>
                  <button style="position: absolute;font-weight: bold;right: 40px;width: 80px;height: 25px;margin-left: 50px;color: #d19324; background-color: white;font-size: 12px;border: 1px solid #d19324;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
                </div>
              </div>
            </div>
            <div class="reply">
              <div>
                <span style="color: #d19324;font-weight: bold">辛黛瑞拉</span> 回复 <span style="color: #d19324;font-weight: bold">白雪公主</span> : 您预算多少呢？
                <span style="position: absolute;right: 150px;color: #898989;">2022 / 02 / 05  14:00</span>
              </div>
              <div>
                <span style="color: #d19324;font-weight: bold">辛黛瑞拉</span> 回复 <span style="color: #d19324;font-weight: bold">仙女酵母</span> : 您预算多少呢？
                <span style="position: absolute;right: 150px;color: #898989;">2022 / 02 / 05  14:00</span>
              </div>
              <div style="color: #d19324;cursor: pointer;margin-top: 5px;font-weight: bold">共5条回复 ></div>
            </div>
          </div>

          <div style="padding: 30px 0 40px 0;">
            <div class="Comment-head">
              <div class="avatar"></div>
              <div class="avatar-message">
                <div class="comment-message" style="font-weight: bold;">熊大</div>
                <div class="comment-message" style="color: #898989;font-size: 13px;position: relative;">
                  请问您说的维修方案，预估需要多少钱呢？
                  <span style="position: absolute;right: 150px;">2022 / 02 / 05  14:00</span>
                  <button style="position: absolute;font-weight: bold;right: 40px;width: 80px;height: 25px;margin-left: 50px;color: #d19324; background-color: white;font-size: 12px;border: 1px solid #d19324;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
                </div>
              </div>
            </div>
            <div class="reply">
              <div>
                <span style="color: #d19324;font-weight: bold">辛黛瑞拉</span> 回复 <span style="color: #d19324;font-weight: bold">白雪公主</span> : 您预算多少呢？
                <span style="position: absolute;right: 150px;color: #898989;">2022 / 02 / 05  14:00</span>
              </div>
              <div>
                <span style="color: #d19324;font-weight: bold">辛黛瑞拉</span> 回复 <span style="color: #d19324;font-weight: bold">仙女酵母</span> : 您预算多少呢？
                <span style="position: absolute;right: 150px;color: #898989;">2022 / 02 / 05  14:00</span>
              </div>
              <div style="color: #d19324;cursor: pointer;margin-top: 5px;font-weight: bold">共5条回复 ></div>
            </div>
          </div>
          <!--          回复弹窗-->
          <el-dialog
            title="评论详情"
            :visible.sync="centerDialogVisible"
            width="50%"
            center
          >
            <div style="width: 100%;">
              <div style="padding: 30px 0 40px 0;">
                <div class="Comment-head" style="padding-bottom: 20px;border-bottom: 1px solid #e3e5ed">
                  <div class="avatar"></div>
                  <div class="avatar-message">
                    <div class="comment-message" style="font-weight: bold;">熊大</div>
                    <div class="comment-message" style="color: #898989;font-size: 13px;">
                      请问您说的维修方案，预估需要多少钱呢？
                      <span style="position: absolute;right: 40px;">2022 / 02 / 05  14:00</span>
                    </div>
                  </div>
                </div>
                <div style="width: 100%;">
                  <h4>全部回复 (158)</h4>
                  <div class="Comment-head" style="padding-bottom: 20px;">
                    <div class="avatar"></div>
                    <div class="avatar-message">
                      <div class="comment-message">
                        <span style="font-weight: bold;">熊二</span>
                        <span style="position: absolute;right: 40px;color: #898989;">2022 / 02 / 05  14:00</span>
                      </div>
                      <div class="comment-message" style="color: #898989;font-size: 13px;">
                        回复 <span style="color: #d19324;font-weight: bold">仙女酵母</span> : 请问您说的维修方案，预估需要多少钱呢?
                        <button style="position: absolute;font-weight: bold;right: 40px;width: 80px;height: 25px;margin-left: 50px;color: #d19324; background-color: white;font-size: 12px;border: 1px solid #d19324;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
                      </div>
                    </div>
                  </div>
                  <div class="Comment-head" style="padding-bottom: 20px;">
                    <div class="avatar"></div>
                    <div class="avatar-message">
                      <div class="comment-message">
                        <span style="font-weight: bold;">熊二</span>
                        <span style="position: absolute;right: 40px;color: #898989;">2022 / 02 / 05  14:00</span>
                      </div>
                      <div class="comment-message" style="color: #898989;font-size: 13px;">
                        回复 <span style="color: #d19324;font-weight: bold">仙女酵母</span> : 请问您说的维修方案，预估需要多少钱呢?
                        <button style="position: absolute;font-weight: bold;right: 40px;width: 80px;height: 25px;margin-left: 50px;color: #d19324; background-color: white;font-size: 12px;border: 1px solid #d19324;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
                      </div>
                    </div>
                  </div>
                  <div class="Comment-head" style="padding-bottom: 20px;">
                    <div class="avatar"></div>
                    <div class="avatar-message">
                      <div class="comment-message">
                        <span style="font-weight: bold;">熊二</span>
                        <span style="position: absolute;right: 40px;color: #898989;">2022 / 02 / 05  14:00</span>
                      </div>
                      <div class="comment-message" style="color: #898989;font-size: 13px;">
                        回复 <span style="color: #d19324;font-weight: bold">仙女酵母</span> : 请问您说的维修方案，预估需要多少钱呢?
                        <button style="position: absolute;font-weight: bold;right: 40px;width: 80px;height: 25px;margin-left: 50px;color: #d19324; background-color: white;font-size: 12px;border: 1px solid #d19324;border-radius: 5px;cursor: pointer;" @click="freeze">冻结</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   fetchDesignerListDetail,
//   materialListUpload,
//   delDesignerListDetail,
// } from "@/api/material"
import { getToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'DetailCommunity',
  // props: ['matid', 'matname'],

  data() {
    return {
      url: 'https://www.uniwarm.net',
      centerDialogVisible: false
    }
  },

  created() {
  },

  methods: {
    // 返回上一级
    toback() {
      this.$router.go(-1)
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
    },
    openComment() {
      this.centerDialogVisible = true
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
  flex-wrap: no-wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 100%;
  background-color: #e9ebf4;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  //margin: 40px 2%;
}

// 头部
.topbar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 2% 0 1% 2%;
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
    //display: flex;
    //border: 1px solid red;
    width: 100%;
    position: relative;
    //float: right;
    //position: relative;
    //.btnsimg {
    //  //margin: 0 2vw 0;
    //  border: 1px solid blue;
    //  float: right;
    //  //width: 100%;
    //  position: absolute;
    //  right: 0;
    .search {
      height: 30px;
      width: 10vw;
      //padding: 0;
      //background-color: #d79432;
      //color: white;
      //border: none;
      margin-right: 2vw;
      border-radius: 2px;
      float: right;
    }
    .checkTime {
      height: 30px;
      width: 15vw;
      //padding: 0;
      //background-color: #253647;
      //color: white;
      //border: none;
      //margin-right: 0.5vw;
      position: absolute;
      right: 14vw;
      border-radius: 2px;
      //float: right;
    }
    //}
  }
}

// 上方列表
.content-head {
  width: 96%;
  height: 83vh;
  display: flex;
  background-color: white;
  //flex-direction: column;
  //justify-content: center;
  //border: 1px solid red;
  margin: 20px 2% 40px 2%;
  border-radius: 5px;
  .postDetails {
    width: 30%;
    height: 100%;
    min-width: 400px;
    max-width: 500px;
    box-sizing: border-box;
    //border: 1px solid red;
    //border-right: 1px solid lightgray;
    padding: 20px;
    //padding-bottom: 20px;
    //overflow: hidden;
    overflow-y: scroll;
  }
  .postDetails::-webkit-scrollbar{
    width: 6px;
  }
  .postDetails::-webkit-scrollbar-thumb{
    background: transparent;
    border-radius: 4px;
  }
  .postDetails:hover::-webkit-scrollbar-thumb{
    background: lightgray;
  }
  .postDetails:hover::-webkit-scrollbar-track{
    background: white;
  }
  .Comment-list{
    width: 100%;
    //border: 1px solid black;
    .Comment-head {
      width: 100%;
      //height: 50px;
      //border: 1px solid black;
      display: flex;
      .avatar {
        width: 50px;
        height: 50px;
        background-color: lightgray;
        border-radius: 50px;
      }
      .avatar-message{
        width: calc(100% - 50px);
        height: 50px;
        //border: 1px solid red;
        .comment-message {
          line-height: 25px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 15px;
        }
      }
    }
    .reply {
      width: 100%;
      //border: 1px solid black;
      box-sizing: border-box;
      padding-left: 65px;
      margin-top: 10px;
      font-size: 13px;
      line-height: 25px;
      position: relative;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
