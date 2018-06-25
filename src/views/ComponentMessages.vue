<template>
  <div>
    <h4>Messages</h4>
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