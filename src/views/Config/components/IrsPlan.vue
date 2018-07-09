<template>
  <div>
    <Applet v-model="node_config" @input="emit_change"/>
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