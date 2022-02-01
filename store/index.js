import Vuex from 'vuex'
import axios from 'axios'

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
        return axios.get('https://nuxt-practice-1cc8e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json ')
          .then(result => {
            let posts = []
            for (let key in result.data) {
              posts.push({
                ...result.data[key],
                postId: key
              })
            }
            // console.log(posts)
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
        return axios.post('https://nuxt-practice-1cc8e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', newPost)
          .then(result => {
            context.commit('addPost', {
              ...newPost,
              postId: result.data.name
            })
          }).catch(e => {
            console.log(e)
          })
      },
      editPost(context, updatePost) {
        updatePost.updateDate = new Date().toISOString()
        return axios.patch(
          `https://nuxt-practice-1cc8e-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${updatePost.postId}.json`,
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
