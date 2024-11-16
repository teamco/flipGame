import React from 'react';
import { Layout, Spin } from 'antd';
import classnames from 'classnames';

import Page403 from '@/pages/403';

import { isSpinning } from '@/utils/state';
import { effectHook } from '@/utils/hooks';
import { prettifyCamelCase } from '@/utils/string';
import { Can } from '@/utils/auth/can';

import styles from '@/components/Page/page.module.less';

const { Content } = Layout;

/**
 * @function
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export function Page(props) {
  const {
    pageModel,
    loading,
    spinEffects = [],
    ableFor = 'read',
    className,
    component,
    touched,
    onQuery
  } = props;

  const { gridLayout } = pageModel;

  effectHook(() => {
    onQuery();
  });

  const spinning = isSpinning(loading, spinEffects);

  return (
      <Layout className={classnames(styles.layout)}>
        <Layout className={'site-layout'}>
          <Content className={classnames(styles.page, className, styles[gridLayout ? 'grid' : 'card'])}>
            <Spin spinning={!!spinning} tip={spinning && (
                <div className={styles.spinner}>
                  {spinning.effects.map((effect, idx) => (
                      <div key={idx}>
                        {prettifyCamelCase(effect.replace(/\w+Model\//, ''))}
                      </div>
                  ))}
                </div>
            )}>
              <div className={styles.pageContent}>
                {props.children}
              </div>
            </Spin>
          </Content>
        </Layout>
      </Layout>
  );
}