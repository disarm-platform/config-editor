<template>
  <div>
    <el-input type="textarea" v-model="decorators" @input="emit_change()"></el-input>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        decorators: '',
      };
    },
    created() {
      this.decorators = JSON.stringify(this.node_config, null, 2);
    },
    methods: {
      tell_me() {
        return JSON.parse(this.decorators);
      },
    },
  });
</script>

<style scoped>

</style>