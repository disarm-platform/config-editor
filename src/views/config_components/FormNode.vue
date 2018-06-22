<template>
  <div>
    <h3>{{$options._componentTag}}</h3>
    <div>{{node_config}}</div>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '@/lib/ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>

<style scoped>

</style>