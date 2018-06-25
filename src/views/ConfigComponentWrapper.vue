<template>
  <div>
    <h1>{{display_name}}</h1>

    <!-- Messages: incl. links to jump to related nodes -->

    <!-- Component itself -->
    <component
        v-bind:is="component_name"
    ></component>

    <!-- Actions: save, confirm, reset, etc. -->
    <el-button @click="click">CLICK</el-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

  import {component_list} from '@/views/component_defs';

  export default Vue.extend({
    components: component_list,
    props: {
      component_name: String,
      display_name: String,
      config: Object as () => TConfig,
      node_name: String,
    },
    methods: {
      click() {
        console.log('click from', this.component_name);
      },
      emit_change() {
        this.$emit('change', 'something changed')
      },
    },
  });
</script>

<style scoped>

</style>