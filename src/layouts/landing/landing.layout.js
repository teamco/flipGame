import React, { Suspense } from 'react';
import { Outlet } from '@umijs/max';
import { Helmet } from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { FloatButton, Form, Layout } from 'antd';
import ReactInterval from 'react-interval';
import { useScrollIndicator } from 'react-use-scroll-indicator';

import Loader from '@/components/Loader';
import { AbilityContext } from '@/utils/auth/can';
import { effectHook } from '@/utils/hooks';

import { locales } from '@/locales';

import styles from './landing.layout.module.less';

const { Content } = Layout;

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export const LandingLayout = (props) => {
  const {
    appModel,
    authModel,
    loading,
    onNotification,
    onRefreshSignIn,
    onUpdateMessages,
    onOnline,
    onDefineAbilities
  } = props;

  const {
    language = 'en-US',
    meta,
    location,
    interval: { timeout, enabled }
  } = appModel;

  const { user, ability } = authModel;

  const messages = locales[`${language}`] || {};

  effectHook(() => {
    onDefineAbilities();
  }, [user]);

  let title = meta?.name;
  if (meta?.title) {
    title = `${title} ${meta?.title}`;
  }

  effectHook(() => {
    onUpdateMessages(messages);
  });

  const [state] = useScrollIndicator();

  const progress = state?.value;

  const content = (
      <Layout style={{ minHeight: '100vh' }} key={language}>
        <Layout className={styles.siteLayout}>
          <Content>
            <Form.Provider>
              <div className={styles.siteLayoutContent}>
                <Suspense fallback={<Loader fullScreen spinning={loading.effects['appModel/query']}/>}>
                  <Outlet/>
                </Suspense>
                <FloatButton.BackTop/>
              </div>
            </Form.Provider>
          </Content>
        </Layout>
      </Layout>
  );

  return ability ? (
      <AbilityContext.Provider value={ability}>
        <IntlProvider locale={language}
                      messages={messages}>
          <div className={styles.landing}>
            <Helmet>
              <meta charSet={meta.charSet}/>
              <title>{title}</title>
            </Helmet>
            <ReactInterval timeout={timeout}
                           enabled={enabled}
                           callback={onNotification}/>
            <div className={styles.progress}
                 style={{ width: `${progress}%` }}/>
            {content}
          </div>
        </IntlProvider>
      </AbilityContext.Provider>
  ) : (
      <Loader fullScreen spinning={true}/>
  );
};
