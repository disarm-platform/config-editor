<template>
  <div>
    <h1>{{display_name}}</h1>

    <!-- Messages: incl. links to jump to related nodes -->
    <component-messages :messages="messages" v-if="messages.length"></component-messages>

    <!-- Component itself -->
    <component
        v-bind:is="component_name"
        :config="config"
        :node_name="node_name"
        :path_name="path_name"
        @change="emit_change"
    ></component>

    <!-- Actions: save, confirm, reset, etc. -->
    <component-actions @click="click"></component-actions>
  
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
      messages: [],
    };
  },
  methods: {
    emit_change(changed_config) {
      console.log('emit_change', changed_config, this.node_name)
      // this.$emit('change', 'piece_of_config', this.node_name);
    },
    click() {
      console.log('cluck');
    },
  },
});
</script>

<style scoped>

</style>