<template>
  <div>
    
    <div style="display: flex; justify-content: space-between;">
      <h1 style="margin-top: 0;">{{display_name}}</h1>
      <el-checkbox v-if="show_include" v-model="included" @change="save" style="margin-top: 0.5em;margin-bottom: 1em;">Include</el-checkbox>
    </div>

    <ComponentMessages :validation_result="validation_result" :node_name="node_name"/>

    <!-- Component itself -->
    <component
        v-show="included"
        :is="component_name"
        :config="config"
        :path_name="path_name"
        @change="save"
    ></component>

    <!-- Actions: save, confirm, reset, etc. -->
    <!-- <component-actions
        :disabled="messages.length > 0"
        @save="save"
        @tell_me="tell_me"
        @reset="reset"
    ></component-actions> -->

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {get, set, unset} from 'lodash';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

import ComponentMessages from './ComponentMessages.vue';
import ComponentActions from './ComponentActions.vue';
import {component_list} from './component_defs';
import { TStandardEdgeResponse } from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';

export interface Data {
  included: boolean;
}

export default Vue.extend({
  components: {...component_list, ComponentMessages, ComponentActions},
  props: {
    component_name: String,
    show_include: Boolean,
    display_name: String,
    node_name: String,
    path_name: String,

    validation_result: Object as () => any,
  },
  data(): Data {
    return {
      included: true,
    };
  },
  computed: {
    config(): TConfig {
      return this.$store.state.applets_config;
    },
  },
  watch: {
    config() {
      this.determine_included()
    }
  },
  mounted() {
    this.determine_included();
  },
  methods: {
    save(updated_config: any) {
      if (this.included) {
        /*
          Need to use lodash.set so nested objects get updated.
          If not we end up with an object like: { 'applets.irs_record_point': {} }
          when we want: { 'applets': {'irs_record_point: {}} }
        */
        const new_config = {...this.config};
        set(new_config, this.path_name, updated_config);
        this.$store.commit('set_applets_config', new_config);
      } else {/* use unset for same reason as above*/
        const new_config = {...this.config};
        unset(new_config, this.path_name);
        this.$store.commit('set_applets_config', new_config);
      }
    },
    determine_included() {
      if (!this.show_include) {
        this.included = true;
        return;
      }
      const config = get(this.config, this.path_name);
      if (!config) {
        this.included = false;
      } else {
        this.included = !!(Object.keys(config).length);
      }
    },
  },
});
</script>