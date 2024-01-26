import React, { memo, useMemo } from 'react';
import { Button, Select } from 'antd';

import { stub } from '@/utils/function';

import { isWinner } from '@/pages/cards/cards';

import styles from './cards.less';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Config = props => {
  const {
    setTimer = stub,
    timer = [],
    cardModel = {},
    ts,
    testId,
    onChangeGrid = stub
  } = props;

  const {
    steps,
    completed = [],
    assignedCards = [],
    cardOpts = [],
    selectedGrid
  } = cardModel;

  const _aL = assignedCards.length;
  const _cL = completed.length;

  const calculateScore = useMemo(() => {
    const _completed = _aL ? (_cL * 2 / _aL) * 100 : 0;
    const _factor = steps > _aL ? (_aL / steps) : 1;
    return parseFloat((_completed * _factor).toString()).toFixed(1);
  }, [_aL, _cL]);

  return (
      <div className={styles.config}
           data-testid={testId}>
        <div className={styles.timer}>
          <div>{timer?.[0] || '00'}</div>
          <div>{timer?.[1] || '00'}</div>
          <div>{timer?.[2] || '00'}</div>
        </div>
        <div><strong>Score:</strong> {calculateScore}</div>
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
              clearInterval(ts);
            }}
        />
        <Button onClick={() => onChangeGrid(selectedGrid)}
                disabled={!isWinner(completed, assignedCards)}>
          Play Again
        </Button>
      </div>
  );
};

export default memo(Config);



