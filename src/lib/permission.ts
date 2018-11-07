import { standard_handler } from '@/lib/standard_handler';

export async function create({user_id,value,instance_id}: any) {
    const options = {
        method: 'post',
        data: {
            instance_id,
            value,
           user_id
        },
        url: `/permission`,
    };

    const res = await standard_handler(options);
    return res.data;
}

export async function remove({user_id,value,instance_id}: any) {
    const options = {
        method: 'delete',
        data: {
            instance_id,
            value,
            user_id
        },
        url: `/permission`,
    };

    const res = await standard_handler(options);
    return res.data;
}

export async function get_user_permissions(instance_id:any,user_id:any) {
    const options = {
        method: 'get',
        url: `permission/${user_id}/:${instance_id}`,
    };

    const res = await standard_handler(options);
    return res.data;
}



