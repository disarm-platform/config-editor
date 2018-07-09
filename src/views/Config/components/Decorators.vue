<template>
  <div>
    <el-input type="textarea" v-model="decorators" @input="update_node_config()"></el-input>
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
      update_node_config() {
        try {
          this.node_config = JSON.parse(this.decorators)
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