<template>
  <div class="home-page">
    <section class="title">
      <h1>Get the latest news!</h1>
    </section>
    <post-list></post-list>
  </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList.vue'
  export default {
    components: {
      PostList
    }
  }

</script>

<style scoped>
  .title {
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-position: center;
    background-size: cover;
  }

  .title h1 {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: rgb(211, 211, 211);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    box-sizing: border-box;
    border: 1px solid black;
  }

  @media (min-width: 768px) {
    .title h1 {
      font-size: 2rem;
    }
  }

</style>
