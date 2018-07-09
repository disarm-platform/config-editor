<template>
  <div>
    <el-input type="textarea" :value="node_config_string" @input="set_node_config_from_string"></el-input>
    <div>{{node_config}}</div>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>

<style scoped>

</style>