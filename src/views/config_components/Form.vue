<template>
  <div>{{config}}</div>
</template>

<script>
  import {ConfigNodeMixin} from '@/lib/ConfigNodePlugin';

  export default {
    mixin: [ConfigNodeMixin],
  };
</script>

<style scoped>

</style>