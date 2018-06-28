<template>
    <el-form>
      <el-form-item label="Title">
        <el-input v-model="node_config.title"></el-input>
      </el-form-item>

      <el-form-item label="Icon">
        <el-input v-model="node_config.icon"></el-input>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  

  export default Vue.extend({
    props: {
      node_config: Object
    }
  });
</script>

<style scoped>

</style>