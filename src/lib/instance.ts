import {standard_handler} from '@/lib/standard_handler';

export async function create_new_instance(instance_data: any) {
    const options = {
        method: 'post',
        data: instance_data,
        url: '/instances'
    }
    const res = await standard_handler(options)
    return res.data()
}

export async function get_instances(){
    const options = {
        method: 'get',
        url: '/instances'
    }
    const res = await standard_handler(options)
    return res.data()
}

export async function get_instance(instance_id: any){

}

export async function delete_instance(instance_id: any){

}