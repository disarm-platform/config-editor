<template>
  <el-container>
    <el-header>
      <h2>DiSARM Registry</h2>
    </el-header>
    
    <el-alert
      v-if="config"
      :title="`Selected instance: ${config.config_id}@${config.config_version}`"
      type="info">
    </el-alert>
    
    <el-main>
      <router-view/>
    </el-main>

  </el-container>
</template>
<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    computed: {
      config() {
        return this.$store.state.instance
      } 
    }
  })
</script>


<style lang="scss">
  html, body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
