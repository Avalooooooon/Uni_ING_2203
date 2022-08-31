<template>
  <div>
    <div>
      <input type="text" placeholder="输入" v-model="search" />
      <span @click="btnclick">点击</span>
    </div>
    <div v-for="(item,index) in newListData" :key="index">{{item.orgName}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      list: [
        {
          tenantId: 36045,
          orgId: 3604500002,
          orgName: "开发环境测试-1",
          type: null,
          activate: "1"
        },
        {
          tenantId: 36053,
          orgId: 3605300001,
          orgName: "52-测试账号(校区)",
          type: null,
          activate: "1"
        },
        {
          tenantId: 36053,
          orgId: 3605300008,
          orgName: "测试-",
          type: null,
          activate: "1"
        }
      ],
      newListData: []
    };
  },
  created() {
    this.newListData = this.list;
  },
  watch: {
    search(curr, old) {
      if (curr == "") {
        this.newListData = this.list;
      }
    }
  },
  methods: {
    btnclick() {
      if (this.search) {
        this.$nextTick(() => {
          this.newListData = this.list.filter(
            item => item.orgName.indexOf(this.search.toLowerCase()) !== -1
          );
        });
      }
    }
  }
};
</script>

<style>
</style>
