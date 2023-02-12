import React from 'react';
import { Layout, Spin } from 'antd';

import HeaderSection from '@/pages/landing/sections/header.section';

import { isSpinning } from '@/utils/state';

import styles from '@/pages/landing/landing.module.less';
import stylesPage from '@/layouts/landing/page/landing.page.layout.module.less';

const { Content } = Layout;

/**
 * @export
 * @default
 * @param props
 * @return {JSX.Element}
 */
export const LandingPage = (props) => {
  const {
    landingModel,
    authModel,
    appModel,
    loading,
    onSignOut,
    spinEffects = [],
    pageStyles = stylesPage.pageContent,
    onChangeLang
  } = props;

  const {
    icon,
    topUnder,
    header: { position, visible }
  } = landingModel;

  const { user } = authModel;

  const headerProps = {
    icon,
    user,
    topUnder,
    onSignOut,
    position,
    landingModel,
    authModel,
    onChangeLang,
    loading,
    visible
  };

  return (
      <Spin spinning={isSpinning(loading, spinEffects, loading.effects['landingModel/query'])}>
        <Layout className={styles.landing}>
          <Content>
            <div className={styles.page}>
              <HeaderSection {...headerProps} />
              <div className={pageStyles}>
                {props.children}
              </div>
            </div>
          </Content>
        </Layout>
      </Spin>
  );
};
