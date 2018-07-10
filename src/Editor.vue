<template>
  <el-tabs v-model="active_tab" type="border-card">

    <el-tab-pane name="login">
      <span slot="label">
        Login
        <i class="el-icon-success"></i>
      </span>
      <Login></Login>
    </el-tab-pane>

    <el-tab-pane name="instances">
      <span slot="label">
        Instances
        <i class="el-icon-success"></i>
      </span>
      <Instances />
    </el-tab-pane>

    <el-tab-pane name="geodata" :disabled="!user">
      <span slot="label">
        Geodata
        <i class="el-icon-success"></i>
      </span>
      <Geodata
          :geodata_layers="geodata_layers"
          @geodata_layers="set_geodata_layers"
      ></Geodata>
    </el-tab-pane>

    <el-tab-pane name="config" :disabled="!user">
      <span slot="label" style="color: red;">
        Config
        <i class="el-icon-error"></i>
      </span>
      <Config
          :config="config"
          @config_validation="set_config_validation"
          :geodata_layers="geodata_layers"
          @change="change"
      ></Config>
    </el-tab-pane>

    <el-tab-pane name="publish" :disabled="!user">
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
  import {set, unset} from 'lodash'
  import Vue from 'vue'

  import Geodata from './views/Geodata.vue';
  import Config from './views/Config/Config.vue';
  import Publish from './views/Publish.vue';
  import Login from './views/Login.vue';
  import Instances from './views/Instances.vue';

  import config from './horrible_seed_data/small_valid_config.json';

  export default {
    components: {
      Login,
      Instances,
      Config,
      Geodata,
      Publish,
    },
    data() {
      return {
        active_tab: 'login',
        config_valid: false,
        config,
        geodata_layers: [],
        location_selection: null,
      };
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      change(updated_config, pathname, included) {
        if (included) {
          // Need to use lodash.set so nested objects get updated
          // If not we end up with an object like:
          // {
          //   'applets.irs_record_point': {}
          // }
          // when we want:
          // {
          //   'applets': {'irs_record_point: {}}
          // }
          const new_config = {...this.config}
          set(new_config, pathname, updated_config)

          this.config = new_config
        } else {
          // use unset for same reason as above
          const new_config = {...this.config}
          unset(new_config, pathname)
          
          this.config = new_config
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