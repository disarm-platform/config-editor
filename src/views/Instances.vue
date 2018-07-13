<template>
  <div style="height: 500px;">
    <p>Please select an instance below or create a new one:</p>

    <h3>Select instance</h3>


    <el-select v-model="local_selected_instance" filterable placeholder="Select instance" no-match-text="No instances found">
      <el-option
        v-for="item in configs"
        :key="item.id"
        :label="item.id"
        :value="item.id">
      </el-option>
    </el-select>

    <el-button :disabled="!local_selected_instance" type="primary" style="margin-left: 1em;" @click="set_config">Select</el-button>

    <div style="margin: 2em 0;">

      <h3>Create new instance</h3>
      
      <el-form :inline="true">
        <el-form-item>
          <el-input type="text" placeholder="Instance name" v-model="new_instance_name" >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"  @click="create_new_config">Create new config</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
// @ts-ignore
import { login } from '../lib/auth';
import { get_configurations } from '../lib/config';
import { set_api_key } from '../lib/standard_handler';

export default Vue.extend({
  data() {
    return {
      local_selected_instance: '',
      new_instance_name: '',
      error: '',
      configs: [],
    };
  },
  computed: {
    instance(): any {
      return this.$store.state.instance;
    },
    config(): any {
      return this.$store.state.config;
    },
    creating_new_config(): any {
      return this.$store.state.creating_new_config;
    },
  },
  mounted() {
    this.get_list_of_configurations();
    if (this.creating_new_config && this.config) {
      this.new_instance_name = this.config.config_id;
    }
  },
  methods: {
    create_new_config() {
      const new_config = {
        config_id: this.new_instance_name,
        config_version: '1',
        map_focus: {
          centre: {},
        },
        applets: {
          irs_record_point: {
            metadata: {},
          },
          meta: {},
        },
        instance: {
          slug: this.new_instance_name,
        },
      };
      this.$store.commit('set_creating_new_config', true);
      this.$store.commit('set_config', new_config);
    },
    set_local_selected_instance(config: any) {
      this.local_selected_instance = config;
    },
    set_config() {
      const found = this.configs.find((c: any) => c.id === this.local_selected_instance)

      this.$store.commit('set_creating_new_config', false);
      this.$store.commit('set_instance', found);
    },
    async get_list_of_configurations() {
      try {
        const configs = await get_configurations();
        this.configs = configs.map((a: any) => {
          a.id = `${a.config_id}@${a.config_version}`;
          return a;
        }).sort((a: any, b: any) => {
          if (a.id < b.id) { return -1; }
          if (a.id > b.id) { return 1; }
          return 0;
        });
      } catch (e) {
        this.error = e.message;
      }
    },
  },
});
</script>
<style lang="scss">
  
</style>
