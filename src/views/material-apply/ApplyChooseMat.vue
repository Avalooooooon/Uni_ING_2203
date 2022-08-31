<template>
  <!-- 素材投放——投放申请——选择素材界面 -->
  <div class="content-wrapper">
    <div class="topbar-wrapper">
      <div class="title">选择素材</div>
      <div class="btns">
        <div class="btnsimg">
          <el-button type="primary" class="cancelbtn" @click="toMaterialApply"
            >取消</el-button
          >
          <el-button type="primary" class="submitbtn" @click="submitMatApply"
            >选择</el-button
          >
        </div>
      </div>
    </div>

    <div class="content-head">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item label="素材名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="素材类型" prop="type">
          <el-select v-model="form.type" class="input" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="上传人" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="上传时间" prop="date">
          <el-date-picker
            v-model="form.date"
            size="mini"
            class="filterBox"
            type="date"
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
      <div
        v-for="item in modulesData"
        :key="item.id"
        class="singlemoudle"
        @click="chooseMat(item.id, item.name)"
      >
        <img
          :id="item.id"
          class="appimg"
          :class="{ appimgActive: chooseId == item.id }"
          :src="
            item.image
              ? 'https://www.uniwarm.net' + item.image
              : images.emptyimg
          "
        >

        <div class="textversion" :class="{ textActive: chooseId == item.id }">
          {{ item.name }}
        </div>
        <div class="timeversion" :class="{ textActive: chooseId == item.id }">
          {{ item.create_date }}
        </div>
      </div>
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
import { getToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'ApplyChooseMat',
  data() {
    return {
      images: {
        // 占位图
        emptyimg: require('@/assets/empty.jpg')
      },
      url: 'https://www.uniwarm.net',
      imageUrl: '',

      // 传给投放申请的数据
      chooseId: -1,
      chooseName: '',

      // 素材类型的可选值
      options: [
        { value: '001', label: '视频素材' },
        { value: '002', label: '图片素材' },
        { value: '003', label: '图文素材' },
        { value: '004', label: '图集素材' }
      ],
      // 素材的名称、类型、上传人、上传时间
      form: {
        title: '',
        type: '',
        name: '',
        date: ''
      },

      // 发送给后端的数据
      materialParams: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 8,
        itemid: this.detailid,
        page: 8
      },
      materialParams1: {
        bizid: 'uniwarm',
        token: getToken(),
        listid: 8
      },

      // 后端传来的数据
      modulesData: [
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂1',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '1'
        },
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂2',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '2'
        },
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂3',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '3'
        },
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂11123',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '4'
        },
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂11123',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '5'
        },
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂11123',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '6'
        },
        {
          image: '/appsrc/biz/uniwarm/wechatweb/static/home/hello.png',
          name: '品牌灵魂11123',
          type: '视频',
          uploadName: 'xxx',
          create_date: '2016-05-02',
          id: '7'
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
    // 点击右上取消按钮，返回素材库页
    toMaterialApply(event) {
      this.$router.push({
        name: "MatApply",
      });
    },
    // 点击右上提交按钮，返回投放申请页
    submitMatApply(event) {
      if (this.chooseId && this.chooseName) {
        this.$router.push({
          name: 'MatApply',
          query: {
            matid: this.chooseId,
            matname: this.chooseName
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '未选择素材'
        })
      }
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
    }
    .buttons {
      margin: 0 2vw 0;
      .filterbtn {
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: transparent;
        color: #707275;
        border: 1px solid #989a9e;
        border-radius: 4px;
        margin-right: 0.4vw;
      }
      .resetbtn {
        height: 3vh;
        width: 4vw;
        padding: 0;
        background-color: transparent;
        color: #d79432;
        border: 1px solid #d79432;
        border-radius: 4px;
        margin-right: 0.5vw;
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
  // margin-bottom: 10vh;
  // border: 1px solid black;

  // 主要内容显示区域（单个）
  .singlemoudle {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    // justify-content: space-between;
    align-content: flex-start;
    // border: 1px solid blue;

    width: 20%;
    height: 100%;
    padding: 1% 10px 0 10px;
    text-align: center;
    font-size: 14px;

    // background-color: antiquewhite;
    .appimg {
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      cursor: pointer;
    }
    .appimgActive {
      width: 100%;
      height: 100%;
      border: 2px solid #d79432;
      cursor: pointer;
    }
    .textversion {
      font-size: 14px;
      height: 9%;
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
      height: 5%;
      //border: 1px solid red;
      font-weight: bold;
      margin: 0;
      //margin: 1.5vh 0 1vh 0;
    }
    .textActive {
      color: #d79432;
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
