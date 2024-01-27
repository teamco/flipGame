import React, { memo, useEffect, useState } from 'react';
import classnames from 'classnames';

import { stub } from '@/utils/function';

import styles from '@/pages/cards/cards.less';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Card = (props) => {
  const [show, setShow] = useState(false);

  const {
    testId,
    card = {},
    idx,
    timer,
    spinning,
    onClick = stub,
    onTimer = stub,
    completed = [],
    selected = []
  } = props;

  const handleClick = (e, card) => {
    if (spinning) return false;

    e.preventDefault();
    e.stopPropagation();

    setShow(true);
    onClick({ ...card, idx });
    !timer.key && timer.setter(onTimer(+(new Date())));
  };

  const isCompleted = completed.includes(card?.id);
  const isSelected = selected.find(c => c.id === card?.id && c.idx === idx);

  useEffect(() => {
    if (!isSelected && show) {
      setTimeout(() => {
        setShow(false);
      }, 1000);
    }
  }, [isSelected])

  return (
      <div data-testid={testId}
           className={classnames(styles.card, styles.flipBox, {
             [styles.selected]: isCompleted,
             [styles.show]: !isCompleted && isSelected && show
           })}>
        <div className={styles.flipBoxInner}>
          <div className={classnames(styles.flipBoxFront, {
            [styles.disabled]: spinning
          })}
               onClick={e => !show && handleClick(e, card)}>
            {testId && (<span>{card.id}-{idx}</span>)}
          </div>
          <div className={styles.flipBoxBack}>
            <img src={card?.url} alt={card?.id}/>
          </div>
        </div>
      </div>
  );
};

export default memo(Card);