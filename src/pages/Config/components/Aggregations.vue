<template>
  <div>
    <el-input rows="20" type="textarea" :value="node_config_string" @input="set_node_config_from_string"></el-input>
    <JSONEditor :node_config="node_config"/>
    <div>{{node_config}}</div>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';
  import JSONEditor from '../JSONEditor.vue';

  export default ConfigNodeMixin.extend({
    components: {JSONEditor},
  });
</script>

<style scoped>

</style>