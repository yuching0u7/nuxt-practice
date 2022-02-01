<template>
  <div class="edit-post-page">
    <section>
      <edit-post-form :existingPost="post" @save="onUpdatePost">
        <h1>Edit post Id: {{ post.postId }}</h1>
      </edit-post-form>
    </section>
  </div>
</template>


<script>
  import axios from 'axios'
  import EditPostForm from '@/components/Admin/EditPostForm.vue'
  export default {
    layout: 'admin',
    components: {
      EditPostForm
    },
    asyncData(content) {
      const postId = content.params.postId
      return axios.get(
          `https://nuxt-practice-1cc8e-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${postId}.json`)
        .then(result => {
          return {
            post: {
              ...result.data,
              postId: postId
            }
          }
        }).catch(e => {
          console.log(e)
        })
    },
    methods: {
      onUpdatePost(updatePost) {
        this.$store.dispatch('editPost', updatePost).then(()=>{
          this.$router.push('/admin')
        })
        
      }
    }
  }

</script>
