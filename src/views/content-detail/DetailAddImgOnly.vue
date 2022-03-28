<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ArticleDetailImgOnly'
export default {
    name:'DetailAddImgOnly',
    components: { ArticleDetail }
}
</script>

<style lang="scss" scoped>

</style>