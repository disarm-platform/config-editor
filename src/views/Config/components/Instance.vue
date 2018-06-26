<template>
  <div>
    <span>title</span>
    <el-input v-model="node_config.title"></el-input>

    <span>location_name</span>
    <el-input v-model="node_config.location_name"></el-input>

    <span>slug</span>
    <el-input disabled v-model="node_config.slug"></el-input>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../../../lib/ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>

<style scoped>

</style>

