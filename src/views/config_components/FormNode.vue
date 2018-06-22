<template>
  <div>{{$configNode()}}</div>
</template>

<script>
  import {ConfigNodeMixin} from '@/lib/ConfigNodePlugin';

  export default {
    mixins: [ConfigNodeMixin],
  };
</script>

<style scoped>

</style>