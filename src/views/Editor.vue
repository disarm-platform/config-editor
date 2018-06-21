<template>
  <el-tabs v-model="activeName">
    <el-tab-pane name="geodata">
      <span slot="label">
        <i v-if="geodata_valid" class="el-icon-check"></i>
        <i v-else class="el-icon-close"></i>
        Geodata
      </span>
      <Geodata :geodata_layers="geodata_layers" @geodata_validation="set_geodata_validation" @location_selection="set_location_selection" @spatial_hierarchy="set_spatial_hierarchy"/>
    </el-tab-pane>
    <el-tab-pane label="Config" name="config">
      <span slot="label">
        <i v-if="config_valid" class="el-icon-check"></i>
        <i v-else class="el-icon-close"></i>
        Config
      </span>
      <Config :config="config" @config_validation="set_config_validation"/>
    </el-tab-pane>
    <el-tab-pane label="Publish" name="publish">
      <Publish :config_valid="config_valid" :geodata_valid="geodata_valid" instance_id="bwa" instance="Botswana" version="1.0.0" @save_config="save_config"/>
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
        config_valid: false,
        geodata_valid: false,

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
        location_selection: null,
        spatial_hierarchy: null
      };
    },
    methods: {
      save_config() {
        const assembled_config = this.assemble_config()
        console.log('assembled_config', assembled_config);
      },
      assemble_config() {
        return {
          ...this.config,
          location_selection: this.location_selection,
          spatial_hierarchy: this.spatial_hierarchy
        }
      },
      set_spatial_hierarchy(spatial_hierarchy) {
        this.spatial_hierarchy = spatial_hierarchy
      },
      set_location_selection(location_selection) {
        this.location_selection = location_selection
      },
      set_geodata_validation(geodata_valid: boolean) {
        this.geodata_valid = geodata_valid
      },
      set_config_validation(config_valid: boolean) {
        this.config_valid = config_valid
      }
    }
  };
</script>