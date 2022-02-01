<template>
  <div class="single-post-page">
    <section class="post">
      <h1>Post Title: {{ post.title }}</h1>
      <div class="post-details">
        <div>Last update on: {{ post.updateDate | date }}</div>
        <div>Written by: {{ post.author }}</div>
      </div>
      <p>{{ post.content }}</p>
    </section>
    <section class="post-feedback  ">
      <p>Write feedback by <a href="mailto:xxxx@domain.com  ">email</a>.</p>
    </section>
  </div>
</template>
<script>
  export default {
    asyncData(context) {
      const postId = context.params.id
      return context.app.$axios.$get(`/posts/${postId}.json `)
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
    }
  }

</script>
<style scoped>
  .single-post-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: block;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }

</style>
