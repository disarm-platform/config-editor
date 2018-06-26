<template>
  <div>
    {{messages}}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      messages: Array,
    },
  });
</script>

<style scoped>

</style>