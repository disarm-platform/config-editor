<template>
  <div>
    
    <div style="display: flex; justify-content: space-between;">
      <h1 style="margin-top: 0;">{{display_name}}</h1>
      <el-checkbox v-if="show_include" v-model="included" @change="save" style="margin-top: 0.5em;margin-bottom: 1em;">Include</el-checkbox>
    </div>

    <ComponentMessages :validation_result="validation_result" :node_name="node_name"/>

    <!-- Component itself -->
    <component
        v-bind:is="component_name"
        :config="config"
        :node_name="node_name"
        :path_name="path_name"
        ref="actual_component"
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
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

import ComponentMessages from './ComponentMessages.vue';
import ComponentActions from './ComponentActions.vue';
import {component_list} from '@/views/Config/component_defs';
import { TStandardEdgeResponse } from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';

interface NodeComponent extends Vue {
  // TODO: Cannot access ConfigNodeMixin for some reason, so recreating the required parts here
  reset: () => void;
  tell_me: () => void;
}

export interface Data {
  messages: string[];
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

    config: Object as () => TConfig,
    validation_result: Object as () => any,
  },
  data(): Data {
    return {
      messages: [],
      included: true,
    };
  },
  mounted() {
    if (!this.show_include) {
      this.included = true;
      return;
    }
    const config = this.get_node_config();
    if (!config) {
      this.included = false;
    } else {
      this.included = !!(Object.keys(config).length);
    }
  },
  methods: {
    save() {
      this.$emit('change', this.get_node_config(), this.path_name, this.included);
    },
    reset() {
      (this.$refs.actual_component as NodeComponent).reset();
    },
    get_node_config() {
      return (this.$refs.actual_component as NodeComponent).tell_me();
    },
    tell_me() {
      console.log('value is', JSON.stringify(this.get_node_config()));
    },
  },
});
</script>