import { connect } from '@umijs/max';

import { LandingLayout } from './landing.layout';

const MODEL_NAME = 'appModel';

/**
 * @constant
 * @param appModel
 * @param loading
 * @return {{appModel, loading}}
 */
const mapStateToProps = ({ appModel, loading }) => ({
  appModel,
  loading
});

/**
 * @constant
 * @param dispatch
 * @return {{onUpdateDocumentMeta(*): void, dispatch, onDefineAbilities(): void, onNotification(): void}}
 */
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onUpdateDocumentMeta(meta) {
    dispatch({ type: 'appModel/updateDocumentMeta', payload: { meta } });
  },
  onOnline(isOnline) {
    dispatch({ type: `${MODEL_NAME}/handleOnline`, payload: { isOnline } });
  },
  onRefreshSignIn() {
    // TODO
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingLayout);
