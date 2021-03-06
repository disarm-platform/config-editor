import { standard_handler } from '@/lib/standard_handler';

export async function create_configuration(config_data: any) {
  const options = {
    method: 'post',
    data: {
      config_data,
    },
    url: '/config',
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_configurations() {
  const options = {
    method: 'get',
    url: '/config',
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
