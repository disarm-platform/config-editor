<template>
  <div>
    <el-card>
      <div slot="header">
        <span>Check and Publish</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          :disabled="!config_valid"
          @click="save_update"
          >
          Download
        </el-button>
      </div>

        <el-alert
            class="alerts"
            v-if="!config_valid"
            title="Configuration is not valid"
            type="warning">
        </el-alert>
        
        <div style="margin-top:1em;">
          <el-input type="number" disabled v-model="version">
            <span slot="prepend">Version</span>
          </el-input>
        </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      config_valid: Boolean,
      version: String, // TODO: change later
    },
    methods: {
      save_update() {
        this.$emit('save_config');
      },
    },
  });
</script>
<style>
  .alerts {
    margin: 0.5em 0;
  }
</style>

