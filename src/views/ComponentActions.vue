<template>
  <div>
    <h1>Actions</h1>
    <el-button @click="$emit('click')">Cluck</el-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
  });
</script>

<style scoped>

</style>