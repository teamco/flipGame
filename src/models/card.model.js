/** @type {Function} */
import dvaModelExtend from 'dva-model-extend';

import { commonModel } from '@/models/common.model';

import { monitorHistory } from '@/utils/history';
import { shuffle } from '@/utils/array';
import { uuid } from '@/utils/common';

import { delayEffect } from '@/services/common.service';

const MODEL_NAME = 'cardModel';

const DEFAULT_STATE = {
  selected: [],
  completed: [],
  assignedCards: [],
  assets: [],
  selectedGrid: 5,
  cardOpts: [],
  steps: 0,
  spinning: false
};

const MIN_CARDS = 2;

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
      const { selectedGrid } = yield select(state => state[MODEL_NAME]);

      const _assets = [];
      for (let i = 0; i < 50; i++) {
        const url = require(`@/pages/cards/assets/image-${i + 1}.jpg`);
        _assets.push({ id: uuid(), url });
      }

      const cardOpts = _assets.
          map((_, idx) => {
            const _startFrom = idx + MIN_CARDS;
            return { value: _startFrom, label: `${_startFrom * 2} Cards` };
          });

      cardOpts.splice(_assets.length - MIN_CARDS + 1, MIN_CARDS);

      yield put({
        type: 'updateState',
        payload: {
          cardOpts,
          assets: [..._assets]
        }
      });

      yield put({
        type: 'changeGrid',
        payload: { grid: selectedGrid }
      });
    },

    * cardSelect({ payload }, { put, select, call }) {
      const {
        steps,
        selected = [],
        completed = []
      } = yield select(state => state[MODEL_NAME]);

      const { card } = payload;

      const _prev = selected[selected.length - 1];

      if (_prev && _prev.id === card.id && _prev.idx !== card.idx) {

        return yield put({
          type: 'updateState',
          payload: {
            steps: steps + 1,
            spinning: false,
            selected: [],
            completed: [
              ...completed,
              card.id
            ]
          }
        });
      }

      yield put({
        type: 'updateState',
        payload: {
          steps: steps + 1,
          spinning: !!selected.length,
          selected: [
            ...selected,
            card
          ]
        }
      });
    },

    * changeGrid({ payload }, { put, select }) {
      const { assets = [] } = yield select(state => state[MODEL_NAME]);

      const { grid } = payload;
      const assignedCards = Array.from(assets).splice(0, grid);

      yield put({
        type: 'updateState',
        payload: {
          steps: 0,
          selected: [],
          completed: [],
          selectedGrid: grid,
          assignedCards: shuffle([
            ...assignedCards,
            ...assignedCards
          ])
        }
      });
    },

    * clearSelected({ payload }, { put, select, call }) {
      const { selected = [] } = yield select(state => state[MODEL_NAME]);

      if (selected.length >= 2) {
        yield put({ type: 'updateState', payload: { spinning: true } });
        yield call(delayEffect, 2000);
        yield put({
          type: 'updateState',
          payload: {
            spinning: false,
            selected: []
          }
        });
      }
    }
  },

  reducers: {}
});
