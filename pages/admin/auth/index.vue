<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <app-control-input type="email">Email</app-control-input>
      <app-control-input type="password">Password</app-control-input>
      <b-button type="submit" variant="info">Login</b-button>
      <b-button type="submit" variant="light">Sign Up</b-button>
    </div>


  </div>
</template>

<script>
  import AppButton from '@/components/UI/AppButton.vue'
  import AppControlInput from '@/components/UI/AppControlInput.vue'
  export default {
  layout:'admin',
    components: {
      AppButton,
      AppControlInput
    },
    data(){
      return{
        isLogin:false
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