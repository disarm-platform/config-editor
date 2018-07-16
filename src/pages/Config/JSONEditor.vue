<template>
  <div>
    <el-input rows="20" type="textarea" v-model="local_node_config"></el-input>
    <el-button>Format</el-button>
    <el-button>Save</el-button>
    <div>{{node_config}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['node_config'],
  data() {
    return {
      error_passing_json: false,
      local_node_config: '',
    };
  },
  watch: {
    node_config: {
      handler() {
        console.log(true);
      },
      deep: true,
    },
  },
  created() {
    this.set_local_node_config();
  },
  methods: {
    set_local_node_config() {
      try {
        this.error_passing_json = false;
        this.local_node_config = JSON.stringify(this.node_config, undefined, 4);
      } catch (e) {
        // passing the json failed
        this.error_passing_json = true;
      }
    },
  },
});
</script>
