<template>
  <el-tabs v-model="active_tab" type="border-card">

    <el-tab-pane name="instances">
      <span slot="label">
        Instances
      </span>
      <Instances ref="instances" />
    </el-tab-pane>

    <el-tab-pane name="geodata">
      <span slot="label" :class="{red: geodata_errors.length}">
        Geodata
        <i v-if="geodata_errors.length" class="el-icon-error"></i>
        <i v-else class="el-icon-success"></i>
      </span>
      <Geodata
        v-if="config"
        :geodata_errors="geodata_errors"
        :geodata_layers="geodata_layers"
        @geodata_layers="set_geodata_layers"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

    <el-tab-pane name="config">
      <span slot="label" :class="{red: !validation_result.passed}">
        Config
        <i v-if="!validation_result.passed" class="el-icon-error"></i>
        <i v-else class="el-icon-success"></i>
      </span>
      <Config
        v-if="config"
        :config="config"
        :geodata_layers="geodata_layers"
        @change="change"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

    <el-tab-pane name="publish">
      <span slot="label">
        Publish
        <i class="el-icon-edit"></i>
      </span>
      <Publish
        v-if="config"
        :config_valid="validation_result.passed"
        :version="config.config_version"
        @save_config="save_config"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import { set, unset } from 'lodash';
import Vue from 'vue';
import download from 'downloadjs'

import Geodata from './views/Geodata.vue';
import Config from './views/Config/Config.vue';
import Publish from './views/Publish.vue';
import Login from './views/Login.vue';
import Instances from './views/Instances.vue';

import { get_configuration, create_configuration } from './lib/config';

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
      active_tab: 'instances',
      config_valid: false,
      geodata_layers: [],
      location_selection: null,
    };
  },
  watch: {
    async selected_config(selected_config) {
      if (!selected_config) {
        return;
      }
      if (this.creating_new_config) {
        return;
      }

      const config = await get_configuration(selected_config.id);
      this.$store.commit('set_config', config);
    },
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    selected_config() {
      return this.$store.state.instance;
    },
    creating_new_config() {
      return this.$store.state.creating_new_config;
    },
    validation_result() {
      return this.$store.state.validation_result
    },
    geodata_errors() {
      const node_name = 'geodata'
      return this.$store.state.validation_result.errors.filter((response) => {
        return response.source_node_name === node_name || response.target_node_name === node_name;
      });
    }
  },
  async mounted() {
    if (this.creating_new_config) {
      return;
    }
    if (!this.selected_config) {
      return;
    }

    const config = await get_configuration(this.selected_config.id);
    this.$store.commit('set_config', config);
  },
  methods: {
    change(updated_config, pathname, included) {
      // save config to store here

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
        const new_config = { ...this.config };
        set(new_config, pathname, updated_config);

        this.$store.commit('set_config', new_config);
      } else {
        // use unset for same reason as above
        const new_config = { ...this.config };
        unset(new_config, pathname);

        this.$store.commit('set_config', new_config);
      }
    },
    async save_config() {
      const config_copy = { ...this.config };

      // bump version number
      // TODO: remove string and number conversions
      const current_version = Number(config_copy.config_version);
      config_copy.config_version = `${current_version + 1}`;

      // update, so user can see change
      this.$store.commit('set_config', config_copy);

      // send to remote

      // update local list / reload local lost
      this.$refs.instances.get_list_of_configurations();

      // remove _id as we want to create a new version
      delete config_copy._id;

      try {
        // await create_configuration(config_copy);
        download(JSON.stringify(config_copy), `${config_copy.config_id}@${config_copy.config_version}.config.json`, 'text/plain');
        this.$store.commit('set_creating_new_config', false);
      } catch (e) {
        console.log('e', e);
      }
    },
    set_geodata_layers(geodata_layers) {
      this.geodata_layers = geodata_layers;
    },
    set_location_selection(location_selection) {
      this.location_selection = location_selection;
    }
  },
};
</script>
<style>
.red {
  color: red;
}
</style>
