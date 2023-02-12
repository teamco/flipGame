import { connect } from '@umijs/max';
import { Page } from './page';

const MODEL_NAME = 'pageModel';

export default connect(
    ({ pageModel, loading }) => ({ pageModel, loading }),
    (dispatch) => ({
      dispatch,
      onQuery() {
        dispatch({ type: `${MODEL_NAME}/query` });
      }
    })
)(Page);