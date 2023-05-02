import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from '../src/store';

const wrapProvider = (component: ReactElement, store: Store) => (
  <Provider store={store}>{component}</Provider>
);

export default wrapProvider;
