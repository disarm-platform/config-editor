<template>
  <el-tabs v-model="active_tab" type="border-card">

    <el-tab-pane name="login">
      <span slot="label">
        Login
        <i v-if="user" class="el-icon-success"></i>
      </span>
      <Login />
    </el-tab-pane>

    <el-tab-pane name="instances" :disabled="!user">
      <span slot="label">
        Instances
      </span>
      <Instances ref="instances" />
    </el-tab-pane>

    <el-tab-pane name="geodata" :disabled="!user">
      <span slot="label">
        Geodata
        <i v-if="geodata_layers.length" class="el-icon-success"></i>
      </span>
      <Geodata
        v-if="config"
        :geodata_layers="geodata_layers"
        @geodata_layers="set_geodata_layers"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

    <el-tab-pane name="config" :disabled="!user">
      <span slot="label" :class="{red: user && !config_valid}">
        Config
        <i v-if="!config_valid" class="el-icon-error"></i>
        <i v-else class="el-icon-success"></i>
      </span>
      <Config
        v-if="config"
        :config="config"
        @config_validation="set_config_validation"
        :geodata_layers="geodata_layers"
        @change="change"
      />
      <p v-else>Please select a config or create a new one</p>
    </el-tab-pane>

    <el-tab-pane name="publish" :disabled="!user">
      <span slot="label">
        Publish
        <i class="el-icon-edit"></i>
      </span>
      <Publish
        v-if="config"
        :config_valid="config_valid"
        :version="config.config_version"
        @save_config="save_config"
      />
      <p v-else>Please select a config or create a new one</p>
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

  import { get_configuration, create_configuration } from './lib/config'

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
        geodata_layers: [],
        location_selection: null,
      };
    },
    watch: {
      async selected_config(selected_config) {
        if (!selected_config.id) return // if we are creating a new instance it won't have .id

        const config = await get_configuration(selected_config.id)
        this.$store.commit('set_config', config) 
      }
    },
    computed: {
      config() {
        return this.$store.state.config
      },
      selected_config() {
        return this.$store.state.instance
      },
      user() {
        return this.$store.state.user
      }
    },
    async mounted() {
      if (this.selected_config && this.selected_config.id) {
        const config = await get_configuration(this.selected_config.id)
        this.$store.commit('set_config', config) 
      }
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
          const new_config = {...this.config}
          set(new_config, pathname, updated_config)

          this.$store.commit('set_config', new_config)
        } else {
          // use unset for same reason as above
          const new_config = {...this.config}
          unset(new_config, pathname)
          
          this.$store.commit('set_config', new_config)
        }
      },
      async save_config() {
        const config_copy = {...this.config}

        // bump version number
        // TODO: remove string and number conversions
        const current_version = Number(config_copy.config_version)
        config_copy.config_version = `${current_version + 1}`

        // update, so user can see change
        this.$store.commit('set_config', config_copy)

        // send to remote

        // update local list / reload local lost
        this.$refs.instances.get_list_of_configurations()

        // remove _id as we want to create a new version
        delete config_copy._id

        try {
          await create_configuration(config_copy)
        } catch (e) {
          console.log('e', e);
        }
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
<style>
  .red {
    color: red
  }
</style>
