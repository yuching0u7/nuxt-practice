import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
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
        return this.$axios.$post(`/posts.json?auth=${context.state.token}`, newPost)
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
          `/posts/${updatePost.postId}.json?auth=${context.state.token}`,
          updatePost).then(result => {
          context.commit('editPost', updatePost)
        }).catch(e => {
          console.log(e)
        })
      },
      authenticateUser(context, authData) {
        let authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`
        if (!authData.isLogin) {
          authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`
        }
        return this.$axios.$post(authURL, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(result => {
          context.commit('setToken', result.idToken)
          context.dispatch('setLogoutTimer', result.expiresIn * 1000)
        }).catch(e => {
          console.log(e)
        })
      },
      setLogoutTimer(context, duration) {
        setTimeout(() => {
          context.commit('clearToken')
        }, duration)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
