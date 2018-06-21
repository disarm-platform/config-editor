<template>
  <div >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Config</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="validate_config">Validate</el-button>
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
<script lang="ts">
import Vue from 'vue'
import {validate} from '@locational/config-validation'
export default Vue.extend({
  props: {
    config: Object // should probably be Object
  },
  data() {
    return {
    };
  },
  computed: {
    formatted_config: {
      get() {
        return JSON.stringify(this.config, undefined, 2);
      },
      set (val) {
        this.config = JSON.parse(val)
      }
    }
  },
  methods: {
    validate_config(){
      console.log(this.config)
      let validation_result = validate(JSON.parse(this.config))
      this.popup(JSON.stringify(validation_result));
    },      
    popup(message:string) {
      this.$message(message);
    }
  }
});
</script>
