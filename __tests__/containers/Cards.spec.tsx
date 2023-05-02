/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Cards from '../../src/containers/Cards';

describe('Cards test', () => {
  const renderer = createRenderer();
  let output: ReactElement;
  test('render Cards', () => {
    renderer.render(<Cards onViewCardMovements={() => {}} />);
    output = renderer.getRenderOutput<ReactElement>();
    expect(output).toMatchSnapshot();
  });
  test('set cardId', () => {
    output.props.children[2].props.onEdit('SOME ID');
    output = renderer.getRenderOutput<ReactElement>();
    expect(output.props.children[1].props.cardId).toBe('SOME ID');
    expect(output).toMatchSnapshot();
  });
  test('call clearCardId', () => {
    output.props.children[1].props.clearCardId();
    output = renderer.getRenderOutput<ReactElement>();
    expect(output.props.children[1].props.cardId).toBeNull();
    expect(output).toMatchSnapshot();
  });
});
