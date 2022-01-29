<template>
  <section class="posts-list">
    <post-preview :isAdmin="isAdmin" v-for="i in 8" :key="i" :postId="(i*5).toString()" :title="`Post ${i}`"
      content="This is preview text........" />
  </section>
</template>

<script>
  import PostPreview from '@/components/Posts/PostPreview.vue'
  export default {
    props: {
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
