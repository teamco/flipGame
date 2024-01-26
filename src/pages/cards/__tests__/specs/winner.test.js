import React from 'react';
import { cleanup, act, render } from '@testing-library/react';

import { expectations, mocksWorkaround } from '__tests__/helper';
import { tMock } from '__tests__/mock';

import Winner from '@/pages/cards/winner';

const testId = 'winnerTestId';

describe('@/pages/cards/winner.js', () => {

  // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
  // unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  beforeEach(tMock);

  mocksWorkaround();

  it('Render as a Winner', async () => {
    const props = {
      testId,
      winner: true
    };

    const { component } = await expectations(Winner, testId, props, true);

    expect(component).toHaveClass('winner');
  });

  it('Render as a Pending', async () => {
    const props = { testId };

    const _render = await act(async () => {
      return render(<Winner {...props}/>);
    });

    expect(_render.asFragment()).toMatchSnapshot();
  });
});
