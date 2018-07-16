<template>
  <div>
  
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
</template>

<script lang='ts'>
import Vue from 'vue';
import { DoumaUser } from '@locational/douma-types/main';
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
    user(): DoumaUser {
      return this.$store.state.user;
    },
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const user: DoumaUser = await login(this.username, this.password);
        set_api_key(user.key);
        this.$store.commit('set_user', user);
        this.$router.push('/');
      } catch (e) {
        this.error = e.message;
      }
    },
  },
});
</script>

<style lang="scss">
  
</style>
