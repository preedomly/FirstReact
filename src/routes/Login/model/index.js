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
      const data = { userName: 'luohq', password: '123456',name: '罗宝宝' };
      if (payload.userName === 'luohq') {
        $$.setStore('user', data);
        yield put({
          type: 'loginSuccess',
          payload: data
        });
        yield put(routerRedux.push('/'));
        return true;
      }
      // const { msgCode } = yield call(login, payload)
      // if (msgCode === 0) {
      //   $$.setStore('user', data);
      //   yield put({
      //     type: 'loginSuccess',
      //     payload: data
      //   })
      //   yield put(routerRedux.push('/'));
      // } else {
      //   return message.error('密码错误');
      // }
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