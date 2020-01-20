import { queryNav } from '../service';
import { message } from 'antd';

export default {
  namespace: 'home',

  state: {
    Navigation: [],
  },

  effects: {
    *queryNav({ payload, callback }, { call, put }) {
      const res = yield call(queryNav);
      if (res.msgCode !== 0) return message.error('导航栏查询失败');
      yield put({
        type: 'saveNavigation',
        payload: res.data
      });
      callback && callback(res.data);
    }
  },

  reducers: {
    saveNavigation(state, { payload }) {
      return {
        ...state,
        Navigation: payload,
      };
    },
  },
};