<template>
  <div>
    <el-input type="textarea" v-model="form_content"></el-input>
    <el-button @click="update">Update</el-button>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '@/lib/ConfigNodeMixin';

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
      update() {
        // this.$emit('change', this.form_content)
      },
    },
  });
</script>

<style scoped>

</style>