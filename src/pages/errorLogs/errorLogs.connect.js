import { connect } from '@umijs/max';

import { errorLogs } from './errorLogs';

export default connect(
    ({ authModel, errorModel, loading }) => {
      return {
        authModel,
        errorModel,
        loading
      };
    },
    (dispatch) => ({
      dispatch,
      onQuery() {
        dispatch({ type: `errorLogModel/query` });
      }
    })
)(errorLogs);
