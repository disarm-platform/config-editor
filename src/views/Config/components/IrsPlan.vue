<template>
  <div>
    <Applet v-model="node_config" @input="emit_change"/>
    <el-input type="textarea" :value="node_config_string" @change="parse_set_node_config"></el-input>
    <div>{{node_config}}</div>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';
  import Applet from './Applet.vue'

  export default ConfigNodeMixin.extend({
    components: {Applet},
  });
</script>

<style scoped>

</style>