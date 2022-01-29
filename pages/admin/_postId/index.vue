<template>
  <div class="edit-post-page">
    <section>
      <edit-post-form :existingPost="post">
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
    data() {
      return {
        post: {
          postId: '123456789',
          author: 'Alex',
          title: 'The existing post title.',
          content: 'The existing post content here.........'
        }
      }
    }
  }

</script>
