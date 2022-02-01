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
  import EditPostForm from '@/components/Admin/EditPostForm.vue'
  export default {
    layout: 'admin',
    components: {
      EditPostForm
    },
    asyncData(context) {
      const postId = context.params.postId
      return context.app.$axios.$get(
          `/posts/${postId}.json`)
        .then(result => {
          return {
            post: {
              ...result,
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
