import { configureStore } from '@reduxjs/toolkit'

import starWarsReducer from './starWars';

const getReduxStore = (preloadedState: any = {}) => {

  return configureStore({
    reducer: {
      starWars: starWarsReducer
    },
    preloadedState
  });
};

export type ReduxStore = ReturnType<typeof getReduxStore>;
export type RootState = ReturnType<ReduxStore['getState']>

export default getReduxStore;
