<template>
  <div>
    <el-input type="textarea" v-model="validations" @input="update_node_config()"></el-input>
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
      update_node_config() {
        try {
          this.node_config = JSON.parse(this.validations)
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