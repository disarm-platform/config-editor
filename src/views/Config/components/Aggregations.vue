<template>
  <div>
    <el-input type="textarea" v-model="aggregations" @input="update_node_config()"></el-input>
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
      update_node_config() {
        try {
          this.node_config = JSON.parse(this.aggregations)
          this.emit_change()
        } catch (e) {
          // handle invalid json
        }
      }
    },
  });
</script>

<style scoped>

</style>