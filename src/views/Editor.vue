<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Geodata" name="geodata">
        <Geodata :geodata_layers="geodata_layers"/>
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

  import provinces from '../horrible_seed_data/swz.provinces.json'
  import cities from '../horrible_seed_data/swz.cities.json'
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
        config,
        geodata_layers: [
          {
            name: 'provinces',
            file_name: 'swz.provinces.geojson',
            geojson: provinces,
            validation_status: '',
            field_summary: []
          },
          {
            name: 'cities',
            file_name: 'swz.cities.geojson',
            geojson: cities,
            validation_status: '',
            field_summary: []
          }
        ]
      };
    }
  };
</script>