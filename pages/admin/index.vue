<template>
  <div class="admin-page">
    <section class="new-post">
      <b-button variant="outline-info" @click="$router.push('/admin/new-post')">Add Post</b-button>
      <b-button class="ml-3" variant="outline-info" @click="onLogout">Logout</b-button>
    </section>
    <section class="existing-posts">
      <h1 class="mt-3">Existing Posts</h1>
      <post-list :posts="loadedPosts" :isAdmin="true" />
    </section>

  </div>
</template>

<script>
  export default {
    middleware: ['check-auth', 'auth'],
    layout: 'admin',
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      },
    },
    methods:{
      onLogout(){
        this.$store.dispatch('logout')
        this.$router.push('/admin/auth')
      }
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
