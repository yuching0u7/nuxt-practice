<template>
  <section>
    <edit-post-form @save="onSavePost">
      <h1>Add new post!</h1>
    </edit-post-form>
  </section>
</template>


<script>
import axios from 'axios'
  import EditPostForm from '@/components/Admin/EditPostForm.vue'
  export default {
    layout: 'admin',
    components: {
      EditPostForm,
    },
    methods: {
      onSavePost(newPost) {
        this.$store.dispatch('addPost', newPost).then(()=>{
          this.$router.push('/admin')
        })   
      }
    }
  }

</script>
