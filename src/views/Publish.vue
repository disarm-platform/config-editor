<template>
  <div >
    <el-card>
      <div>
        <el-alert
          v-if="!geodata_valid"
          title="Geodata and spatial_hierarchy is not valid"
          type="warning">
        </el-alert>

        <el-alert
          v-if="!config_valid"
          title="Configuration is not valid"
          type="warning">
        </el-alert>
        
        <div style="margin-top:1em;">
          <el-input placeholder="Instance id" v-model="instance_id"></el-input>
        </div>
        <div style="margin-top:1em;">
          <el-input placeholder="Instance name" v-model="instance"></el-input>
        </div>
        <div style="margin-top:1em;">
          <el-input placeholder="Version" v-model="version"></el-input>
        </div>
        <div style="margin-top:1em;">
          <el-button :disabled="!everything_valid" type="primary" @click="save_update">Save/update</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    config_valid: Boolean,
    geodata_valid: Boolean,
    instance_id: String, 
    instance: String,
    version: String
  },
  computed: {
    everything_valid() {
      return this.config_valid && this.geodata_valid
    }
  },
  methods: {
   save_update() {
     console.log('save or update')
   } 
  }
});
</script>
