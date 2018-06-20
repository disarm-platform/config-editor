<template>
  <div >
    <el-card>
      <div>
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
          <el-button type="primary">Save/update</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      instance_id: 'bwa',
      instance: 'Botswana',
      version: '1.0.0'
    }
  },
  methods: {
    
  }
});
</script>
