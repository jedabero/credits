/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import App from '../src/App';

describe('App test', () => {
  const renderer = createRenderer();
  let output: ReactElement;
  test('render App', () => {
    renderer.render(<App />);
    output = renderer.getRenderOutput<ReactElement>();
    expect(output).toMatchSnapshot();
  });
  test('should display movements', () => {
    expect(output.props.children[2]).toBeNull();
    output.props.children[1].props.onViewCardMovements('SOME ID');
    output = renderer.getRenderOutput<ReactElement>();
    expect(output.props.children[2]).not.toBeNull();
    expect(output).toMatchSnapshot();
  });
});
