import { connect } from '@umijs/max';
import { LandingPage } from './landing.page.layout';

export default connect(
    ({ landingModel, appModel, authModel, loading }) => ({
      landingModel,
      appModel,
      authModel,
      loading
    }),
    (dispatch) => ({
      dispatch,
      onSignOut() {
        dispatch({ type: 'authModel/signOut' });
      },
      onChangeLang(locale, setLocale) {
        dispatch({ type: 'landingModel/changeLang', payload: { locale, setLocale } });
      }
    })
)(LandingPage);
