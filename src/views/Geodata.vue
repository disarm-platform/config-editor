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
          <p v-for="field in props.row.field_summary" :key="field.field_name">
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
      <el-button disabled>Save</el-button>
    </el-row>
  </el-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {validate_layer_schema, summarise} from '@locational/geodata-support'

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
    }
  },
  methods: {
    summarise(layer_name, index) {
      const layer = this.geodata_layers.find(l => l.name === layer_name)
      const result = summarise(layer.geojson)
      this.$set(this.geodata_layers, index, {...this.geodata_layers[index], field_summary: result})
    },
    validate_layer_schema(layer_name, index) {
      const layer = this.geodata_layers.find(l => l.name === layer_name)
      const result = validate_layer_schema(layer.geojson)
      const validation_status = result.status.startsWith('Green') ? 'success' : 'warning'
      this.$set(this.geodata_layers, index, {...this.geodata_layers[index], validation_status})
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