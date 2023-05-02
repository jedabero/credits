/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Movements from '../../src/containers/Movements';

describe('Movements test', () => {
  const renderer = createRenderer();
  let output: ReactElement;
  test('render Movements', () => {
    renderer.render(<Movements cardId="CARD ID" onViewMovementHistory={() => {}} />);
    output = renderer.getRenderOutput<ReactElement>();
    expect(output).toMatchSnapshot();
  });
  test('set movementId', () => {
    output.props.children[2].props.onEdit('SOME ID');
    output = renderer.getRenderOutput<ReactElement>();
    expect(output.props.children[1].props.movementId).toBe('SOME ID');
    expect(output).toMatchSnapshot();
  });
  test('call clearMovementId', () => {
    output.props.children[1].props.clearMovementId();
    output = renderer.getRenderOutput<ReactElement>();
    expect(output.props.children[1].props.movementId).toBeNull();
    expect(output).toMatchSnapshot();
  });
});
