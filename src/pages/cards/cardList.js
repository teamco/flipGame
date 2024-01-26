import React, { memo, useContext } from 'react';
import { Empty } from 'antd';

import Card from './card';

import Winner from '@/pages/cards/winner';
import { CardsContext, isWinner } from '@/pages/cards/cards';

import { stub } from '@/utils/function';

import styles from './cards.less';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const CardList = props => {
  const {
    completed = [],
    selected = [],
    ...rest
  } = props;

  const {
    timer,
    spinning,
    assignedCards,
    onClick = stub
  } = useContext(CardsContext) || [];

  const cardProps = {
    onClick: selected.length >= 2 ? stub : onClick,
    completed,
    selected,
    spinning,
    timer,
    ...rest
  };

  return (
      <div className={styles.cardsWrapper}>
        {assignedCards.length ?
            assignedCards.map((card, idx) => (
                <Card key={idx} card={card} idx={idx} {...cardProps}/>
            )) :
            <Empty/>
        }
        <Winner winner={isWinner(completed, assignedCards)} />
      </div>
  );
};

export default memo(CardList);



