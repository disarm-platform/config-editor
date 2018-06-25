<template>
  <div>
    <h4>Actions</h4>
    <el-button-group>
      <el-button @click="$emit('save')" size='small' type="primary">Save</el-button>
      <el-button @click="$emit('tell_me')" size='small'>Tell_me</el-button>
      <el-button @click="$emit('reset')" size='small'>Reset</el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
  });
</script>

<style scoped>

</style>