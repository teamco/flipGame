import React, { memo, createContext, useState, useEffect } from 'react';
import { Affix, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Loader from '@/components/Loader';

import CardList from '@/pages/cards/cardList';
import Config from '@/pages/cards/config.connect';

import { stub } from '@/utils/function';
import { hms } from '@/utils/timestamp';
import { getTestId } from '@/utils/common';

import styles from './cards.less';

const MODEL_NAME = 'cardModel';

/**
 * @export
 * @const CardsContext
 */
export const CardsContext = createContext(null);

/**
 * @export
 * @param a
 * @param b
 * @return {boolean}
 */
export const isWinner = (a = [], b = []) => a.length * 2 === b.length;

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Cards = props => {
  const {
    testId,
    loading,
    cardModel,
    onCardSelect = stub,
    onClearSelected = stub
  } = props;

  const {
    assignedCards,
    completed,
    selected,
    spinning
  } = cardModel;

  const [timer, setTimer] = useState(null);
  const [ts, setTs] = useState(null);

  /**
   * @param {Date} startedAt
   * @param {number} [interval]
   * @return {number}
   */
  const onTimer = (startedAt, interval = 1000) => {
    return setInterval(() => {
      const seconds = Math.round((+(new Date) - startedAt) / interval);
      setTimer(hms(seconds));
    }, interval);
  };

  useEffect(() => {
    if (isWinner(completed, assignedCards)) {
      clearInterval(ts);
      setTs(null);
    }
  }, [timer, assignedCards, completed]);

  useEffect(() => {
    onClearSelected();
  }, [selected, onClearSelected]);

  const cardListProps = {
    testId: getTestId({ testId, ns: 'cardList' }),
    completed,
    selected,
    onTimer
  };

  const configProps = {
    testId: getTestId({ testId, ns: 'config' }),
    setTimer,
    timer,
    ts
  };

  const leftCol = { xs: 24, sm: 24, md: 14, lg: 15, xl: 17, xxl: 17 };
  const rightCol = { xs: 24, sm: 24, md: 9, lg: 8, xl: 6, xxl: 6 };

  return (
      <Layout>
        <Content>
          <Loader loading={loading}
                  testId={testId}
                  spinOn={[`${MODEL_NAME}/query`]}>
            <Row gutter={[0, 24]} className={styles.cards}>
              <Col {...leftCol}>
                <CardsContext.Provider value={{
                  assignedCards,
                  spinning,
                  timer: { setter: setTs, key: ts },
                  onClick: onCardSelect
                }}>
                  <CardList {...cardListProps}/>
                </CardsContext.Provider>
              </Col>
              <Col {...rightCol} className={styles.configWrapper}>
                <Affix offsetTop={100}>
                  <Config {...configProps}/>
                </Affix>
              </Col>
            </Row>
          </Loader>
        </Content>
      </Layout>
  );
};

export default memo(Cards);



