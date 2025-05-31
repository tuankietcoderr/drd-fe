'use client';

import authSelector from '@/redux/features/auth/authSelector';
import {authActions} from '@/redux/features/auth/authSlice';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {candidateActions} from '@/redux/features/candidate/candidateSlice';
import locationApi from '@/redux/features/location/locationQuery';
import {locationActions} from '@/redux/features/location/locationSlice';
import occupationApi from '@/redux/features/occupation/occupationQuery';
import {occupationActions} from '@/redux/features/occupation/occupationSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {jwtDecode} from '@/utils/decoder';
import {AccessTokenUtils} from '@/utils/token-utils';
import {useEffect} from 'react';

const UserFetchDataProviders = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelector.selectUser);
  const {data: locationData, isSuccess: isSusccessLocation} =
    locationApi.useGetLocationsQuery();
  const {data: occupationData, isSuccess: isSuccessOccupation} =
    occupationApi.useGetOccupationsQuery();
  const {data: candidateData, isSuccess: isSuccessCandidate} =
    candidateApi.useGetCandidateInfoQuery(undefined, {
      skip: !AccessTokenUtils.getToken() || user?.authorities?.length !== 0,
    });
  const {data: candidateCvData, isSuccess: isSuccessCandidateCv} =
    candidateApi.useGetCandidateCvQuery(undefined, {
      skip: !AccessTokenUtils.getToken() || user?.authorities?.length !== 0,
    });

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
      location.href = '/';
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

  useEffect(() => {
    if (isSuccessCandidate) {
      dispatch(candidateActions.setCandidate(candidateData));
    }
  }, [dispatch, isSuccessCandidate, candidateData]);

  useEffect(() => {
    if (isSuccessCandidateCv) {
      dispatch(candidateActions.setCV(candidateCvData));
    }
  }, [dispatch, isSuccessCandidateCv, candidateCvData]);

  return null;
};

export default UserFetchDataProviders;
