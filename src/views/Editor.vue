<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Geodata" name="geodata">
        <Geodata :districts="districts" :villages="villages"/>
    </el-tab-pane>
    <el-tab-pane label="Config" name="config">
      <Config :config="config"/>
    </el-tab-pane>
    <el-tab-pane label="Publish" name="publish">
      <Publish :config_valid="false" instance_id="bwa" instance="Botswana" version="1.0.0" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import Geodata from './Geodata.vue';
  import Config from './Config.vue';
  import Publish from './Publish.vue';

  import districts from '../horrible_seed_data/bwa.districts.json'
  import villages from '../horrible_seed_data/bwa.villages.json'
  import config from '../horrible_seed_data/small_valid_config.json'

  export default {
    components: {
      Config,
      Geodata,
      Publish
    },
    data() {
      return {
        activeName: 'geodata',
        districts,
        villages,
        config,
      };
    }
  };
</script>