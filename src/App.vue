<template>
  <el-container>
    <el-header>
      <h2>DiSARM Registry</h2>
    </el-header>
    
    <div v-if="user" style="padding-left: 20px;">
      <p>
        Logged in as {{user.name}} 
        <el-button type="text" @click="logout" style="color:red;">Logout</el-button>
      </p>
    </div>

    <el-alert
      v-if="user && config"
      :title="`Selected instance: ${config.config_id}@${config.config_version}`"
      type="info">
    </el-alert>
    
    <el-main>
      <router-view/>
    </el-main>

  </el-container>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    config(): any {
      return this.$store.state.config;
    },
    user(): any {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.commit('set_user', null);
      this.$router.push('/login')
    },
  }
});
</script>


<style lang="scss">
  html, body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
