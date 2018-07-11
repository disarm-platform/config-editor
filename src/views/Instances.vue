<template>
  <div style="height: 400px;">
    <p>Please select your instance below or create a new one:</p>

    <multiselect :value="config" @input="set_config" track-by="id" label="id" placeholder="Select an instance" :options="configs" :searchable="false" :allow-empty="false"></multiselect>


    <div style="margin: 2em 0;">

      <el-input type="text" v-model="new_instance_name">
        <span slot="prepend">Instance name</span>
      </el-input>

      <el-button type="primary" style="margin-bottom: 1em;" @click="create_new_config">Create new config</el-button>

    </div>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue'
  import Multiselect from 'vue-multiselect'
  import { login } from '../lib/auth'
  import { get_configurations } from '../lib/config'
  import { set_api_key } from '../lib/standard_handler';
  import { get_latest_configs } from '../helpers/get_latest_configs'

  export default Vue.extend({
    components: {Multiselect},
    data() {
      return {
        new_instance_name: '',
        error: '',
        configs: []
      }
    },
    computed: {
      config() {
        return this.$store.state.instance
      }
    },
    created() {
      this.get_list_of_configurations()
    },
    methods: {
      create_new_config() {
        const empty_config = {
          new_instance: true,
          config_id: this.new_instance_name,
          config_version: "1"
        }

        this.$store.commit('set_config', empty_config)
      },
      set_config(config: any) {
        console.log('config', config);
        this.$store.commit('set_instance', config)
      },
      async get_list_of_configurations() {
        try {
          const configs = await get_configurations()
          // @ts-ignore
          this.configs = get_latest_configs(configs).map(a => {
            a.id = `${a.config_id}@${a.config_version}`
            return a
          })
        } catch (e) {
          this.error = e.message
        }
      }
    }
  })
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  
</style>
