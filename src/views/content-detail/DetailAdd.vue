<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
export default {
    name:'DetailAdd',
    components: { ArticleDetail }
}
</script>

<style lang="scss" scoped>

</style>