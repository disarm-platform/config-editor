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
          v-if="!validation_result.passed"
          v-for="(error, index) of validation_result.errors"
          :key="index"
          :title="`${error.source_node_name || ''}:${error.target_node_name || '' } ${error.message}`"
          type="warning">
        </el-alert>

        <el-alert
          v-if="validation_result.passed"
          title="Validations passed"
          type="success">
        </el-alert>
      </div>

      <el-tabs tab-position="left" style="height: 800px; overflow: scroll;">
        <el-tab-pane
            v-if="config"
            v-for="{display_name, component_name, node_name, path_name, show_include} in component_defs"
            :key='component_name'
        >
          <span slot="label">
            {{display_name}}
            <i class="el-icon-success"></i>
            <i class="el-icon-error"></i>
          </span>
          <ConfigComponentWrapper

              :display_name="display_name"
              :config="config"
              :node_name="node_name"
              :path_name="path_name"
              :component_name="component_name"
              :show_include="show_include"

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
import {shape_validation_result, TShapedValidationResult} from '../../helpers/shape_validation_result_for_ui';
import {component_defs, component_list, ComponentDefinition} from '@/views/Config/component_defs';
import ConfigComponentWrapper from './ConfigComponentWrapper.vue';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {TGeodataLayer} from '@locational/geodata-support/build/module/config_types/TGeodata';
import { geodata_cache } from '@/geodata_cache';
import {validate} from '@locational/config-validation';
import { generate_location_selection } from '@locational/geodata-support';
import { TSpatialHierarchy } from '@locational/geodata-support/build/main/config_types/TSpatialHierarchy';
import { EValidationStatus } from '@locational/geodata-support/build/module/config_types/TValidationResponse';

export interface Data {
  validation_result: TShapedValidationResult;
  validation_result_message: string;
  component_defs: ComponentDefinition[];
}

export default Vue.extend({
  components: {ConfigComponentWrapper, ...component_list},
  props: {
    config: {} as () => TConfig,
    geodata_layers: Array as () => TGeodataLayer[],
  },
  data(): Data {
    return {
      validation_result: {
        passed: false,
        errors: [],
        warnings: [],
        success: [],
      },
      validation_result_message: '',
      component_defs,
    };
  },
  watch: {
    config() {
      this.validation_result = {
        passed: false,
        errors: [],
        warnings: [],
        success: [],
      };
    },
  },
  methods: {
    handle_change(updated_config: {}, path_name: string, included: boolean) {
      this.$emit('change', updated_config, path_name, included);
    },
    validate_config() {
      // 1. Attempt to create location_selection, if needed for full validation
      const location_selection_result = generate_location_selection(this.config.spatial_hierarchy as TSpatialHierarchy, geodata_cache);

      if (location_selection_result.status === EValidationStatus.Red) {
        // TODO: Fix: Maybe we should continue with validation and not return
        console.log('location_selection_result', location_selection_result);

        // @ts-ignore
        this.validation_result = {
          errors: [{message: location_selection_result.message}],
          warnings: [],
          success: [],
        };
        return;
      }

      // 2. Attach location_selection to config
      const config: TConfig = {
        ...this.config,
        location_selection: location_selection_result.location_selection,
      };

      // 3. Run config validation
      const validation_result = validate(config);

      // 4. Shape validation result for consumption
      const shaped_result = shape_validation_result(validation_result);
      console.log('shaped_result', shaped_result);
      // @ts-ignore
      this.validation_result = shaped_result;

      // 5. Emit errors if any

      if (!shaped_result.passed) {
        return;
      }

      // 6. Send validation result to parent component
      this.$emit('config_validation', true);
    },
  },
});
</script>
