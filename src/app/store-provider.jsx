'use client';
import {makeStore} from '@/redux/store';
import {setupListeners} from '@reduxjs/toolkit/query';
import {useRef} from 'react';
import {Provider} from 'react-redux';

export default function StoreProvider({children}) {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore();
    storeRef.current = store;
    setupListeners(store.dispatch);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
