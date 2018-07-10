import axios from 'axios'
import COMMON from './config'

export const standard_handler = axios.create({
  baseURL: COMMON.api_url,
  params: {
    country: 'app',
  },
});

standard_handler.interceptors.response.use((response) => {
  return response;
});

export function set_api_key(api_key: string) {
  standard_handler.defaults.headers = {
    'API-Key': api_key,
  }
}