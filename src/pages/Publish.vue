<template>
  <div>
    <el-card>
      <div slot="header">
        <span>Check and Publish</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="save_update"
          >
          Download
          <span v-if="!config_valid">(Warning config is not valid)</span>
        </el-button>
      </div>

        <el-alert
          :closable="false"
          class="alerts"
          v-if="config_invalid"
          title="Configuration is not valid"
          type="error">
        </el-alert>

        <el-alert
          :closable="false"
          class="alerts"
          v-if="config_not_validated"
          title="Configuration has not been validated"
          type="warning">
        </el-alert>

        <el-alert
          :closable="false"
          class="alerts"
          v-if="config_valid"
          title="Configuration is valid"
          type="success">
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
import { ValidationStatus } from '@/store/types';

export default Vue.extend({
  props: {
    version: String, // TODO: change later
  },
  computed: {
    config_not_validated(): boolean {
      return this.$store.state.validation_status === ValidationStatus.NotValidated;
    },
    config_invalid(): boolean {
      return this.$store.state.validation_status === ValidationStatus.Invalid;
    },
    config_valid(): boolean {
      return this.$store.state.validation_status === ValidationStatus.Valid;
    },
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

