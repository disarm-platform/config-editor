import {standard_handler} from '@/lib/standard_handler';

export async function create_level(instance: string, level: string, geojson: any) {
  const options = {
    url: `/geodata/${instance}/${level}`,
    method: 'post',
    data: {
      ...geojson,
    },
  };
  const res = await standard_handler(options);
  return res.data;
}

export async function get_levels(instance: string) {
  const options = {
    url: `/geodata/${instance}`,
  };
  const res = await standard_handler(options);
  return res.data;
}

export async function get_level(instance: string, level: string) {
  const options = {
    url: `/geodata/${instance}/${level}`,
  };
  const res = await standard_handler(options);
  return res.data;
}
