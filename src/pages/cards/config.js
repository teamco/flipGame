import React, { memo } from 'react';
import { Select } from 'antd';
import { stub } from '@/utils/function';
import styles from './cards.less';

const Config = props => {
  const {
    setTimer = stub,
    timer = [],
    cardModel,
    ts,
    onChangeGrid = stub
  } = props;

  const {
    steps,
    completed = [],
    assignedCards = [],
    cardOpts = [],
    selectedGrid
  } = cardModel;

  return (
      <div className={styles.config}>
        <div className={styles.timer}>
          <div>{timer?.[0] || '00'}</div>
          <div>{timer?.[1] || '00'}</div>
          <div>{timer?.[2] || '00'}</div>
        </div>
        <div><strong>Steps:</strong> {steps || 0}</div>
        <div>
          <strong>Completed:</strong> {completed.length * 2}/{assignedCards.length}
        </div>
        <strong>Card Grid</strong>
        <Select
            value={selectedGrid}
            style={{ width: 150 }}
            options={[...cardOpts]}
            onChange={grid => {
              onChangeGrid(grid);
              setTimer(null);
              clearInterval(ts)
            }}
        />
      </div>
  );
};

export default memo(Config);



