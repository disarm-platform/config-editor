<template>
  <div>
    <el-card>
      <el-alert
        v-if="alert.message"
        :title="alert.message"
        :type="alert.type">
      </el-alert>

      <el-table
      :data="geodata_layers"
      style="width: 900px"
      :row-class-name="tableRowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <h2>Field Summary</h2>
          <p v-for="field in props.row.field_summary">
            <b>{{field.field_name}}</b> <br>
            Type:  {{field.type}} <br>
            Exists on all:  {{field.exists_on_all}} <br>
            Unique:  {{field.unique}} <br>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Layer name"
        width="120">
      </el-table-column>
      <el-table-column
        prop="filename"
        label="File name"
        width="400">
      </el-table-column>
      <el-table-column
        label="Operations"
        width="500">
        <template slot-scope="scope">
          <el-button @click="validate_layer_schema(scope.row.name, scope.$index)" type="text" size="small">Validate</el-button>
          <el-button @click="summarise(scope.row.name, scope.$index)" type="text" size="small">Summarise</el-button>
          <el-button disabled icon="el-icon-upload" size="small"></el-button>
          <el-button disabled icon="el-icon-delete" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- TODO: Fix this, auto uploads to action props -->
    <el-upload style="margin-top: 2em;" @on-success="on_upload_file" action="#">
      <el-button slot="trigger" size="small" type="primary">select file</el-button>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>

    <el-row style="margin-top: 2em;">
      <el-button @click="validate_spatial_hierarchy()">Validate</el-button>
      <el-button @click="generate_location_selection()">Generate location selection</el-button>
      <el-button disabled>Save</el-button>
    </el-row>
  </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {validate_layer_schema, summarise, validate_spatial_hierarchy, generate_location_selection} from '@locational/geodata-support'


export default Vue.extend({
  props:{
    geodata_layers: Array
  },
  data() {
    return {
      alert: {
        message: '',
        type: '' // warning or success
      },
      spatial_hierarchy: {
        data_version: 1,
        markers: {
          planning_level_name: "cities",
          record_location_selection_level_name: "cities",
          denominator_fields: {}
        },
        levels: [
          {
            field_name: "province_id",
            display_field_name: "province",
            name: "provinces"
          },
          {
            group_by_field: "province",
            field_name: "city_id", 
            display_field_name: "name",
            name: "cities"
          }
        ]
      }
    }
  },
  computed: {
    geodata_for_validation() {
      let geodata = {}
      for (const layer of this.geodata_layers) {
        geodata[layer.name] = layer.geojson
      }
      return geodata
    }
  },
  methods: {
    summarise(layer_name: string, index: number) {
      const layer = this.geodata_layers.find(l => l.name === layer_name)
      const result = summarise(layer.geojson)
      this.$set(this.geodata_layers, index, {...this.geodata_layers[index], field_summary: result})
    },
    validate_layer_schema(layer_name: string, index: number) {
      const layer = this.geodata_layers.find(l => l.name === layer_name)
      const result = validate_layer_schema(layer.geojson)
      const validation_status = result.status.startsWith('Green') ? 'success' : 'warning'
      this.$set(this.geodata_layers, index, {...this.geodata_layers[index], validation_status})
    },
    validate_spatial_hierarchy() {
      const result = validate_spatial_hierarchy(this.spatial_hierarchy, this.geodata_for_validation)

      this.alert = {
        message: result.message,
        type: result.status.startsWith('Green') ? 'success' : 'warning'
      }

      console.log('result', result);
    },
    generate_location_selection() {
      const result = generate_location_selection(this.spatial_hierarchy, this.geodata_for_validation)
      console.log('result', result);

      const success = result.status.startsWith('Green')
    
      this.alert = {
        message: result.message,
        type: success ?  'success' : 'warning'
      }

      if (success) {
        this.$store.commit('set_location_selection', result.location_selection)
      }
    },
    on_upload_file(response, file, fileList) {
      console.log(response, file, fileList)
    },
    // ui
    tableRowClassName({row, rowIndex}) {
        return row.validation_status
    }
  }
})
</script>
<style>
  .el-table .warning {
    background: oldlace;
  }

  .el-table .success {
    background: #f0f9eb;
  }
</style>