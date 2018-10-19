import { standard_handler } from '@/lib/standard_handler';

export async function create_user(user_data: any, instance_id:string) {
  const options = {
    method: 'post',
    data: {
      ...user_data,
        instance_id
    },
    url: `/user`,
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function get_users(instance_id:any) {
  const options = {
    method: 'get',
    url: `/user?instance_id=${instance_id}`,
  };

  const res = await standard_handler(options);
  return res.data;
}

export async function update_user(id: string, user_data:any) {
    const options = {
      method: 'put',
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
