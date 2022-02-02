import Vuex from "vuex"
import Cookie from "js-cookie"

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
        return context.app.$axios.$get("/posts.json")
          .then(result => {
            let posts = []
            for (let key in result) {
              posts.push({
                ...result[key],
                postId: key
              })
            }
            vuexContext.commit("setPosts", posts)
          })
          .catch(e => {
            console.log(e)
          })
      },
      setPosts(context, posts) {
        console.log(posts)
        context.commit("setPosts", posts)
      },
      addPost(context, newPost) {
        newPost.updateDate = new Date().toISOString()
        return this.$axios.$post(`/posts.json?auth=${context.state.token}`, newPost)
          .then(result => {
            context.commit("addPost", {
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
          context.commit("editPost", updatePost)
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
          context.commit("setToken", result.idToken)
          localStorage.setItem("token", result.idToken)
          localStorage.setItem("tokenExpiration",Date.now() + (+result.expiresIn * 1000))
          Cookie.set("jwt",  result.idToken)
          Cookie.set("tokenExpiration", (Date.now() + (+result.expiresIn * 1000)))
          // return this.$axios.post('http://localhost:3000/api/track-data',{data:'Hello!'})
        }).catch(e => {
          console.log(e)
        })
      },
      initAuth(context, req) {
        let token;
        let tokenExpiration;
        if(req){
          if(!req.headers.cookie){
            return;
          }
          // console.log(req.headers.cookie)
          const jwtCookie = req.headers.cookie.split(";").find(c=>c.trim().startsWith("jwt="))
          if(!jwtCookie){
            return;
          }
          token = jwtCookie.split("=")[1]
          tokenExpiration = req.headers.cookie.split(";").find(c=>c.trim().startsWith("tokenExpiration=")).split("=")[1]
        }else{
          token = localStorage.getItem("token")
          tokenExpiration = localStorage.getItem("tokenExpiration")
        }

        if (Date.now() > +tokenExpiration || !token) {
          console.log("No token or invalid token");
          context.dispatch("logout");
          return;
        }
        context.commit("setToken", token)
      },
      logout(context) {
        context.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("tokenExpiration");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  })
}

export default createStore
