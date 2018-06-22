<template>
  <el-tabs v-model="activeName">
    <el-tab-pane name="geodata">
      <span slot="label">
        Geodata
      </span>
      <Geodata :geodata_layers="geodata_layers"/>
    </el-tab-pane>
    <el-tab-pane label="Config" name="config">
      <span slot="label">
        Config
      </span>
      <Config :config="config" @config_validation="set_config_validation" :geodata_layers="geodata_layers" @config="set_config" />
    </el-tab-pane>
    <el-tab-pane label="Publish" name="publish">
      <Publish :config_valid="config_valid" instance_id="bwa" instance="Botswana" version="1.0.0" @save_config="save_config"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
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
        config_valid: false,
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
        ],
        location_selection: null
      };
    },
    methods: {
      set_config(new_config) {
        this.config = new_config
      },
      save_config() {
        console.log('config', this.config);
      },
      set_location_selection(location_selection) {
        this.location_selection = location_selection
      },
      set_config_validation(config_valid) {
        this.config_valid = config_valid
      }
    }
  };
</script>