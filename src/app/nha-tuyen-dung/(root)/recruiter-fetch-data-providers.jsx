'use client';

import {authActions} from '@/redux/features/auth/authSlice';
import locationApi from '@/redux/features/location/locationQuery';
import {locationActions} from '@/redux/features/location/locationSlice';
import occupationApi from '@/redux/features/occupation/occupationQuery';
import {occupationActions} from '@/redux/features/occupation/occupationSlice';
import {useAppDispatch} from '@/redux/hooks';
import {jwtDecode} from '@/utils/decoder';
import {AccessTokenUtils} from '@/utils/token-utils';
import {useEffect} from 'react';

const RecruiterFetchDataProviders = () => {
  const dispatch = useAppDispatch();
  const {data: locationData, isSuccess: isSusccessLocation} =
    locationApi.useGetLocationsQuery();
  const {data: occupationData, isSuccess: isSuccessOccupation} =
    occupationApi.useGetOccupationsQuery();

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
      location.href = '/nha-tuyen-dung/dang-nhap';
      return;
    }
    dispatch(authActions.setUser(decodedToken));
  }, [dispatch]);

  useEffect(() => {
    if (isSusccessLocation) {
      dispatch(locationActions.setLocations(locationData));
    }
  }, [dispatch, isSusccessLocation, locationData]);

  useEffect(() => {
    if (isSuccessOccupation) {
      dispatch(occupationActions.setOccupations(occupationData));
    }
  }, [dispatch, isSuccessOccupation, occupationData]);

  return null;
};

export default RecruiterFetchDataProviders;
