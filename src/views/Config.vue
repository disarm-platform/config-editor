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
        v-model="config">
      </el-input>
    </el-card>
  </div>
</template>
<script lang="ts">
import {validate} from '@locational/config-validation'
import validBwaConfig from '../horrible_seed_data/bwa_config.json'
export default Vue.extend({
  data() {
    return {
      config: JSON.stringify(validBwaConfig)
    };
  },
  methods: {
    validate_config(){
      let validation_result = validate(JSON.parse(this.config))
      this.popup(JSON.stringify(validation_result));
    },      
    popup(message:string) {
      this.$message(message);
    }
  }
});
</script>
