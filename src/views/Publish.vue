<template>
  <div>
    <el-card>
      <div>
        <el-alert
            title="Unsaved changes"
            type="warning">
        </el-alert>

        <el-alert
            v-if="!config_valid"
            title="Configuration is not valid"
            type="warning">
        </el-alert>

        <div style="margin-top:1em;">
          <el-input placeholder="Instance id" v-model="instance_id"></el-input>
        </div>
        <div style="margin-top:1em;">
          <el-input placeholder="Instance name" v-model="instance"></el-input>
        </div>
        <div style="margin-top:1em;">
          <el-input placeholder="Version" v-model="version"></el-input>
        </div>
        <div style="margin-top:1em;">
          <el-button :disabled="!config_valid" type="primary" @click="save_update">Save/update</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      config_valid: Boolean,
      instance_id: String,
      instance: String,
      version: String,
    },
    methods: {
      save_update() {
        this.$emit('save_config');
      },
    },
  });
</script>
