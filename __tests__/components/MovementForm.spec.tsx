/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
import MovementForm from '../../src/components/MovementForm';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('MovementForm test', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 1));
  });
  let tree: ReactTestRenderer;
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
    tree = create(
      wrapProvider(
        <MovementForm cardId="SOME ID" clearMovementId={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('should render with movement', () => {
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
    act(() => {
      tree.update(
        wrapProvider(
          <MovementForm movementId="SOME OTHER ID" cardId="SOME ID" clearMovementId={() => {}} />,
          store,
        ),
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called', () => {
    act(() => {
      tree.root.findByProps({ name: 'authNumber' }).props.onChange({ target: { name: 'authNumber', value: 'NUMBER' } });
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called for number field', () => {
    act(() => {
      tree.root.findByProps({ name: 'quotas' }).props.onChange({ target: { name: 'quotas', value: '2' } });
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called for number field with invalid value', () => {
    act(() => {
      tree.root.findByProps({ name: 'quotas' }).props.onChange({ target: { name: 'quotas', value: 'N' } });
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called for number (float) field', () => {
    act(() => {
      tree.root.findByProps({ name: 'monthlyRate' }).props.onChange({ target: { name: 'monthlyRate', value: '0.02' } });
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('save called', () => {
    act(() => {
      tree.root.findAllByType('button')[0].props.onClick();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('cancel called', () => {
    act(() => {
      tree.root.findAllByType('button')[1].props.onClick();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
});
