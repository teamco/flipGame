import React, { memo, useContext, useEffect, useState } from 'react';
import { Empty } from 'antd';

import Card from './card';

import { CardsContext } from '@/pages/cards/cards';

import styles from './cards.less';
import { stub } from '@/utils/function';

const CardList = props => {
  const {
    completed = [],
    selected = [],
    ...rest
  } = props;

  const {
    timer,
    assignedCards,
    onClick = stub,
    clearSelected = stub
  } = useContext(CardsContext) || [];

  const cardProps = {
    onClick: selected.length >= 2 ? stub : onClick,
    completed,
    selected,
    timer,
    ...rest
  };

  useEffect(() => {
    clearSelected();
  }, [selected, clearSelected]);

  return (
      <div className={styles.cardsWrapper}>
        {assignedCards.length ?
            assignedCards.map((card, idx) => (
                <Card key={idx} card={card} idx={idx} {...cardProps}/>
            )) :
            <Empty/>
        }
      </div>
  );
};

export default memo(CardList);



