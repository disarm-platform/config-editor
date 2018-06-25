<template>
  <div>
    <h1>{{display_name}}</h1>
    <component
        v-bind:is="component_name"
    ></component>
    <el-button @click="click">CLICK</el-button>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {TConfig} from "@locational/config-validation/build/module/lib/config_types/TConfig";

  import {component_list} from '@/views/component_defs';

  export default Vue.extend({
    components: component_list,
    props: {
      display_name: String,
      config: Object as () => TConfig,
      node_name: String,
    },
    methods: {
      click() {
        console.log('click from', this.component_name)
      }
    }
  })
</script>

<style scoped>

</style>