import React from 'react';
import { Spin } from 'antd';
import classnames from 'classnames';

import { isSpinning } from '@/utils/state';

import ModelLoader from './ModelLoader';

import styles from './loader.less';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Loader = (props) => {
  const {
    spinning = false,
    loading,
    spinOn = [],
    children,
    className,
    wrapperClassName
  } = props;

  const _spinning = spinning || isSpinning(loading, spinOn);
  const _className = classnames(styles.loader, className, {
    [styles.fullScreen]: !children && _spinning
  });

  return (
      <div className={_className}>
        <Spin wrapperClassName={wrapperClassName}
              spinning={_spinning}
              tip={children ? (
                  <ModelLoader loading={loading}
                               spinOn={spinOn}/>
              ) : null}>
          {children}
        </Spin>
      </div>
  );
};

export default Loader;
