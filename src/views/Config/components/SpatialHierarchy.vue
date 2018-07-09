<template>
  <div>
    <el-input rows="20" type="textarea" v-model="spatial_hiearchy"></el-input>
  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        spatial_hiearchy: '',
      };
    },
    created() {
      this.spatial_hiearchy = JSON.stringify(this.node_config, null, 2);
    },
    methods: {
      tell_me() {
        return JSON.parse(this.spatial_hiearchy);
      },
    },
  });
</script>

<style scoped>

</style>