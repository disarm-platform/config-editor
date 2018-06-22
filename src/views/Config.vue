<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Config</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="validate_config">Validate</el-button>
      </div>
      <div>
        <el-alert
            v-if="validation_result"
            :title="validation_result"
            type="warning">
        </el-alert>
      </div>
      <ConfigTextArea :config="config" path="root" @change="handle_change"/>
      <MapFocus></MapFocus>
    </el-card>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {validate} from '@locational/config-validation'
  import {generate_location_selection} from '@locational/geodata-support'
  import {determine_validation_result} from '../helpers/determine_validation_result_for_ui'

  import Aggregations from './config_components/Aggregations'
  import MapFocus from './config_components/MapFocus'
  import ConfigTextArea from './config_components/ConfigTextarea'
  import {thing} from '@/lib/basic'

  export default Vue.extend({
    components: {ConfigTextArea, MapFocus},
    props: {
      config: Object, // should probably be Object,
      geodata_layers: Array,
    },
    data() {
      return {
        validation_result: ''
      };
    },
    mounted() {
      console.log('mounted')
    },
    methods: {
      handle_change(piece_of_config, path) {
        if (path === 'root') {
          this.$emit('config', piece_of_config)
        } else {
          // something like this, haven't tested this
          const new_config = {
            ...this.config,
            [path]: piece_of_config
          }
          this.$emit('config', new_config)
        }
      },
      validate_config() {
        // start formatting of config, move to separate function?
        const geodata = {}
        const geodata_summary = {}
        for (const layer of this.geodata_layers) {
          geodata[layer.name] = layer.geojson
          geodata_summary[layer.name] = layer.field_summary
        }


        const spatial_hierarchy = {
          ...this.config.spatial_hierarchy,
          geodata_summary
        }
        // TODO: Think through, do we want to generate location_selection here?
        // Do we even want to do the validations here at all? Might want to move to Editor.vue
        const location_selection_result = generate_location_selection(spatial_hierarchy, geodata)
        const location_selection = location_selection_result.location_selection

        const config = {
          ...this.config,
          location_selection
        }
        // finish formatting of config


        // TODO: Save result, it contains info about which nodes are failing.
        const result = validate(config)
        const validation_result = determine_validation_result(result)

        if (validation_result.passed) {
          this.$emit('config_validation', true);
          this.validation_result = 'Configuration passed all validations'
        } else {
          this.validation_result = 'Schema validation failed ' + JSON.stringify(validation_result.support_messages)
          this.$emit('config_validation', false);
        }
      }
    }
  });
</script>
