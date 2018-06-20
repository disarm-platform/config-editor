<template>
  <div>

  <el-alert
    v-if="alert.message"
    :title="alert.message"
    :type="alert.type">
  </el-alert>

    <el-table
    :data="tableData"
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

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {validate_layer_schema, summarise, validate_spatial_hierarchy, generate_location_selection} from '@locational/geodata-support'


export default Vue.extend({
  props:['villages','districts'],
  data() {
    return {
      alert: {
        message: '',
        type: '' // warning or success
      },
      tableData: [
        {          
          name: 'districts',
          filename: 'bwa.districts.geojson',
          validation_status: '',
          field_summary: []
        },
        {          
          name: 'villages',
          filename: 'bwa.villages.geojson',
          validation_status: '',
          field_summary: []
        }
      ],
      spatial_hierarchy: {
        data_version: 10,
        markers: {
          planning_level_name: "villages",
          record_location_selection_level_name: "villages",
          denominator_fields: {
            estimated_rooms: "Num_Rooms"
          }
        },
        levels: [
          {
            field_name: "ID_2",
            display_field_name: "NAME_2",
            name: "districts"
          },
          {
            group_by_field: "name_2",
            field_name: "Id", 
            display_field_name: "VILLAGE",
            name: "villages"
          }
        ]
      }
    }
  },
  methods: {
    summarise(layer_name: string, index: number) {
      // TODO: Don't hard-code geodata layer
      const layer = layer_name === 'districts' ? districts : villages
      const result = summarise(layer)
      this.$set(this.tableData, index, {...this.tableData[index], field_summary: result})
    },
    validate_layer_schema(layer_name: string, index: number) {
      // TODO: Don't hard-code geodata layer
      const layer = layer_name === 'districts' ? districts : villages
      const result = validate_layer_schema(layer)
      const validation_status = result.status.startsWith('Green') ? 'success' : 'warning'
      this.$set(this.tableData, index, {...this.tableData[index], validation_status})
    },
    validate_spatial_hierarchy() {
      const result = validate_spatial_hierarchy(this.spatial_hierarchy, {
        villages,
        districts
      })

      this.alert = {
        message: result.message,
        type: result.status.startsWith('Green') ? 'success' : 'warning'
      }

      console.log('result', result);
    },
    generate_location_selection() {
      const result = generate_location_selection(this.spatial_hierarchy, {
        villages,
        districts
      })
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