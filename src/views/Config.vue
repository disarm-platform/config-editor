<template>
  <div >
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Config</span>
    <el-button style="float: right; padding: 3px 0" type="text">Validate</el-button>
  </div>
     <el-input
  type="textarea"
  :rows="20"
  placeholder="Please input"
  v-model="textarea">
</el-input>
</el-card>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      config:{}
    };
  },
  methods: {}
};
</script>
