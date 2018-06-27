<template>
  <el-tabs v-model="active_tab" type="border-card">

    <el-tab-pane name="geodata">
      <span slot="label" style="color: red;">
        Geodata
        <i class="el-icon-error"></i>
      </span>
      <Geodata
          :geodata_layers="geodata_layers"
      ></Geodata>
    </el-tab-pane>

    <el-tab-pane name="config">
      <span slot="label">
        Config
        <i class="el-icon-success"></i>
      </span>
      <Config
          :config="config"
          @config_validation="set_config_validation"
          :geodata_layers="geodata_layers"
          @change="change"
      ></Config>
    </el-tab-pane>

    <el-tab-pane name="publish">
      <span slot="label">
        Publish
        <i class="el-icon-edit"></i>
      </span>
      <Publish
          :config_valid="config_valid"
          instance_id="bwa"
          instance="Botswana"
          version="1.0.0"
          @save_config="save_config"
      ></Publish>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import Geodata from './views/Geodata.vue';
  import Config from './views/Config/Config.vue';
  import Publish from './views/Publish.vue';

  import provinces from './horrible_seed_data/swz.provinces.json';
  import cities from './horrible_seed_data/swz.cities.json';
  import config from './horrible_seed_data/small_valid_config.json';

  export default {
    components: {
      Config,
      Geodata,
      Publish,
    },
    data() {
      return {
        active_tab: 'config',
        config_valid: false,
        config,
        geodata_layers: [
          {
            name: 'provinces',
            file_name: 'swz.provinces.geojson',
            geojson: provinces,
            validation_status: '',
            field_summary: [],
          },
          {
            name: 'cities',
            file_name: 'swz.cities.geojson',
            geojson: cities,
            validation_status: '',
            field_summary: [],
          },
        ],
        location_selection: null,
      };
    },
    methods: {
      change(updated_config, pathname) {
        this.$set(this.config, pathname, updated_config);
      },
      save_config() {
        console.log('save_config', this.config);
      },
      set_location_selection(location_selection) {
        this.location_selection = location_selection;
      },
      set_config_validation(config_valid) {
        this.config_valid = config_valid;
      },
    },
  };
</script>