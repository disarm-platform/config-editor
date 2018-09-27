import { standard_handler } from '@/lib/standard_handler';

export async function create_instance(instance_data: any) {
  const options = {
    method: 'post',
    data: {
      instance_data,
    },
    url: '/instance',
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_instances() {
  const options = {
    method: 'get',
    url: '/instance',
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_instance(id: string) {
  const options = {
    method: 'get',
    url: `/instance/${id}`,
  };

  const res = await standard_handler(options);
  return res.data;
}
