import { routerRedux } from 'dva/router';
import { login } from '../service';
import { message } from 'antd';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    user: {},
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/login') {
          $$.removeStore("user");
        }
      });
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { msgCode } = yield call(login, payload)
      if (msgCode === 0) {
        $$.setStore('user', payload);
        yield put({
          type: 'loginSuccess',
          payload: payload,
        })
        yield put(routerRedux.push('/'));
      } else {
        return message.error('密码错误');
      }
    },
    *logout(_, { put }) {

    },
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
      };
    }
  },
};