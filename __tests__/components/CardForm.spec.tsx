/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
import CardForm from '../../src/components/CardForm';
import wrapProvider from '../../__tests_helpers__/wrapProvider';
import mockStore from '../../__tests_helpers__/mockStore';

describe('CardForm test', () => {
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
        <CardForm clearCardId={() => {}} />,
        store,
      ),
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('save called', () => {
    act(() => {
      tree.root.findAllByType('button')[0].props.onClick();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('should render with card', () => {
    const store = mockStore({
      _persist: { version: 0, rehydrated: true },
      creditCards: {
        entities: {
          'SOME ID': {
            id: 'SOME ID',
            name: 'name',
            quota: 1,
            balance: 1,
            cutoffDay: 1,
            cardNumber: 'cardNumber',
          },
        },
        ids: ['SOME ID'],
      },
      movements: {
        entities: {},
        ids: [],
      },
    });
    act(() => {
      tree.update(
        wrapProvider(
          <CardForm cardId="SOME ID" clearCardId={() => {}} />,
          store,
        ),
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called for text field', () => {
    act(() => {
      tree.root.findByProps({ name: 'name' }).props.onChange({ target: { name: 'name', value: 'NAME' } });
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called for number field', () => {
    act(() => {
      tree.root.findByProps({ name: 'quota' }).props.onChange({ target: { name: 'quota', value: '2' } });
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('setValue called for number field with invalid value', () => {
    act(() => {
      tree.root.findByProps({ name: 'quota' }).props.onChange({ target: { name: 'quota', value: 'N' } });
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
});
