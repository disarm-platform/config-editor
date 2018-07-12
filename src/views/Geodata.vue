<template>
  <div>
    <el-card>
      <div slot="header">
        <span>Geodata</span>
      </div>

      <el-alert
          v-if="alert.message"
          :title="alert.message"
          :type="alert.type">
      </el-alert>

      <el-table
          :data="geodata_layers"
          style="width: 900px">
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
            <el-button disabled icon="el-icon-upload" size="small"></el-button>
            <el-button @click="download_layer(scope.row.name, scope.$index)" icon="el-icon-download" size="small"></el-button>
            <el-button @click="delete_layer(scope.row.name, scope.$index)" icon="el-icon-delete" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 2em;">

        <el-input style="margin: 1em 0;" placeholder="Layer name" v-model="new_layer_name"></el-input>
        
        <el-upload ref="upload" :limit="1" :auto-upload="false" :on-change="on_upload_file" action="#">
          <el-button slot="trigger" size="small" type="primary">select file</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="save_new_layer">Save layer</el-button>
          <div class="el-upload__tip" slot="tip">file must be a geojson feature collection</div>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {summarise, validate_layer_schema} from '@locational/geodata-support';
import {TGeodataLayer, TGeodataLayerDefinition} from '@locational/geodata-support/build/module/config_types/TGeodata';
import { EValidationStatus } from '@locational/geodata-support/build/main/config_types/TValidationResponse';
// @ts-ignore
import download from 'downloadjs';

import { geodata_cache } from '../geodata_cache';
import { TFieldSummary } from '@locational/geodata-support/build/main/config_types/TGeodataSummary';
import {upload_file_as_text} from '../helpers/upload_file_as_text';
import { get_levels, get_level, create_level } from '../lib/geodata';

interface Data {
  geodata_layers: TGeodataLayer[];
  new_layer_name: string;
  file: any;
  alert: any;
}

export default Vue.extend({
  data(): Data {
    return {
      geodata_layers: [],
      new_layer_name: '',
      file: null,
      alert: {
        message: '',
        type: '', // warning or success
      },
    };
  },
  computed: {
    instance(): any {
      return this.$store.state.instance;
    },
    config(): any {
      return this.$store.state.config;
    },
  },
  watch: {
    instance() {
      this.retrieve_geodata_for_instance();
    },
  },
  mounted() {
    this.retrieve_geodata_for_instance();
  },
  methods: {
    async retrieve_geodata_for_instance() {
      if (!this.instance) { return; }

      this.geodata_layers = [];
      const levels = await get_levels(this.instance.config_id);
      for (const level_name of levels) {
        const level = await get_level(this.instance.config_id, level_name);

        try {
          const geodata_layer: any = {
            type: 'layer',
            name: level_name,
            file_name: '',
            validation_status: EValidationStatus.Red,
            field_summary: summarise(level.geodata_data),
          };
          this.geodata_layers.push(geodata_layer);
  
          geodata_cache[level_name] = level.geodata_data;
  
          console.log('geodata_layer', geodata_layer);
        } catch (e) {
          console.log('e', e);
        }
      }

      this.emit_changes();
    },
    download_layer(layer_name: string, index: number) {
      download(JSON.stringify(geodata_cache[layer_name]), `${this.instance.config_id}.${layer_name}.geojson`, 'text/plain');
    },
    delete_layer(layer_name: string, index: number) {
      this.geodata_layers.splice(index, 1);
      this.emit_changes();
    },
    async save_new_layer() {
      // 1. Upload geojson file
      const geojson_string = await upload_file_as_text((this.file as any).raw as File);
      const geojson = JSON.parse(geojson_string) as TGeodataLayer;

      // 2. Internally validate the geojson file
      const result = validate_layer_schema(geojson);

      if (result.status === EValidationStatus.Red) {
        this.alert = {
          type: 'warning',
          message: result.message,
        };
        return;
      }

      // 3. generate summary
      const field_summary = summarise(geojson); // as TFieldSummary[]

      // 4. Create new TGeodataLayerDefinition
      const new_layer: TGeodataLayerDefinition = {
        name: this.new_layer_name,
        file_name: (this.file as any).name,
        validation_status: result.status,
        field_summary,
      };

      try {
        await create_level(this.config.config_id, this.new_layer_name, geojson);
      } catch (e) {
        console.log('e', e);
        return;
      }
      // @ts-ignore, not sure why this complains
      this.geodata_layers.push(new_layer);

      // 5. Store geojson in cache somewhere outside vue
      geodata_cache[this.new_layer_name] = geojson;

      // 6. reset ui
      // @ts-ignore
      this.$refs.upload.clearFiles();
      this.new_layer_name = '';

      // 7. Emit changes to parent so we can use new layer
      this.emit_changes();
    },
    emit_changes() {
      this.$emit('geodata_layers', this.geodata_layers);
    },
    on_upload_file(file: File, fileList: File[]) {
      // @ts-ignore
      this.file = file;
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