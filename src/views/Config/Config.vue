<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Config</span>
        <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="validate_config"
        >Validate
        </el-button>
      </div>

      <div>
        <el-alert
            v-if="validation_result_message"
            :title="validation_result_message"
            type="warning">
        </el-alert>
      </div>

      <el-tabs tab-position="left" style="height: 800px; overflow: scroll;">
        <el-tab-pane
            v-for="{display_name, component_name, node_name, path_name} in component_defs"
            :key='component_name'
            :label="display_name"
        >
          <ConfigComponentWrapper

              :display_name="display_name"
              :config="config"
              :node_name="node_name"
              :path_name="path_name"
              :component_name="component_name"

              :validation_result="validation_result"
              @change="handle_change"
          >
          </ConfigComponentWrapper>
        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // import {determine_validation_result} from '../helpers/determine_validation_result_for_ui';
  import {component_defs, component_list} from '@/views/Config/component_defs';
  import ConfigComponentWrapper from './ConfigComponentWrapper.vue';
  import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';
  import {TGeodataLayer} from '@locational/geodata-support/build/module/config_types/TGeodata';
  import { geodata_cache } from '@/geodata_cache';
  import { generate_location_selection } from '@locational/geodata-support'
  import { TSpatialHierarchy } from '@locational/geodata-support/build/main/config_types/TSpatialHierarchy';

  export default Vue.extend({
    components: {ConfigComponentWrapper, ...component_list},
    props: {
      config: {} as () => TConfig,
      geodata_layers: Array as () => TGeodataLayer[],
    },
    data() {
      return {
        validation_result: {},
        validation_result_message: '',
        component_defs,
      };
    },
    methods: {
      handle_change(updated_config: {}, path_name: string, included: boolean) {
        this.$emit('change', updated_config, path_name, included);
      },
      validate_config() {
        // 1. Attempt to create location_selection, if needed for full validation
        const location_selection_result = generate_location_selection(this.config.spatial_hierarchy as TSpatialHierarchy, geodata_cache);
        
        // 2. Attach location_selection to config
        const config = {
          ...this.config,

          // should check location_selection_result.status is EValidationStatus.Green
          location_selection: location_selection_result.location_selection
        }

        // 3. Run config validation

        // 4. Shape validation result for consumption

        // 5. Emit errors if any

        // 6. Send validation result to parent component

        
        console.log('validate_config', config);
        return;
        // // start formatting of Config, move to separate function?
        // const geodata = {};
        // const geodata_summary = {};
        // for (const layer of this.geodata_layers) {
        //   geodata[layer.name] = layer.geojson;
        //   geodata_summary[layer.name] = layer.field_summary;
        // }
        //
        //
        // const spatial_hierarchy = {
        //   ...this.Config.spatial_hierarchy,
        //   geodata_summary,
        // };
        // // TODO: Think through, do we want to generate location_selection here?
        // // Do we even want to do the validations here at all? Might want to move to Editor.vue
        // const location_selection_result = generate_location_selection(spatial_hierarchy, geodata);
        // const location_selection = location_selection_result.location_selection;
        //
        // const Config = {
        //   ...this.Config,
        //   location_selection,
        // } as TConfig;
        // // finish formatting of Config
        //
        //
        // // TODO: Save result, it contains info about which nodes are failing.
        // this.validation_result = validate(Config);
        // const validation_result = determine_validation_result(this.validation_result);
        //
        // if (validation_result.passed) {
        //   this.$emit('config_validation', true);
        //   this.validation_result_message = 'Configuration passed all validations';
        // } else {
        //   this.validation_result_message = `Schema validation failed` +
        //    `${JSON.stringify(validation_result.support_messages)}`;
        //   this.$emit('config_validation', false);
        // }
      },
    },
  });
</script>
