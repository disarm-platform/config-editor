<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Geodata" name="geodata">
        <Geodata :districts="districts" :villages="villages"/>
    </el-tab-pane>
    <el-tab-pane label="Config" name="config">
      <Config :config="validBwaConfig"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import Geodata from './Geodata.vue';
  import Config from './Config.vue';

  import districts from '../horrible_seed_data/bwa.districts.json'
  import villages from '../horrible_seed_data/bwa.villages.json'
  import validBwaConfig from '../horrible_seed_data/bwa_config.json'

  export default {
    components: {
      Config,
      Geodata
    },
    data() {
      return {
        activeName: 'geodata',
        districts,
        villages,
        validBwaConfig
      };
    }
  };
</script>