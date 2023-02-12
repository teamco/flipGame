import React from 'react';
import { Result } from 'antd';
import classnames from 'classnames';

import LandingPage from '@/layouts/landing/page';
import BackButton from '@/components/Buttons/back.button';

import { effectHook } from '@/utils/hooks';
import { logger } from '@/utils/console';

import styles from './error.module.less';

/**
 * @export
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const ErrorPage = props => {
  const {
    component,
    errorModel,
    isLanding = false,
    title,
    status,
    className,
    spinOn = [],
    onQuery
  } = props;

  const { errors = [] } = errorModel;

  const MODEL_NAME = 'errorModel';

  const _error = (
      <div className={styles.errorFlexCenter}>
        <Result status={status}
                title={title}
                className={classnames(styles[component], className, 'demo')}/>
        <BackButton/>
      </div>
  );

  effectHook(() => {
    errors.length && logger({ type: 'warn', log: errors });
  }, [errors]);

  effectHook(() => {
    onQuery({ status, title });
  });

  if (isLanding) {
    return (<LandingPage spinEffects={[`${MODEL_NAME}/query`, ...spinOn]}>{_error}</LandingPage>);
  }

  return _error;
};
