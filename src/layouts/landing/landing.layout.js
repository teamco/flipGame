import React, { Suspense } from 'react';
import { Outlet, Helmet } from '@umijs/max';
import { FloatButton, Form, Layout } from 'antd';

import Loader from '@/components/Loader';

import styles from './landing.layout.module.less';

const { Content } = Layout;

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export const LandingLayout = (props) => {
  const { appModel, loading } = props;

  const {
    language = 'en-US',
    meta
  } = appModel;

  let title = meta?.name;
  if (meta?.title) {
    title = `${title} ${meta?.title}`;
  }

  const content = (
    <Layout style={{ minHeight: '100vh' }} key={language}>
      <Layout className={styles.siteLayout}>
        <Content>
          <Form.Provider>
            <div className={styles.siteLayoutContent}>
              <Suspense
                fallback={
                  <Loader
                    fullScreen
                    spinning={loading.effects['appModel/query']}
                  />
                }
              >
                <Outlet />
              </Suspense>
              <FloatButton.BackTop />
            </div>
          </Form.Provider>
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <div className={styles.landing}>
      <Helmet>
        <meta charSet={meta.charSet} />
        <title>{title}</title>
      </Helmet>
      {content}
    </div>
  );
};
