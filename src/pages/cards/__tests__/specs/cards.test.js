import { cleanup, screen, fireEvent } from '@testing-library/react';

import { expectations, getByTestId, mocksWorkaround } from '__tests__/helper';
import { tMock } from '__tests__/mock';

import Cards from '@/pages/cards';

import { uuid } from '@/utils/common';
import { shuffle } from '@/utils/array';

const testId = 'cardsTestId';

const grid = 4;
const assets = [];
for (let i = 0; i < 10; i++) {
  assets.push({ id: uuid(), url: `img-${i}.png` });
}

let assignedCards = Array.from(assets).splice(0, grid);

assignedCards = shuffle([
  ...assignedCards,
  ...assignedCards
]);

describe('@/pages/cards/cards.js', () => {

  // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
  // unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  beforeEach(tMock);

  mocksWorkaround();

  it('Render with no data', async () => {
    const props = {
      testId,
      loading: { effects: {} },
      cardModel: {
        selected: [],
        completed: [],
        assignedCards: [],
        assets: [],
        selectedGrid: 0,
        cardOpts: [],
        steps: 0,
        spinning: false
      }
    };

    const { component } = await expectations(Cards, testId, props, true);

    const cardList = getByTestId(component, `${testId}-cardList`);
    expect(cardList).toHaveTextContent('No data');

    getByTestId(component, `${testId}-config`);
    getByTestId(component, `${testId}-cardList-winner`);
  });

  it('Render with assets', async () => {
    const props = {
      testId,
      loading: { effects: {} },
      cardModel: {
        selected: [],
        completed: [],
        assignedCards,
        assets: [...assets],
        selectedGrid: grid,
        cardOpts: [],
        steps: 0,
        spinning: false
      }
    };

    const { component } = await expectations(Cards, testId, props, true);

    const images = component.querySelectorAll('img');
    expect(images.length).toEqual(grid * 2);
  });

  it('Render with selected asset', async () => {
    const selectedIdx = 1;
    expect(selectedIdx).toBeLessThan(grid);

    const props = {
      testId,
      loading: { effects: {} },
      cardModel: {
        selected: [{ ...assignedCards[selectedIdx], idx: selectedIdx }],
        completed: [],
        assignedCards,
        assets: [...assets],
        selectedGrid: grid,
        cardOpts: [],
        steps: 0,
        spinning: false
      }
    };

    const { component, render } = await expectations(Cards, testId, props, true);

    const flipBoxes = component.querySelectorAll('.flipBoxFront');
    expect(flipBoxes.length).toEqual(grid * 2);
    fireEvent.click(flipBoxes[selectedIdx]);

    // expect(render.asFragment()).toMatchSnapshot();

    const selectedImg = getByTestId(component, `${testId}-cardList-card-${selectedIdx}`);
    expect(selectedImg).toHaveClass('show');
  });

  xit('Render with completed assets', async () => {
    const completed = [];
    const idxList = [2, 5];

    for (let i = 0; i < idxList.length; i++) {
      expect(idxList[i]).toBeLessThan(grid * 2);
      expect(assignedCards[idxList[i]]).toBeDefined();
      completed.push(assignedCards[idxList[i]].id);
    }

    const props = {
      testId,
      loading: { effects: {} },
      cardModel: {
        selected: [],
        completed,
        assignedCards,
        assets: [...assets],
        selectedGrid: grid,
        cardOpts: [],
        steps: 0,
        spinning: false
      }
    };

    const { component } = await expectations(Cards, testId, props, true);

    const images = component.querySelectorAll('.selected');
    expect(images.length).toEqual(idxList.length * 2);
  });
});
