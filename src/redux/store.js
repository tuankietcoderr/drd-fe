import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {allApis, allSlices} from './features';

const reducers = combineReducers({
  ...allSlices.reduce((acc, slice) => {
    acc[slice.name] = slice.reducer;
    return acc;
  }, {}),
  ...Object.fromEntries(allApis.map(api => [api.reducerPath, api.reducer])),
});

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(allApis.map(api => api.middleware)),
    devTools: process.env.NODE_ENV !== 'production',
  });
};
