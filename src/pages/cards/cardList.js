import React, { memo, useContext } from 'react';
import { Empty } from 'antd';

import Card from './card';

import Winner from '@/pages/cards/winner';
import { CardsContext, isWinner } from '@/pages/cards/cards';

import { stub } from '@/utils/function';
import { getTestId } from '@/utils/common';

import styles from './cards.less';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const CardList = props => {
  const {
    testId,
    completed = [],
    selected = [],
    ...rest
  } = props;

  const {
    timer,
    spinning,
    assignedCards = [],
    onClick = stub
  } = useContext(CardsContext) || {};

  const cardProps = {
    onClick: selected.length >= 2 ? stub : onClick,
    completed,
    selected,
    spinning,
    timer,
    ...rest
  };

  return (
      <div className={styles.cardsWrapper}
           data-testid={testId}>
        {assignedCards.length ?
            assignedCards.map((card, idx) => (
                <Card key={idx} card={card} idx={idx}
                      testId={getTestId({ testId, ns: `card-${idx}` })}
                      {...cardProps}/>
            )) :
            <Empty/>
        }
        <Winner testId={getTestId({ testId, ns: 'winner' })}
                winner={isWinner(completed, assignedCards)}/>
      </div>
  );
};

export default memo(CardList);



