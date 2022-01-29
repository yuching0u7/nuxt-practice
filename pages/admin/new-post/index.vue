<template>
  <section>
    <edit-post-form>
      <h1>Add new post!</h1>
    </edit-post-form>
  </section>
</template>


<script>
  import EditPostForm from '@/components/Admin/EditPostForm.vue'
  export default {
    layout: 'admin',
    components: {
      EditPostForm,
    },
  }

</script>
