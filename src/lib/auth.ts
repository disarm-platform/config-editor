import { DoumaUser } from '@locational/douma-types/main';
import { standard_handler } from '../lib/standard_handler';

export async function login(username: string, password: string): Promise<DoumaUser> {
  const options = {
    url: `/login`,
    method: 'post',
    data: {
      username,
      password,
    },
  };
  const res = await standard_handler(options);
  return res.data;
}
