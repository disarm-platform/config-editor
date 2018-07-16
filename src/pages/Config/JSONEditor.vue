<template>
  <div>
    <el-alert v-if="error_passing_json" type="error">Configuration is not valid json</el-alert>
    <el-input rows="20" type="textarea" v-model="local_node_config"></el-input>
    <div style="margin: 0.5em 0;">
      <el-button @click="format_as_json">Format</el-button>
      <el-button @click="save">Save</el-button>
    </div>
    <div>{{node_config}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export interface Data {
  error_passing_json: boolean;
  local_node_config: string;
}

export default Vue.extend({
  props: ['node_config'],
  data(): Data {
    return {
      error_passing_json: false,
      local_node_config: '',
    };
  },
  watch: {
    node_config: {
      handler() {
        this.set_local_node_config();
      },
      deep: true,
    },
  },
  created() {
    this.set_local_node_config();
  },
  methods: {
    set_local_node_config(): void {
      try {
        this.error_passing_json = false;
        this.local_node_config = JSON.stringify(this.node_config, undefined, 4);
      } catch (e) {
        // passing the json failed
        this.error_passing_json = true;
      }
    },
    save() {
      const local_config_as_object = JSON.parse(this.local_node_config);
      this.$emit('change', local_config_as_object)
    },
    format_as_json() {
      this.local_node_config = JSON.stringify(JSON.parse(this.local_node_config), undefined, 4)
    },
  },
});
</script>
