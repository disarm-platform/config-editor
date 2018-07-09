<template>
  <div>
    
    <div v-if="!user">
      <el-form  label-width="120px">
        <el-form-item label="Username">
          <el-input v-model="username"></el-input>
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <el-button type="primary" @click="logout">logout</el-button>
    </div>

  </div>
</template>

<script lang='ts'>
  import Vue from 'vue'

  export default Vue.extend({
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      user(): any {
        return this.$store.state.user
      }
    },
    methods: {
      login() {
        this.$store.commit('set_user', {username: this.username, password: this.password})
      },
      logout() {
        this.$store.commit('set_user', null)
      }
    }
  })
</script>

<style lang="scss">
  
</style>
