<template>
  <div style="height: 500px;">
    <p>Please select an instance below or create a new one:</p>

    <h3>Select instance</h3>

<el-row :gutter="20">
   <el-col :span="6">
    <el-select v-model="local_selected_instance" filterable placeholder="Select instance" no-match-text="No instances found">
      <el-option
        v-for="item in instances"
        :key="item.id"
        :label="item.id"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button :disabled="!local_selected_instance" type="primary" style="margin-left: 1em;" @click="load_instance_configs">Select</el-button>
   </el-col>
 <el-col :span="6" v-if="local_selected_instance">
    <el-select v-model="selected_config" filterable placeholder="Select Config" no-match-text="No configs found">
      <el-option
        v-for="item in instance_configs_list"
        :key="item.id"
        :label="item.id"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button :disabled="!local_selected_instance" type="primary" style="margin-left: 1em;" @click="select_instance_config">Select</el-button>
 </el-col>
</el-row>

    <div style="margin: 2em 0;">

      <h3>Create new instance</h3>
      
      <el-form :inline="true">
        <el-form-item>
          <el-input type="text" placeholder="Instance name" v-model="new_instance_name" >
            <el-button slot="append" type="primary"  @click="create_new_instance">Create new Instance</el-button>
          </el-input>
        </el-form-item>

        <el-form-item>

        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
// @ts-ignore
import { login } from "../lib/auth";
import { get_configurations } from "../lib/config";
import { set_api_key } from "../lib/standard_handler";
import { geodata_cache } from "@/geodata_cache";

export default Vue.extend({
  data() {
    return {
      local_selected_instance: "",
      new_instance_name: "",
      selected_config: {},
      error: "",
      instances: [],
      instance_configs_list: [{}]
    };
  },
  computed: {
    instance(): any {
      return this.$store.state.instance_id_and_version;
    },
    config(): any {
      return this.$store.state.applets_config;
    },
    creating_new_config(): any {
      return this.$store.state.creating_new_config;
    }
  },
  mounted() {
    this.get_list_of_configurations();
    this.load_instances();
    if (this.creating_new_config && this.config) {
      this.new_instance_name = this.config.config_id;
    } else if (this.instance) {
      this.local_selected_instance = this.instance.id;
    }
  },
  methods: {
    async create_new_instance() {
      console.log(
        `TODO: POST the new instance data say to /instance${{
          name: this.new_instance_name
        }}`
      );
    },
    async load_instances() {
      console.log("//TODO Get instances from /instace");
      //TODO instaces = insatnces_loaded from /instance
      //for now
    },
    async load_instance_configs(instance_id: string) {
      console.log("//TODO Get instance configs from /config");
      //TODO instaces =  from /config
      //for now
      this.instance_configs_list = [
        { version: "1", id: "8713786" },
        { version: "2", id: "87786" }
      ];  
    },
    select_instance_config(){
      console.log(`GET /configs/${this.selected_config}`)
    },
    create_new_config() {
      const new_config = {
        config_id: this.new_instance_name,
        config_version: "1",
        map_focus: {
          centre: {}
        },
        applets: {
          irs_record_point: {
            metadata: {}
          },
          meta: {}
        },
        instance: {
          slug: this.new_instance_name
        }
      };

      this.reset_geodata_cache();
      this.$store.commit("reset_validation_result");
      this.$store.commit("reset_validation_status");
      this.$store.commit("set_creating_new_config", true);
      this.$store.commit("set_applets_config", new_config);
      this.$store.commit("set_instance_id_and_version", null);
    },
    set_local_selected_instance(config: any) {
      this.local_selected_instance = config;
    },
    set_applets_config() {
      const found = this.instances.find(
        (c: any) => c.id === this.local_selected_instance
      );

      this.reset_geodata_cache();
      this.$store.commit("reset_validation_result");
      this.$store.commit("reset_validation_status");
      this.$store.commit("set_creating_new_config", false);
      this.$store.commit("set_instance_id_and_version", found);
    },
    reset_geodata_cache() {
      for (const key in geodata_cache) {
        if (geodata_cache[key]) {
          delete geodata_cache[key];
        }
      }
    }
  }
});
</script>
<style lang="scss">
</style>
