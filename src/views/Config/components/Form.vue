<template>
  <div>
    <el-input rows="20" type="textarea" v-model="form_content" @input="update_node_config()"></el-input>
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
      update_node_config() {
        try {
          this.node_config = JSON.parse(this.form_content)
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