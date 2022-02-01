<template>
  <div>
    <section class="post-form">
      <h1><slot/></h1>
      <form @submit.prevent="onSave">
        <app-control-input v-model="post.author" :controlType="'input'">
          <label>Author</label>
        </app-control-input>
        <app-control-input v-model="post.title" :controlType="'input'">
          <label>Title</label>
        </app-control-input>

        <app-control-input v-model="post.content" :controlType="'textarea'">
          <label>Content</label>
        </app-control-input>

        <app-button type="submit">Save</app-button>
        <app-button class="ml-3" btn-style="cancel" @click="onCancel">Cancel</app-button>
      </form>
    </section>
  </div>
</template>


<script>
import AppButton from '@/components/UI/AppButton.vue'
import AppControlInput from '@/components/UI/AppControlInput.vue'

export default {
  props:{
    existingPost:{type:Object, required:false}
  },
  components:{
    AppButton,
    AppControlInput
  },
  data(){
    return{
      post:this.existingPost? {...this.existingPost}:{
        author:'',
        title:'',
        content:''
      }
    }
  },
  methods:{
    onCancel(){
      this.$router.push('/admin')
    },
    onSave(){
      // console.log(this.post)
      this.$emit('save', this.post)
    }
  }
}
</script>

<style scoped>
.post-form{
  margin: 75px;
}
</style>