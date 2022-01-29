<template>
  <div class="admin-page">
    <section class="new-post">
      <b-button variant="outline-info" @click.prevent="$router.push('/admin/new-post')">Add Post</b-button>
      <nuxt-child />
    </section>
    <section class="existing-posts">
      <h1 class="mt-3">Existing Posts</h1>
      <post-list :isAdmin="true" />
    </section>

  </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList.vue'
  export default {
    layout: 'admin',
    components: {
      PostList
    }
  }

</script>

<style scoped>
  .admin-page {
    padding: 20px;
  }

  .new-post {
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }

  .existing-posts h1 {
    text-align: center;
  }

</style>
