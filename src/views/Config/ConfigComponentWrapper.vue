<template>
  <div>
    <h1>{{display_name}}</h1>

    <el-collapse accordion>
      <el-collapse-item title="Messages" name="1" v-if="messages.length">
        <component-messages :messages="messages"></component-messages>
      </el-collapse-item>
    </el-collapse>
    <!-- Messages: incl. links to jump to related nodes -->

    <!-- Component itself -->
    <h4>Component content</h4>
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

interface NodeComponent extends Vue {
  // TODO: Cannot access ConfigNodeMixin for some reason, so recreating the required parts here
  reset: () => void;
  tell_me: () => void;
}

export default Vue.extend({
  components: {...component_list, ComponentMessages, ComponentActions},
  props: {
    component_name: String,

    display_name: String,
    node_name: String,
    path_name: String,

    config: Object as () => TConfig,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    save() {
      this.$emit('change', this.get_node_config(), this.path_name);
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

<style scoped>

</style>