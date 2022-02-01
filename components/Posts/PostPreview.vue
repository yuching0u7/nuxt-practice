<template>
  <div>
    <nuxt-link :to="toPostRoute">
      <article class="post-preview">
        <div class="post-thumbnail" :style="{ backgroundImage:`url('https://picsum.photos/id/${img}/200/200')` }">
        </div>
        <div class="post-content">
          <h1>{{ title }}</h1>
          <p>{{ toPreviewText }}</p>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'PostPreview',
    props: {
      isAdmin: {
        type: Boolean,
        default: false,
        required: false
      },
      img:{
        type:String,
        required:true
      },
      postId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
    },
    computed: {
      toPostRoute() {
        let route = this.isAdmin ? `/admin/${this.postId}` : `/posts/${this.postId}`
        return route
      },
      toPreviewText(){
        return this.content.slice(0,100) + '...'
      }
    }
  }

</script>

<style scoped>
  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
  }

  a {
    text-decoration: none;
    color: black;
  }


  @media (min-width: 850px) {
    .post-preview {
      width: 400px;
      margin: 10px;
    }
  }

  .post-thumbnail {
    width: 100%;
    height: 300px;
    background-position: center;
    background-size: cover;
  }

  .post-content {
    padding: 10px;
    text-align: center;
  }

  a:hover .post-content,
  a:active .post-content {
    background-color: #ccc;
  }

</style>
