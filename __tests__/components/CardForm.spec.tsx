/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { create } from 'react-test-renderer';
import CardForm from '../../src/components/CardForm';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('CardForm test', () => {
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
        <CardForm cardId="SOME ID" clearCardId={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
