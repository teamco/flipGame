import React, { useState } from 'react';
import LandingHeader from '@/components/Landing/landing.header';

import styles from '@/pages/landing/landing.module.less';

/**
 * @constant
 * @param props
 * @return {JSX.Element}
 */
const HeaderSection = props => {
  const { visible } = props;

  return visible ? (
      <>
        <section className={styles.headerSection}>
          <LandingHeader {...props} />
        </section>
      </>
  ) : null;
};

export default HeaderSection;
