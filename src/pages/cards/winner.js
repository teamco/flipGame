import React, { memo } from 'react';

import styles from './cards.less';

/**
 * @export
 * @param props
 * @return {JSX.Element|null}
 * @constructor
 */
const Winner = props => {
  const { paths = 8, winner = false } = props;

  return winner ? (
      <div className={styles.winner}>
        <div className={styles.pacman}/>
        {[...Array(paths).keys()].map((_, idx) => (<div key={idx} className={styles.path}/>))}
        <div className={styles.donate}>
          <a href={'https://www.buymeacoffee.com/teamcon'} target={'_blank'}>
            <img src={'https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'}
                 alt={'Buy Me A Coffee'}/>
          </a>
        </div>
      </div>
  ) : null;
};

export default memo(Winner);