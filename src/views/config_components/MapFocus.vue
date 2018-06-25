<template>
  <div>
    <h3>{{display_name}}</h3>

    <span>Lat</span>
    <el-input-number v-model="node_config.centre.lat"></el-input-number>
    <span>Lng</span>
    <el-input-number v-model="node_config.centre.lng"></el-input-number>
    <span>Zoom</span>
    <el-input-number v-model="node_config.zoom"></el-input-number>

  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '@/lib/ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>

<style scoped>

</style>
