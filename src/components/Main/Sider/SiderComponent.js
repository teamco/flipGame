import React, { useState } from 'react';
import classnames from 'classnames';
import { Layout, Spin } from 'antd';

import { effectHook } from '@/utils/hooks';
import { SiderLayout } from '@/components/Main/Sider/SiderLayout';

import styles from '@/components/Main/Sider/sider.module.less';

const { Sider } = Layout;

/**
 * @constant
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const SiderComponent = props => {
  const {
    name,
    position = 'absolute',
    layoutable = false,
    resizeable = false,
    collapsible = false,
    collapsed,
    onCollapse,
    loading,
    size,
    model,
    className,
    defaultDims = {
      min: 80,
      max: 200
    }
  } = props;

  const [dim, setDim] = useState(size.width || size.height);
  const [spinning, setSpinning] = useState(true);
  const [isCollapsed, setCollapsed] = useState(typeof collapsed === 'undefined' ? true : collapsed);

  const handleCollapse = (value) => {
    if (collapsible) {
      setCollapsed(value);
      setDim(value ? defaultDims.min : defaultDims.max);
    }
  };

  effectHook(() => {
    if (collapsible) {
      // TODO: Do something.
    } else if (resizeable) {
      setDim(size.width || size.height);
    } else {
      setDim(defaultDims.max);
    }

    setSpinning(false);
  }, [size]);

  return (
      <Sider width={dim}
             collapsible={resizeable ? false : collapsible}
             collapsed={isCollapsed}
             onCollapse={(value) => {
               handleCollapse(value);
               onCollapse(value);
             }}
             className={classnames(className, resizeable ? null : styles[position])}>
        {layoutable ? (
            <SiderLayout onClose={props.onClose}
                         onReload={props.onReload}
                         name={name}
                         loading={loading}
                         header={props.header}
                         footer={props.footer}>
              <Spin spinning={spinning}>
                {props.render()}
              </Spin>
            </SiderLayout>
        ) : props.render()}
      </Sider>
  );
};