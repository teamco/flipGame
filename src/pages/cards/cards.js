import React, { memo, createContext, useState, useEffect } from 'react';
import CardList from '@/pages/cards/cardList';
import Config from '@/pages/cards/config.connect';
import { Affix, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './cards.less';
import Loader from '@/components/Loader';
import { stub } from '@/utils/function';
import { hms } from '@/utils/timestamp';

const MODEL_NAME = 'cardModel';

/**
 * @export
 * @const CardsContext
 */
export const CardsContext = createContext(null);

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
    selected
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
    if (completed.length * 2 === assignedCards.length) {
      clearInterval(ts);
      setTs(null);
    }
  }, [timer]);

  const cardListProps = {
    completed,
    selected,
    onTimer
  };

  const configProps = {
    setTimer,
    timer,
    ts
  }

  return (
      <Layout>
        <Content>
          <Loader loading={loading}
                  spinOn={[`${MODEL_NAME}/query`]}>
            <Row gutter={0} className={styles.cards}>
              <Col span={15} offset={1}>
                <CardsContext.Provider value={{
                  assignedCards,
                  timer: { setter: setTs, key: ts },
                  onClick: onCardSelect,
                  clearSelected: onClearSelected
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



