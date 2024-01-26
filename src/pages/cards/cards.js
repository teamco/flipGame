import React, { memo, createContext, useState, useEffect } from 'react';
import { Affix, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Loader from '@/components/Loader';

import CardList from '@/pages/cards/cardList';
import Config from '@/pages/cards/config.connect';

import { stub } from '@/utils/function';
import { hms } from '@/utils/timestamp';

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
    completed,
    selected,
    onTimer
  };

  const configProps = {
    setTimer,
    timer,
    ts
  };

  return (
      <Layout>
        <Content>
          <Loader loading={loading}
                  spinOn={[`${MODEL_NAME}/query`]}>
            <Row gutter={0} className={styles.cards}>
              <Col span={15} offset={1}>
                <CardsContext.Provider value={{
                  assignedCards,
                  spinning,
                  timer: { setter: setTs, key: ts },
                  onClick: onCardSelect
                }}>
                  <CardList {...cardListProps}/>
                </CardsContext.Provider>
              </Col>
              <Col span={7} className={styles.configWrapper}>
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



