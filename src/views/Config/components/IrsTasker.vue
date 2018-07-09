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
    methods: {
      emit_change() {
        this.$emit('change')
      }
    }
  });
</script>

<style scoped>

</style>