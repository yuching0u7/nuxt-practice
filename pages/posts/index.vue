<template>
  <div class="posts-content">
    <post-list :posts="loadedPosts"></post-list>
  </div>
</template>
<script>
  import PostList from '@/components/Posts/PostList.vue'
  export default {
    components: {
      PostList
    },
    computed:{
      loadedPosts(){
        return this.$store.getters.loadedPosts
      }
    },
  }

</script>
<style scoped>
  .posts-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
