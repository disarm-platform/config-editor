import { standard_handler } from '@/lib/standard_handler';

export async function create_user(user_data: any) {
  const options = {
    method: 'post',
    data: {
      user_data,
    },
    url: '/user',
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_users() {
  const options = {
    method: 'get',
    url: '/user',
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function update_user(id: string, user_data:any) {
    const options = {
      method: 'post',
      url: `/user/${id}`,
      data:{
          user_data
      }
    };
  
    const res = await standard_handler(options);
    return res.data;
  }

  export async function delete_user(id: string) {
    const options = {
      method: 'delete',
      url: `/user/${id}`,
    };
  
    const res = await standard_handler(options);
    return res.data;
  }

export async function get_user(id: string) {
  const options = {
    method: 'get',
    url: `/user/${id}`,
  };

  const res = await standard_handler(options);
  return res.data;
}
