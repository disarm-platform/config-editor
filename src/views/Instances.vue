<template>
  <div style="height: 400px;">
    <p>Please select your instance below or create a new one:</p>

    <multiselect v-model="config" track-by="id" label="id" placeholder="Select an instance" :options="configs" :searchable="false" :allow-empty="false">
    </multiselect>
  
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
        error: '',
        config: null,
        configs: []
      }
    },
    created() {
      this.get_list_of_configurations()
    },
    methods: {
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
