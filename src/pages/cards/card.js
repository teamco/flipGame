import React, { memo, useState } from 'react';
import classnames from 'classnames';

import { stub } from '@/utils/function';

import styles from '@/pages/cards/cards.less';
import { Spin } from 'antd';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Card = (props) => {
  const [show, setShow] = useState(false);

  const {
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

    setShow(true);
    onClick({ ...card, idx });
    !timer.key && timer.setter(onTimer(+(new Date())));
  };

  const isCompleted = completed.includes(card?.id);
  const isSelected = selected.find(c => c.id === card?.id && c.idx === idx);

  return (
      <div className={classnames(styles.card, styles.flipBox, {
        [styles.selected]: isCompleted,
        [styles.show]: !isCompleted && isSelected && show
      })}>
        <div className={styles.flipBoxInner}>
          <div className={classnames(styles.flipBoxFront, {
            [styles.disabled]: spinning
          })}
               onClick={e => handleClick(e, card)}/>
          <div className={styles.flipBoxBack}>
            <img src={card?.url} alt={card?.id}/>
          </div>
        </div>
      </div>
  );
};

export default memo(Card);