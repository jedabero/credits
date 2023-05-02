/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { create } from 'react-test-renderer';
import CardsTable from '../../src/components/CardsTable';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('CardsTable test', () => {
  test('should render', () => {
    const store = mockStore({
      _persist: { version: 0, rehydrated: true },
      creditCards: {
        entities: {},
        ids: [],
      },
      movements: {
        entities: {},
        ids: [],
      },
    });
    const tree = create(
      wrapProvider(
        <CardsTable onEdit={() => {}} onView={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
