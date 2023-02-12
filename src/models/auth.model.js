/** @type {Function} */
import dvaModelExtend from 'dva-model-extend';
import { history } from '@umijs/max';

import { commonModel } from '@/models/common.model';
import { defineAbilityFor } from '@/utils/auth/ability';
import { monitorHistory } from '@/utils/history';

const MODEL_NAME = 'authModel';

const DEFAULT_STATE = {
  user: null,
  ability: null
};

/**
 * @export
 * @default
 */
export default dvaModelExtend(commonModel, {
  namespace: MODEL_NAME,
  state: {
    ...DEFAULT_STATE
  },
  subscriptions: {
    setupHistory({ history, dispatch }) {
      monitorHistory({ history, dispatch }, MODEL_NAME);

      return history.listen(data => {
        // In case of route replace
        const location = data.pathname ? { ...data } : { ...data.location };

        dispatch({ type: 'updateState', payload: { location } });
      });
    },

    setup({ dispatch }) {
      // TODO: Do something.
    }
  },

  effects: {

    * defineAbilities({ payload = {} }, { call, put, select }) {
      const { user } = yield select(state => state[MODEL_NAME]);

      const ability = yield call(defineAbilityFor, { user });

      yield put({ type: 'updateState', payload: { ability } });
    },

    * resetAuthState(_, { call, put }) {
      const ability = yield call(defineAbilityFor, { user: null });

      yield put({
        type: 'updateState',
        payload: {
          ...DEFAULT_STATE,
          ability
        }
      });
    }
  },

  reducers: {}
});
