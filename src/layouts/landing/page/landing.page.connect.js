import { connect } from '@umijs/max';
import { LandingPage } from './landing.page.layout';

export default connect(
    ({ landingModel, appModel, loading }) => ({
      landingModel,
      appModel,
      loading
    }),
    (dispatch) => ({
      dispatch
    })
)(LandingPage);
