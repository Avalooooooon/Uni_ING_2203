<template>
  <!-- 素材投放——投放记录——查看投放详情弹窗 -->
  <!--     :title="title" -->
  <el-dialog :visible.sync="open" width="75%" :close-on-click-modal="false">
    <div class="main-wrapper">
      <div slot="title" class="dialogTitle">
        <span>{{ title }}</span>
        <span class="green">{{ title }}</span>
      </div>
      <div class="titlebtn">
        <el-button class="downloadbtn" @click="downloadMat">下载素材</el-button>
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
        <div>选择素材：</div>
        <el-upload
          ref="upload"
          class="upload-demo"
          :file-list="fileList"
          :auto-upload="false"
        />
      </div>

      <div class="channellist">
        <el-table
          class="datalist"
          :data="modulesData2"
          style="width: 50%"
          height="100px"
          :header-cell-style="{
            color: '#000000',
            fontSize: '13px',
            fontWight: 'normal',
          }"
          :cell-style="{ color: '#81838A', fontSize: '12px' }"
        >
          <el-table-column
            prop="id"
            label="渠道id"
            min-width="30"
            align="center"
          />
          <el-table-column
            prop="name"
            label="渠道名称"
            min-width="40"
            align="center"
          />
          <el-table-column
            prop="url"
            label="渠道地址"
            min-width="100"
            align="center"
          />
          <el-table-column
            prop="account"
            label="运营号"
            min-width="50"
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
  name: 'RecordDetail',
  data() {
    return {
      // 后端传来的数据-中部单行列表
      modulesData: {
        title: 'title1',
        name: 'aaa',
        requestdate: '2000-00-00 00:00',
        usedate: '2000-01-01 01:00',
        state: '订单审核',
        finalOperate: 'me',
        id: '001'
      },
      // 后端传来的数据-素材列表
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      // 后端传来的数据-下方渠道列表
      modulesData2: [
        {
          id: '001',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        },
        {
          id: '002',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        },
        {
          id: '003',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        },
        {
          id: '004',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        },
        {
          id: '005',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        },
        {
          id: '006',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        },
        {
          id: '007',
          url: 'http://www.baidubaidu.com',
          name: 'aaa',
          account: '小红'
        }
      ],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false
    }
  },
  methods: {
    // 窗口初始化方法，nextTick方法可以添加逻辑，如打开窗口时查询数据填充
    init(bizId) {
      this.open = true
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
      this.title = bizId
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    downloadMat() {},
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['bizform'].validate((valid) => {
        if (valid) {
          if (this.bizform.id != undefined) {
            updateBizDefine(this.bizform).then((response) => {
              if (response.data) {
                this.msgSuccess('修改成功')
                this.open = false
                // 调用主页面的getList方法刷新主页面
                this.$parent.getList()
              } else {
                this.msgError(response.resultMsg)
              }
            })
          } else {
            addBizDefine(this.bizform).then((response) => {
              if (response.data) {
                this.msgSuccess('新增成功')
                this.open = false
                // 调用主页面的getList方法刷新主页面
                this.$parent.getList()
              } else {
                this.msgError(response.resultMsg)
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$titleHeight: 70px;
// 弹窗内容外面的div
.el-dialog {
  position: relative;
}
::v-deep .el-dialog__body {
  padding-bottom: 20px;
}
.main-wrapper {
  height: 60vh;
  // overflow: auto;
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
  font-size: 18px;
  font-weight: bolder;
  color: #000000;

  height: $titleHeight;
  line-height: $titleHeight;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: 0px;

  .green {
    color: #67c23a;
    font-size: 14px;
    margin-left: 20px;
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
  .el-button--medium {
    font-size: 12px;
  }
}

// 纯文本区域
.puretext {
  color: #949494;
  font-size: 12px;
  line-height: 24px;
  // height:20vh;
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
.matlist {
  display: flex;
  flex-direction: row;
  color: #333333;
  font-size: 14px;
}
.matlist ::v-deep {
  .upload-demo:hover {
    border-color: #409eff;
  }
  .upload-demo {
    width: 35%;
    height: 150px;

    padding: 2px 10px 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // 文件列表
    .el-upload-list.el-upload-list--text {
      order: -1;
      padding-bottom: 5px;
    }

    // 删除el-upload组件自带的文件行右侧图标
    .el-upload-list__item-status-label,
    .el-icon-close {
      display: none;
      cursor: pointer;
    }
  }
}

// 渠道列表区域
.channellist {
  // height: 20vh;
  // 去掉表格最下方的灰色分割线
  .el-table.datalist.el-table--fit.el-table--scrollable-y.el-table--enable-row-hover.el-table--enable-row-transition.el-table--medium::before {
    display: none;
  }
  .datalist {
    ::v-deep {
      .hidden-columns ::before {
        display: none;
      }
      .el-table__header-wrapper{
        height:33px;
      }
      .el-table__body-wrapper is-scrolling-none{
        height:67px;
      }

      .el-table__header-wrapper .el-table__header tr th {
        border: 0;
        padding-bottom: 0;
      }
      .el-table__row td {
        border: none;
        padding: 5px 0;
      }
      .el-table__body tr:hover > td {
        background-color: #f4f5f9 !important;
      }

    }
  }
}
</style>
