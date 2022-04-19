<template></template>

<script>
export default {
  methods: {
    // 点击删除按钮，弹出撤回
    showWithdrawDialog(event) {
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
  },
};
</script>

<style>
</style>