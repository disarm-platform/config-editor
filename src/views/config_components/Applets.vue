<template>
  <div>
    <h3>{{$options._componentTag}}</h3>

    <el-checkbox-group v-model="selected_applets" size="medium">
      <el-checkbox-button v-for="applet in applets" :label="applet" :key="applet">{{applet}}</el-checkbox-button>
      <el-checkbox-button disabled>meta</el-checkbox-button>
    </el-checkbox-group>

  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '@/lib/ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        applets: ['irs_monitor', 'irs_record_point', 'irs_plan', 'irs_tasker'],
        selected_applets: [],
      };
    },
  });
</script>

<style scoped>

</style>