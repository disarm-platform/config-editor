<template>
  <div>
    <el-card>
      <div slot="header">
        <span>Geodata</span>
        <el-button
            style="float: right; padding: 3px 0"
            type="text"
        >Check
        </el-button>
      </div>

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
              Type: {{field.type}} <br>
              Exists on all: {{field.exists_on_all}} <br>
              Unique: {{field.unique}} <br>
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
            <el-button @click="validate_layer_schema(scope.row.name, scope.$index)" type="text" size="small">Validate
            </el-button>
            <el-button @click="summarise(scope.row.name, scope.$index)" type="text" size="small">Summarise</el-button>
            <el-button disabled icon="el-icon-upload" size="small"></el-button>
            <el-button @click="delete_layer(scope.row.name, scope.$index)" icon="el-icon-delete"
                       size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 2em;">

        <el-input style="margin: 1em 0;" placeholder="Layer name" v-model="new_layer_name"></el-input>
        <!-- TODO: Fix this, auto uploads to action props -->
        <el-upload ref="upload" :limit="1" :auto-upload="false" :on-change="on_upload_file" action="#">
          <el-button slot="trigger" size="small" type="primary">select file</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="save_new_layer">Save layer
          </el-button>
          <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {validate_layer_schema, summarise} from '@locational/geodata-support';

  function upload_file_as_text(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsText(file);
    });
  }

  export default Vue.extend({
    props: {
      geodata_layers: Array,
    },
    data() {
      return {
        new_layer_name: '',
        file: null,
        alert: {
          message: '',
          type: '', // warning or success
        },
      };
    },
    methods: {
      summarise(layer_name, index) {
        const layer = this.geodata_layers.find((l) => l.name === layer_name);
        const result = summarise(layer.geojson);
        // TODO: Emit event, instead of setting parent data
        this.$set(this.geodata_layers, index, {...this.geodata_layers[index], field_summary: result});
      },
      validate_layer_schema(layer_name, index) {
        const layer = this.geodata_layers.find((l) => l.name === layer_name);
        const result = validate_layer_schema(layer.geojson);
        const validation_status = result.status.startsWith('Green') ? 'success' : 'warning';
        // TODO: Emit event, instead of setting parent data
        this.$set(this.geodata_layers, index, {...this.geodata_layers[index], validation_status});
      },
      delete_layer(layer_name, index) {
        this.geodata_layers.splice(index, 1);
        // this.$set(this.geodata_layers, index, {...this.geodata_layers[index], validation_status})
      },
      async save_new_layer() {
        const geojson = await upload_file_as_text(this.file.raw);

        const new_layer = {
          name: this.new_layer_name,
          file_name: this.file.name,
          geojson: JSON.parse(geojson),
          validation_status: '',
          field_summary: [],
        };

        this.geodata_layers.push(new_layer);

        this.$refs.upload.clearFiles();
      },
      on_upload_file(file, fileList) {
        this.file = file;
      },
      // ui
      tableRowClassName({row, rowIndex}) {
        return row.validation_status;
      },
    },
  });
</script>
<style>
  .el-table .warning {
    background: oldlace;
  }

  .el-table .success {
    background: #f0f9eb;
  }
</style>