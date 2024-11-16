import { connect } from '@umijs/max';

import Config from './config';

const MODEL_NAME = 'cardModel';

/**
 * @constant
 * @param productModel
 * @param loading
 * @return {{appModel, loading}}
 */
const mapStateToProps = ({ cardModel, loading }) => ({
  cardModel,
  loading
});

/**
 * @constant
 * @param dispatch
 * @return {{onUpdateDocumentMeta(*): void, dispatch, onDefineAbilities(): void, onNotification(): void}}
 */
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onChangeGrid(grid) {
    dispatch({
      type: `${MODEL_NAME}/changeGrid`,
      payload: { grid }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);
