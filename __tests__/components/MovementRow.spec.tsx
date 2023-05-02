/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { create } from 'react-test-renderer';
import MovementRow from '../../src/components/MovementRow';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('MovementRow test', () => {
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
        <MovementRow movementId="SOME ID" onEdit={() => {}} onView={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
