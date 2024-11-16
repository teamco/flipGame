import { connect } from '@umijs/max';

import Cards from './cards';

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
  onCardSelect(card) {
    dispatch({
      type: `${MODEL_NAME}/cardSelect`,
      payload: { card }
    });
  },
  onClearSelected() {
    dispatch({ type: `${MODEL_NAME}/clearSelected` });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
