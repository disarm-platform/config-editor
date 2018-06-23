<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Config</span>
        <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="validate_config"
        >Validate</el-button>

      </div>
      <div>
        <el-alert
            v-if="validation_result_message"
            :title="validation_result_message"
            type="warning">
        </el-alert>
      </div>

      <component
          v-for="{name, node_name} in component_defs"
          :key='name'
          v-bind:is='name'

          :config="config"
          :node_name="node_name"
          :validation_result="validation_result"
      >
      </component>
    </el-card>

  </div>
</template>

<script>
  import Vue from 'vue';

  import {validate} from '@locational/config-validation';
  import {generate_location_selection} from '@locational/geodata-support';
  import {determine_validation_result} from '../helpers/determine_validation_result_for_ui';
  import {component_defs, component_list} from '@/views/nodex';

  export default Vue.extend({
    components: component_list,
    props: {
      config: Object,
      geodata_layers: Array,
    },
    data() {
      return {
        validation_result: {},
        validation_result_message: '',
        component_defs,
      };
    },
    methods: {
      handle_change(piece_of_config, path) {
        if (path === 'root') {
          this.$emit('config', piece_of_config);
        } else {
          // something like this, haven't tested this
          const new_config = {
            ...this.config,
            [path]: piece_of_config,
          };
          this.$emit('config', new_config);
        }
      },
      validate_config() {
        // start formatting of config, move to separate function?
        const geodata = {};
        const geodata_summary = {};
        for (const layer of this.geodata_layers) {
          geodata[layer.name] = layer.geojson;
          geodata_summary[layer.name] = layer.field_summary;
        }


        const spatial_hierarchy = {
          ...this.config.spatial_hierarchy,
          geodata_summary,
        };
        // TODO: Think through, do we want to generate location_selection here?
        // Do we even want to do the validations here at all? Might want to move to Editor.vue
        const location_selection_result = generate_location_selection(spatial_hierarchy, geodata);
        const location_selection = location_selection_result.location_selection;

        const config = {
          ...this.config,
          location_selection,
        };
        // finish formatting of config


        // TODO: Save result, it contains info about which nodes are failing.
        this.validation_result = validate(config);
        const validation_result = determine_validation_result(this.validation_result);

        if (validation_result.passed) {
          this.$emit('config_validation', true);
          this.validation_result_message = 'Configuration passed all validations';
        } else {
          this.validation_result_message =
            `Schema validation failed ${JSON.stringify(validation_result.support_messages)}`;
          this.$emit('config_validation', false);
        }
      },
    },
  });
</script>
