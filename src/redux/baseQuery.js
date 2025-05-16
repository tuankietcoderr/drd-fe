import {RefreshTokenUtils} from '@/utils/token-utils';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';
import {authActions} from './features/auth/authSlice';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: '/v1/auth/refresh-token',
            method: 'POST',
            headers: {
              Authorization: `Bearer ${RefreshTokenUtils.getToken()}`,
            },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          api.dispatch(authActions.setTokens(refreshResult.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authActions.logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default baseQueryWithReauth;
