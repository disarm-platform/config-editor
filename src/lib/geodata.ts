import {standard_handler} from './standard_handler'

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