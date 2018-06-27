<template>
  <el-tabs v-model="active_tab" type="border-card">

    <el-tab-pane name="geodata">
      <span slot="label" style="color: red;">
        Geodata
        <i class="el-icon-error"></i>
      </span>
      <Geodata
          :geodata_layers="geodata_layers"
          @geodata_layers="set_geodata_layers"
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
          :version="42"
          @save_config="save_config"
      ></Publish>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import Geodata from './views/Geodata.vue';
  import Config from './views/Config/Config.vue';
  import Publish from './views/Publish.vue';

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
        geodata_layers: [],
        location_selection: null,
      };
    },
    methods: {
      change(updated_config, pathname, included) {
        if (included) {
          this.$set(this.config, pathname, updated_config);
        } else {
          this.$delete(this.config, pathname)
        }
      },
      save_config() {
        console.log('save_config', this.config);
      },
      set_geodata_layers(geodata_layers) {
        this.geodata_layers = geodata_layers;
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