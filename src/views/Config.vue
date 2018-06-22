<template>
  <div >
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
    </el-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {validate} from '@locational/config-validation'
import {generate_location_selection} from '@locational/geodata-support'
import ConfigTextArea from '../components/ConfigTextarea.vue'

export default Vue.extend({
  components: {ConfigTextArea},
  props: {
    config: Object, // should probably be Object,
    geodata_layers: Array,
  },
  data() {
    return {
      validation_result: ''
    };
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
    validate_config(){
      // create geodata in correct format
      const geodata = {}
      const geodata_summary =  {}
      for (const layer of this.geodata_layers) {
        geodata[layer.name] = layer.geojson
        geodata_summary[layer.name] = layer.field_summary
      }


      const spatial_hierarchy = {
        ...this.config.spatial_hierarchy,
        geodata_summary
      }
      
      const location_selection_result = generate_location_selection(spatial_hierarchy, geodata)
      const location_selection = location_selection_result.location_selection

      const config = {
        ...this.config,
        location_selection
      }

      const a = validate(config)
      const validation_result = this.determine_validation_result(a)

      if (validation_result.passed) {
        this.$emit('config_validation', true);
        this.validation_result = "Configuration passed all validations"
      } else {
        this.validation_result = 'Schema validation failed ' + JSON.stringify(validation_result.support_messages)
        this.$emit('config_validation', false);
      }
    },
    determine_validation_result(response) {
      if (response.status.startsWith('Red')){
        return {
          passed: false,
          support_messages: response.support_messages
        }
      }

      const edge_statuses_that_fail = response.edge_messages.filter(e => e.status.startsWith('Red'))

      const messages_to_show = edge_statuses_that_fail.map(e => {
        if (e.custom_edge_responses.length) {
          const custom_message = e.custom_edge_responses
            .filter(cer => cer.status.startsWith('Red'))
            .map(cer => cer.message)
          return {
            message: custom_message.join(','),
            nodes: [e.source_node_name, e.target_node_name]
          }
        } else {
          return {
            message: e.message,
            nodes: []
          }
        }
      })
      return {
        passed: edge_statuses_that_fail.length === 0,
        support_messages: edge_statuses_that_fail
      }
    }
  }
});
</script>
