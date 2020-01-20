import { stringify } from 'qs';
import rq from '../../../utils/request.js';

export async function login(params) {
  return rq(`/proxy/userService/login?${stringify(params)}`);
}
