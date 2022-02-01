<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <app-control-input type="email" v-model="authData.email">Email</app-control-input>
        <app-control-input type="password" v-model="authData.password">Password</app-control-input>
        <b-button type="submit" variant="info">{{authData.isLogin?'Login':'Sign up'}}</b-button>
        <b-button @click.prevent="authData.isLogin = !authData.isLogin" type="button" variant="light">Switch to
          {{authData.isLogin?'Sign up':'Login'}}</b-button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {
      return {
        authData: {
          isLogin: true,
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('authenticateUser', this.authData)
          .then(() => {
            this.$router.push('/admin')
          }).catch(e => {
            console.log(e)
          })
      }
    }
  }

</script>

<style scoped>
  .admin-auth-page {
    padding: 20px;
  }

  .auth-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 2px #ccc;
    width: 300px;
    margin: auto;
    padding: 10px;
    box-sizing: border-box;
  }

</style>
