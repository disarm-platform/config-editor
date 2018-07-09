<template>
  <div>
    <el-input type="textarea" v-model="aggregations" @input="emit_change()"></el-input>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        aggregations: '',
      };
    },
    created() {
      this.aggregations = JSON.stringify(this.node_config, null, 2);
    },
    methods: {
      tell_me() {
        return JSON.parse(this.aggregations);
      },
    },
  });
</script>

<style scoped>

</style>