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

export async function get_permissions() {
    const options = {
        method: 'get',
        url: `permission/`,
    };

    const res = await standard_handler(options);
    return res.data;
}



