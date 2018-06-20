<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Geodata" name="geodata">
        <Geodata />
    </el-tab-pane>
    <el-tab-pane label="Config" name="config">
      <Config />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import Geodata from './Geodata.vue';
  import Config from './Config.vue';
  export default {
    components: {
      Config,
      Geodata
    },
    data() {
      return {
        activeName: 'geodata'
      };
    }
  };
</script>