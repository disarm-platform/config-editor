<template>
  <div>
    <h1>{{display_name}}</h1>

    <!-- Messages: incl. links to jump to related nodes -->
    <component-messages :messages="messages" v-if="messages.length"></component-messages>

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
import {component_list} from '@/views/component_defs';

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
      messages: ['No messages'],
    };
  },
  methods: {
    save() {
      this.$emit('change', this.get_node_config(), this.path_name);
    },
    reset() {
      this.$refs.actual_component.reset();
    },
    get_node_config() {
      return this.$refs.actual_component.tell_me();
    },
    tell_me() {
      console.log('value is', JSON.stringify(this.get_node_config()));
    }
  },
});
</script>

<style scoped>

</style>