import { standard_handler } from '@/lib/standard_handler';

export async function create_configuration(config_data: any, instance_id: any) {
  const options = {
    method: 'post',
    data: {
      ...config_data,
    },
    url: `/config/${instance_id}`,
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_configurations(instance_id:any) {
  const options = {
    method: 'get',
    url: `/instance/${instance_id}/published_instanceconfigs`
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_configuration(id: string) {
  const options = {
    method: 'get',
    url: `/config/${id}`,
  };

  const res = await standard_handler(options);
  return res.data;
}
