'use client';

import authSelector from '@/redux/features/auth/authSelector';
import {useAppSelector} from '@/redux/hooks';
import {usePathname} from 'next/navigation';
import {useCallback} from 'react';

/**
 * @typedef {Object} AuthorizedActionProps
 * @property {(...params: any[]) => void} handler
 */

/**
 * @param {AuthorizedActionProps} args
 */
const useAuthorizedAction = args => {
  const {handler} = args;
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(authSelector.selectIsAuthenticated);

  const execute = useCallback(
    (...params) => {
      if (isAuthenticated) {
        return handler(...params);
      }

      location.href = `/dang-nhap?fallbackUrl=${pathname}`;
    },
    [handler, isAuthenticated, pathname],
  );

  return {execute};
};

export default useAuthorizedAction;
