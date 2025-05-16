'use client';

import {authActions} from '@/redux/features/auth/authSlice';
import {useAppDispatch} from '@/redux/hooks';
import {jwtDecode} from '@/utils/decoder';
import {AccessTokenUtils} from '@/utils/token-utils';
import {useEffect} from 'react';

const AdminFetchDataProviders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const decodedToken = jwtDecode(AccessTokenUtils.getToken());
    if (!decodedToken) {
      dispatch(authActions.logout());
      return;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const isTokenExpired = decodedToken.exp < currentTime;
    console.log('isTokenExpired', isTokenExpired);
    if (isTokenExpired) {
      dispatch(authActions.logout());
      location.href = '/quan-tri/dang-nhap';
      return;
    }
    dispatch(authActions.setUser(decodedToken));
  }, [dispatch]);

  return null;
};

export default AdminFetchDataProviders;
