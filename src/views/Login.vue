<template>
  <div>
    
    <div v-if="!user">
      <el-alert v-if="error.length" :title="error"></el-alert>

      <el-form label-width="120px" @submit="login">
        <el-form-item label="Username">
          <el-input v-model="username"></el-input>
        </el-form-item>

        <el-form-item label="Password">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <p>Name: {{user.name}}</p>
      <p>Username: {{user.username}}</p>
      <p>Instance Slug: {{user.instance_slug}}</p>

      <el-button type="primary" @click="logout">Logout</el-button>
    </div>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { login } from '../lib/auth';
import { set_api_key } from '@/lib/standard_handler';

export default Vue.extend({
  data() {
    return {
      error: '',
      username: '',
      password: '',
    };
  },
  computed: {
    user(): any {
      return this.$store.state.user;
    },
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const user = await login(this.username, this.password);
        set_api_key(user.key);
        this.$store.commit('set_user', user);
      } catch (e) {
        this.error = e.message;
      }
    },
    logout() {
      this.$store.commit('set_user', null);
    },
  },
});
</script>

<style lang="scss">
  
</style>
