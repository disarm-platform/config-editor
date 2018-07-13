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
          :closable="false"
          class="alerts"
          v-if="config_invalid"
          title="Configuration is not valid"
          type="warning">
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
import { ValidationStatus } from '@/store';

export default Vue.extend({
  props: {
    version: String, // TODO: change later
  },
  computed: {
    config_valid(): boolean {
      return false
    // return this.$store.state.validation_result.passed === ValidationStatus.Valid;
    },
    config_invalid(): boolean {
      return false
      // return this.$store.state.validation_result.passed === ValidationStatus.Invalid;
    },
    config_not_validated(): boolean {
      return false
      // return this.$store.state.validation_result.passed === ValidationStatus.NotValidated;
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

