import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, newPost) {
        state.loadedPosts.push(newPost)
      },
      editPost(state, updatePost) {
        const postIndex = state.loadedPosts.findIndex(post => post.postId === updatePost.postId)
        state.loadedPosts[postIndex] = updatePost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        // server side render
        return context.app.$axios.$get('/posts.json')
          .then(result => {
            let posts = []
            for (let key in result) {
              posts.push({
                ...result[key],
                postId: key
              })
            }
            vuexContext.commit('setPosts', posts)
          })
          .catch(e => {
            console.log(e)
          })
      },
      setPosts(context, posts) {
        console.log(posts)
        context.commit('setPosts', posts)
      },
      addPost(context, newPost) {
        newPost.updateDate = new Date().toISOString()
        return this.$axios.$post('/posts.json', newPost)
          .then(result => {
            context.commit('addPost', {
              ...newPost,
              postId: result.name
            })
          }).catch(e => {
            console.log(e)
          })
      },
      editPost(context, updatePost) {
        updatePost.updateDate = new Date().toISOString()
        return this.$axios.$patch(
          `/posts/${updatePost.postId}.json`,
          updatePost).then(result=>{
            context.commit('editPost', updatePost)
          }).catch(e=>{
            console.log(e)
          })
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
