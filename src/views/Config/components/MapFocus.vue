<template>
  <div>
    <el-form>
      
      <el-form-item label="Latitude">
        <el-input type="number" v-model="node_config.centre.lat"></el-input>
      </el-form-item>

      <el-form-item label="Longitude">
        <el-input v-model="node_config.centre.lng"></el-input>
      </el-form-item>

      <el-form-item label="Zoom">
        <el-input-number :min="0" :max="50" v-model="node_config.zoom"></el-input-number>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
  });
</script>

<style scoped>

</style>
