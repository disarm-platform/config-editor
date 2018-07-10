<template>
  <div>
    <p>Please select your instance below or create a new one:</p>
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue'
  import { login } from '../lib/auth'
  import { get_configurations } from '../lib/config'
  import { set_api_key } from '@/lib/standard_handler';
  import semver_compare from 'semver-compare'

  export default Vue.extend({
    data() {
      return {
        error: '',
        
      }
    },
    created() {
      this.get_list_of_configurations()
    },
    methods: {
      async get_list_of_configurations() {
        try {
          const configs = await get_configurations()
          const u = this.get_unique_instances_from_configs(configs)
          const a = this.get_latest_version_of_instances(u)
          // console.log('configs', configs);
        } catch (e) {
          this.error = e.message
        }
      },
      get_unique_instances_from_configs(configs: Array<any>) {
        const grouped = configs.reduce((acc: any, config: any) => {
          if (acc.hasOwnProperty(config.config_id)) {
            acc[config.config_id].push(config)
          } else {
            acc[config.config_id] = [config]
          }
          return acc
        }, {})
        console.log('grouped', grouped);
        return grouped
      },
      get_latest_version_of_instances(grouped_instances: any) {
        const instances = []

        for (const instance_name in grouped_instances) {
          const list_of_instances = grouped_instances[instance_name]

          const sorted = list_of_instances.sort((a, b) => semver_compare(a.config_version, b.config_version))

          instances.push(sorted[sorted.length - 1])
        }
        console.log('instances', instances);
        return instances
      }
    }
  })
</script>

<style lang="scss">
  
</style>
