/** @type {Function} */
import dvaModelExtend from 'dva-model-extend';

import { commonModel } from '@/models/common.model';
import { monitorHistory } from '@/utils/history';

const MODEL_NAME = 'productModel';

const DEFAULT_STATE = {
  products: [],
  selectedProduct: null
};

/**
 * @export
 */
export default dvaModelExtend(commonModel, {
  namespace: MODEL_NAME,
  state: {
    ...DEFAULT_STATE
  },

  subscriptions: {
    setupHistory({ history, dispatch }) {
      return monitorHistory({ history, dispatch }, MODEL_NAME);
    },
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    }
  },

  effects: {

    * query({ payload }, { put, select }) {
      // TODO: Do something.
    },

    * getProduct({ payload }, {put}) {
      const {productId} = payload;

      if (productId === 'new') {
        return yield put({
          type: 'updateState',
          payload: {
            selectedProduct: {
              title: 'New'
            }
          }
        });
      }


    }
  },

  reducers: {}
});
