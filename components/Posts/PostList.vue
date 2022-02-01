<template>
  <section class="posts-list">
    <post-preview :isAdmin="isAdmin" v-for="(post, index) in posts" :key="post.postId" :postId="post.postId" :img="((index+1)*10).toString()" :title="post.title"
      :content="post.content" />
  </section>
</template>

<script>
  import PostPreview from '@/components/Posts/PostPreview.vue'
  export default {
    props: {
      posts:{
        type:Array,
        required:true
      },
      isAdmin: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    components: {
      PostPreview
    }
  }

</script>
<style scoped>
  .posts-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

</style>
