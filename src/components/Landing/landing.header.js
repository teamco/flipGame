import React, { useState } from 'react';
import { history, useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import classnames from 'classnames';

import { useScrollPosition } from '@/utils/hooks';
import { t } from '@/utils/i18n';

import { LandingActions } from '@/components/Landing/landing.actions';

import styles from '@/components/Landing/landing.module.less';

/**
 * @export
 * @default
 * @param props
 * @return {JSX.Element}
 */
const LandingHeader = props => {
  const intl = useIntl();

  const {
    title,
    topUnder,
    position = 'absolute',
    landingModel,
    onChangeLang,
    loading
  } = props;

  const [transform, setTransform] = useState(false);
  const { siderPanelConfig: { collapsed } } = landingModel;

  useScrollPosition(position, topUnder, setTransform);

  /**
   * @constant
   * @param {Event} e
   */
  const handleHomeNavigation = e => {
    e.preventDefault();
    history.push('/');
  };

  const actionProps = {
    loading,
    collapsed
  };

  return (
      <header className={classnames(styles.header, transform ? styles.transform : '')}
              style={{ position }}>
        <Row>
          <Col span={6}>
            {/*<img src={icon}*/}
            {/*     onClick={handleHomeNavigation}*/}
            {/*     className={styles.icon}*/}
            {/*     alt={title ? t(intl, `${title}`) : null}/>*/}
          </Col>
          <Col span={18}>
            <Row justify={'end'}
                 gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col className={classnames(styles.headerText, styles.col)}>
                <LandingActions {...actionProps}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
  );
};

export default LandingHeader;
