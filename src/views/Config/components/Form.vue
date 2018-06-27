<template>
  <div>
    <el-input type="textarea" v-model="form_content"></el-input>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        form_content: '',
      };
    },
    created() {
      this.form_content = JSON.stringify(this.node_config, null, 2);
    },
    methods: {
      tell_me() {
        return JSON.parse(this.form_content);
      },
    },
  });
</script>

<style scoped>

</style>