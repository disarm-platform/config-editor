<template>
  <el-tabs v-model="active_tab" type="border-card">

    <el-tab-pane name="instances">
      <span slot="label">
        Instances
      </span>
      <Instances ref="instances"/>
    </el-tab-pane>

    <el-tab-pane name="geodata">
      <span slot="label" :class="{red: config_validated && geodata_has_errors}">
        Geodata
        
        <i v-if="config_validated && geodata_has_errors" class="el-icon-error"></i>
        <i v-else-if="config_valid" class="el-icon-success"></i>
        <i v-else-if="config_not_validated"></i>
      </span>
      <Geodata
          v-if="config"
          :geodata_layers="geodata_layers"
          @geodata_layers="set_geodata_layers"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

    <el-tab-pane name="config">
      <span slot="label" :class="{red: config_invalid}">
        Config
        <i v-if="config_invalid" class="el-icon-error"></i>
        <i v-if="config_valid" class="el-icon-success"></i>
        <i v-if="config_not_validated"></i>
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
          :version="config.config_version"
          @save_config="save_config"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

  </el-tabs>
</template>

<script lang="ts">
import Vue from 'vue';
import {set, unset} from 'lodash';
// @ts-ignore
import download from 'downloadjs';

import Geodata from './Geodata.vue';
import Config from './Config/Config.vue';
import Publish from './Publish.vue';
import Login from './Login.vue';
import Instances from './Instances.vue';

import {get_configuration} from '../lib/config';
import { TGeodataLayer } from '@locational/geodata-support/build/module/config_types/TGeodata';
import { TLocationSelection } from '@locational/geodata-support/build/main/config_types/TLocationSelection';
import { ValidationStatus } from '@/store';
import { get_validation_result_for_node } from '@/lib/get_validation_result_for_node';


interface Data {
  active_tab: string;
  geodata_layers: TGeodataLayer[];
  location_selection: TLocationSelection;
}

export default Vue.extend({
  components: {Login, Instances, Config, Geodata, Publish},
  data(): Data {
    // @ts-ignore
    return {
      active_tab: 'instances',
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
      this.$store.commit('set_applets_config', config);
    },
  },
  computed: {
    config(): any {
      return this.$store.state.applets_config;
    },
    selected_config(): any {
      return this.$store.state.instance_id_and_version;
    },
    creating_new_config(): any {
      return this.$store.state.creating_new_config;
    },
    validation_result(): any {
      return this.$store.state.validation_result;
    },
    config_not_validated(): boolean {
      return this.$store.state.validation_status === ValidationStatus.NotValidated;
    },
    config_validated(): boolean {
      return !(this.$store.state.validation_status === ValidationStatus.NotValidated);
    },
    config_invalid(): boolean {
      return this.$store.state.validation_status === ValidationStatus.Invalid;
    },
    config_valid(): boolean {
      return this.$store.state.validation_status === ValidationStatus.Valid;
    },
    geodata_has_errors(): boolean {
      const validation_result = this.$store.state.validation_result;

      if (!validation_result) {
        return false;
      }

      return get_validation_result_for_node(validation_result, 'geodata').length > 0;
    },
  },
  async mounted() {
    if (this.creating_new_config) {
      return;
    }
    if (!this.selected_config) {
      return;
    }
    const config = await get_configuration(this.selected_config.id);
    this.$store.commit('set_applets_config', config);
  },
  methods: {
    change(updated_config: any, pathname: string, included: boolean) {/* save config to store here*/
      if (included) {
        /*
          Need to use lodash.set so nested objects get updated.
          If not we end up with an object like: { 'applets.irs_record_point': {} }
          when we want: { 'applets': {'irs_record_point: {}} }
        */
        const new_config = {...this.config};
        set(new_config, pathname, updated_config);
        this.$store.commit('set_applets_config', new_config);
      } else {/* use unset for same reason as above*/
        const new_config = {...this.config};
        unset(new_config, pathname);
        this.$store.commit('set_applets_config', new_config);
      }
    },
    async save_config() {
      const config_copy = {...this.config};
      /* bump version number TODO: remove string and number conversions*/
      const current_version = Number(config_copy.config_version);
      config_copy.config_version = `${current_version + 1}`;
      /* update, so user can see change*/
      this.$store.commit('set_applets_config', config_copy);
      /* send to remote*/
      /* update local list / reload local lost*/
      // @ts-ignore
      this.$refs.instances.get_list_of_configurations();
      /* remove _id as we want to create a new version*/
      delete config_copy._id;
      try {/* await create_configuration(config_copy);*/
        download(
          JSON.stringify(config_copy),
          `${config_copy.config_id}@${config_copy.config_version}.config.json`,
          'text/plain',
        );
        this.$store.commit('set_creating_new_config', false);
      } catch (e) {
        console.log('e', e);
      }
    },
    set_geodata_layers(geodata_layers: TGeodataLayer[]) {
      this.geodata_layers = geodata_layers;
    },
    set_location_selection(location_selection: TLocationSelection) {
      this.location_selection = location_selection;
    },
  },
});
</script>

<style>
  .red {
    color: red;
  }
</style>
