<template>
  <div>
    <h1>This is the geodata page</h1>


    <el-table
    :data="tableData"
    style="width: 800px">
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
      width="400">
      <template slot-scope="scope">
        <el-button @click="validate_layer_schema('villages')" type="text" size="small">Validate</el-button>
        <el-button @click="summarise('villages')" type="text" size="small">Summarise</el-button>
        <el-button disabled type="text" size="small">Upload</el-button>
        <el-button disabled type="text" size="small">Delete</el-button>

      </template>
    </el-table-column>
  </el-table>

  <el-row style="margin-top: 2em;">
    <el-button @click="validate_spatial_hierarchy()">Validate</el-button>
    <el-button @click="generate_location_selection()">Generate location selection</el-button>
    <el-button>Save</el-button>
  </el-row>

  </div>
</template>
<script lang="ts">

import {validate_layer_schema, summarise, validate_spatial_hierarchy, generate_location_selection} from '@locational/geodata-support'
import constituencies from '../geojson/nam.constituencies.json'
import villages from '../geojson/nam.villages.json'

const spatial_hierarchy = {
  "data_version": 4,
  "markers": {
    "planning_level_name": "villages",
    "record_location_selection_level_name": "villages",
    "denominator_fields": {
      "structures": "NumStructu"
    }
  },
  "levels": [
    {
      "group_by_field": "REGION",
      "field_name": "OBJECTID",
      "display_field_name": "CONST",
      "name": "constituencies"
    },
    {
      "group_by_field": "CONSTIT",
      "field_name": "uID",
      "display_field_name": "mp_NAME",
      "name": "villages"
    }
  ]
}

export default {
  data() {
    return {
      tableData: [
        {          
          name: 'structures',
          filename: 'nam.structures.geojson'
        },
        {          
          name: 'villages',
          filename: 'nam.villages.geojson'
        }
      ]
    }
  },
  methods: {
    summarise(layer_name) {
      const layer = layer_name === 'constituencies' ? constituencies : villages
      const result = summarise(layer)
      console.log('result', result);
    },
    validate_layer_schema(layer_name) {
      const layer = layer_name === 'constituencies' ? constituencies : villages
      const result = validate_layer_schema(layer)
      console.log('result', result);
    },
    validate_spatial_hierarchy() {
      const result = validate_spatial_hierarchy(spatial_hierarchy, {
        villages,
        constituencies
      })
      console.log('result', result);
    },
    generate_location_selection() {
      const result = generate_location_selection(spatial_hierarchy, {
        villages,
        constituencies
      })
      console.log('result', result);
    }
  }
}
</script>
