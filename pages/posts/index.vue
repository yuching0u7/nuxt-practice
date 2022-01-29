<template>
  <div class="posts-content">
    <post-list></post-list>
  </div>
</template>
<script>

import PostList from '@/components/Posts/PostList.vue'
export default {
  components:{
    PostList
  }
}
</script>
<style scoped>
  .posts-content {
    display: flex;
    justify-content: center;
    align-items: ce nter;
  }
</style>
