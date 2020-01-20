import { stringify } from 'qs';
import rq from '../../../utils/request.js';

export async function queryNav() {
  return rq(`/proxy/Navigation/queryNav`);
}
