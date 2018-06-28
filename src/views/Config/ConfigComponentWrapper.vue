<template>
  <div>
    <h1>{{display_name}}</h1>
    
    <el-checkbox v-model="included" @change="save" style="margin-bottom: 1em;">Include</el-checkbox>

    <!-- Messages: incl. links to jump to related nodes -->
    <el-collapse accordion v-if="messages.length">
      <el-collapse-item title="Messages" name="1">
        <component-messages :messages="messages"></component-messages>
      </el-collapse-item>
    </el-collapse>

    <ComponentMessages :errors="errors" :warnings="warnings" :success="success"/>

    <!-- Component itself -->
    <component
        v-bind:is="component_name"
        :config="config"
        :node_name="node_name"
        :path_name="path_name"
        ref="actual_component"
    ></component>

    <!-- Actions: save, confirm, reset, etc. -->
    <component-actions
        :disabled="messages.length > 0"
        @save="save"
        @tell_me="tell_me"
        @reset="reset"
    ></component-actions>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

import ComponentMessages from './ComponentMessages.vue';
import ComponentActions from './ComponentActions.vue';
import {component_list} from '@/views/Config/component_defs';
import { TShapedValidationResult } from '@/helpers/shape_validation_result_for_ui';
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

    display_name: String,
    node_name: String,
    path_name: String,

    config: Object as () => TConfig,
    validation_result: Object as () => TShapedValidationResult
  },
  data(): Data {
    return {
      messages: [],
      included: true,
    };
  },
  computed: {
    errors(): TStandardEdgeResponse[] {
      return this.validation_result.errors.filter(response => {
        return response.source_node_name === this.node_name || response.target_node_name === this.node_name
      })
    },
    warnings(): TStandardEdgeResponse[] {
      return this.validation_result.warnings.filter(response => {
        return response.source_node_name === this.node_name || response.target_node_name === this.node_name
      })
    },
    success(): TStandardEdgeResponse[]{
      return this.validation_result.success.filter(response => {
        return response.source_node_name === this.node_name || response.target_node_name === this.node_name
      })
    }
  },
  mounted() {
    const config = this.get_node_config()
    if (!config) {
      this.included = false
    } else {
      this.included = !!(Object.keys(config).length)
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