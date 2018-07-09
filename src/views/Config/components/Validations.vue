<template>
  <div>
    <el-input type="textarea" v-model="validations"></el-input>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        validations: '',
      };
    },
    created() {
      this.validations = JSON.stringify(this.node_config, null, 2);
    },
    methods: {
      tell_me() {
        return JSON.parse(this.validations);
      },
    },
  });
</script>

<style scoped>

</style>