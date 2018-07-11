<template>
  <div style="height: 400px;">
    <p>Please select an instance below or create a new one:</p>

    <h3>Select instance</h3>

    <multiselect :value="instance" @input="set_config" track-by="id" label="id" placeholder="Select an instance" :options="configs" :searchable="false" :allow-empty="false"></multiselect>


    <div style="margin: 2em 0;">

      <h3>Create new instance</h3>

      <el-input type="text" v-model="new_instance_name" style="margin-bottom: 1em;">
        <span slot="prepend">Instance name</span>
      </el-input>

      <el-button type="primary" style="margin-bottom: 1em;" @click="create_new_config">Create new config</el-button>

    </div>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue'
  // @ts-ignore
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
      instance(): any {
        return this.$store.state.instance
      },
      config(): any {
        return this.$store.state.config
      },
      creating_new_config(): any {
        return this.$store.state.creating_new_config
      }
    },
    mounted() {
      this.get_list_of_configurations()
      if (this.creating_new_config && this.config) {
        this.new_instance_name = this.config.config_id
      }
    },
    methods: {
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
        }
        this.$store.commit('set_creating_new_config', true)
        this.$store.commit('set_config', new_config)
      },
      set_config(config: any) {
        this.$store.commit('set_creating_new_config', false)
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
