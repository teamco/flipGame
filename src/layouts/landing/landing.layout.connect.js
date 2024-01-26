import { connect } from '@umijs/max';

import { LandingLayout } from './landing.layout';

const MODEL_NAME = 'appModel';

/**
 * @constant
 * @param appModel
 * @param authModel
 * @param loading
 * @return {{authModel, appModel, loading}}
 */
const mapStateToProps = ({ appModel, authModel, loading }) => ({
  appModel,
  authModel,
  loading
});

/**
 * @constant
 * @param dispatch
 * @return {{onUpdateDocumentMeta(*): void, dispatch, onDefineAbilities(): void, onNotification(): void}}
 */
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onDefineAbilities() {
    dispatch({ type: `authModel/defineAbilities` });
  },
  onNotification() {
  },
  onUpdateDocumentMeta(meta) {
    dispatch({ type: 'appModel/updateDocumentMeta', payload: { meta } });
  },
  onUpdateMessages(translateMessages) {
    dispatch({ type: `${MODEL_NAME}/updateMessages`, payload: { translateMessages, MODEL_NAME } });
  },
  onOnline(isOnline) {
    dispatch({ type: `${MODEL_NAME}/handleOnline`, payload: { isOnline } });
  },
  onSignIn(user) {
    dispatch({ type: 'authModel/signIn', payload: { user } });
  },
  onRefreshSignIn() {
    // TODO
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingLayout);
