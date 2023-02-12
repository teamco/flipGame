import React from 'react';

import LandingPage from '@/layouts/landing/page';

import { effectHook } from '@/utils/hooks';

import styles from '@/pages/landing/landing.module.less';

export const landing = (props) => {
  const {
    authModel,
    landingModel,
    watch = true,
    loading,
    onGetLandingData,
    onFetchCarousel
  } = props;

  const { user } = authModel;

  const {
    header: { position },
    data
  } = landingModel;

  effectHook(() => {
    onGetLandingData();
  }, [user]);

  const contentProps = {
    data,
    loading,
    className: position === 'fixed' ? styles.contentFixed : null,
    onFetchCarousel
  };

  return (
      <LandingPage spinEffects={['landingModel/query']}>
        content
      </LandingPage>
  );
};
