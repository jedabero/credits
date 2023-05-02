jest.spyOn(console, 'error').mockImplementationOnce(() => {});

// eslint-disable-next-line import/first
import { store } from '../src/store';

describe('store test', () => {
  test('render App', () => {
    expect(store.getState()).toMatchSnapshot();
  });
});
