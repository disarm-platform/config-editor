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
      <el-input
        type="textarea"
        :rows="20"
        placeholder="Please input"
        v-model="formatted_config">
      </el-input>
    </el-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {validate} from '@locational/config-validation'
import {generate_location_selection} from '@locational/geodata-support'
export default Vue.extend({
  props: {
    config: Object, // should probably be Object,
    geodata_layers: Array,
  },
  data() {
    return {
      validation_result: ''
    };
  },
  computed: {
    formatted_config: {
      get() {
        return JSON.stringify(this.config, undefined, 2);
      },
      set (val) { 
        // TODO: want to emit an event that sets config on Editor
        this.config = JSON.parse(val)
      }
    }
  },
  methods: {
    validate_config(){
      // create geodata in correct format
      const geodata = {}
      for (const layer of this.geodata_layers) {
        geodata[layer.name] = layer.geojson
      }
      

      const location_selection = generate_location_selection(this.config.spatial_hierarchy, geodata)
      const config = {
        ...this.config,
        location_selection
      }
      let validation_result = validate(this.config)
      this.$emit('config_validation', true);
      this.validation_result = JSON.stringify(validation_result);
    }
  }
});
</script>
