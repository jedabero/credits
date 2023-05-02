/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { create } from 'react-test-renderer';
import CardRow from '../../src/components/CardRow';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('CardRow test', () => {
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
        <CardRow cardId="SOME ID" onEdit={() => {}} onView={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
