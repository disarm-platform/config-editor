import { standard_handler } from '@/lib/standard_handler';

export async function get_configurations() {
  const options = {
    method: 'get',
    url: '/config'
  }

  const res = await standard_handler(options)
  return res.data;
}