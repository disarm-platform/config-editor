// @ts-ignore
import semver_compare from 'semver-compare'

export function get_latest_configs(configs: any) : any[] {
  const grouped = get_unique_instances_from_configs(configs);
  return get_latest_version_of_instances(grouped);
} 


function get_unique_instances_from_configs(configs: any) {
  const grouped = configs.reduce((acc: any, config: any) => {
    if (acc.hasOwnProperty(config.config_id)) {
      acc[config.config_id].push(config)
    } else {
      acc[config.config_id] = [config]
    }
    return acc
  }, {})
  return grouped
}


function get_latest_version_of_instances(grouped_instances: any): any[] {
  const instances = []
  //@ts-ignore
  for(const instance_name in grouped_instances) {
    //@ts-ignore
    const list_of_instances = grouped_instances[instance_name]

    const sorted = list_of_instances.sort((a, b) => semver_compare(a.config_version, b.config_version))

    instances.push(sorted[sorted.length - 1])
  }
  return instances
}