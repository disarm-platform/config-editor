<template>
  <div>
    
    <div style="display: flex; justify-content: space-between;">
      <h1 style="margin-top: 0;">{{display_name}}</h1>
      <el-checkbox v-if="show_include" v-model="included" @change="save" style="margin-top: 0.5em;margin-bottom: 1em;">Include</el-checkbox>
    </div>

    <ComponentMessages :validation_result="validation_result" :node_name="node_name"/>

    <!-- Component itself -->
    <component
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
import {get} from 'lodash'
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

import ComponentMessages from './ComponentMessages.vue';
import ComponentActions from './ComponentActions.vue';
import {component_list} from './component_defs';
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
    const config = get(this.config, this.path_name)
    if (!config) {
      this.included = false;
    } else {
      this.included = !!(Object.keys(config).length);
    }
  },
  methods: {
    save(node_config: any) {
      this.$emit('change', node_config, this.path_name, this.included);
    }
  },
});
</script>