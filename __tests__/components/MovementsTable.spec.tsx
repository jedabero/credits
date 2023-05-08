/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { create } from 'react-test-renderer';
import MovementsTable from '../../src/components/MovementsTable';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('MovementsTable test', () => {
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
        <MovementsTable cardId="SOME ID" onEdit={() => {}} onView={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('should rows', () => {
    const store = mockStore({
      _persist: { version: 0, rehydrated: true },
      creditCards: {
        entities: {},
        ids: [],
      },
      movements: {
        entities: {
          'SOME OTHER ID': {
            id: 'SOME OTHER ID',
            cardId: 'SOME ID',
            authNumber: '0',
            date: '',
            description: '',
            value: 1,
            monthlyRate: 0.01,
            yearlyRate: 0.01,
            quotas: 1,
          },
        },
        ids: ['SOME OTHER ID'],
      },
    });
    const tree = create(
      wrapProvider(
        <MovementsTable cardId="SOME ID" onEdit={() => {}} onView={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
