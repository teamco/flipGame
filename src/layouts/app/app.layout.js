import React, { Suspense, useState } from 'react';
import { Outlet, Helmet } from '@umijs/max';
import { Form, Layout } from 'antd';

import Page404 from '@/pages/404';
import LandingPage from '@/layouts/landing/page/landing.page.connect';

import Loader from '@/components/Loader';
import Main from '@/components/Main';

import { effectHook } from '@/utils/hooks';

import './app.layout.module.less';

const { Content } = Layout;

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export const AppLayout = (props) => {
  const {
    appModel,
    authModel,
    loading,
    onToggleMenu,
    onRoute,
    onCloseSiderPanel
  } = props;

  const {
    is404,
    language,
    menus,
    collapsedMenu,
    meta,
    layoutOpts: {
      mainMenu,
      mainHeader,
      mainFooter,
    },
    waitBeforeLogin,
    siderPanels
  } = appModel;

  const { user } = authModel;

  const outlet = is404 ? <Page404/> : <Outlet/>;

  const [authLoader, setAuthLoader] = useState(true);

  effectHook(() => {
    setAuthLoader(!user);
  }, [user]);

  const siderProps = {
    onClose: onCloseSiderPanel,
    ...siderPanels[siderPanels?.currentPanel]
  };

  const handleUserAuth = () => {
  };

  const menuProps = {
    loading,
    authModel,
    defaultDims: {
      min: 80,
      max: 250
    },
    isSider: true
  };

  return (
      <LandingPage spinEffects={[
        'appModel/query',
        'authModel/signIn'
      ]}>
        <div className={'admin'}>
          <Helmet>
            <meta charSet={meta.charSet}/>
            <title>{`${meta.name} ${meta.title}`}</title>
          </Helmet>
          <Suspense fallback={<Loader fullScreen spinning={loading.effects['appModel/query']}/>}>
            {/* Have to refresh for production environment */}
            <Layout style={{ minHeight: '100vh' }} key={language}>
              <Layout className={'site-layout'}>
                <Layout>
                  <Content>
                    <Form.Provider>
                      <div className={'site-layout-content'}>
                        {outlet}
                      </div>
                    </Form.Provider>
                  </Content>
                  <Main.Sider {...siderProps}/>
                </Layout>
                {mainFooter && (
                    <Main.Footer>
                      Flip, 2024
                    </Main.Footer>
                )}
              </Layout>
            </Layout>
          </Suspense>
        </div>
      </LandingPage>
  );
};
