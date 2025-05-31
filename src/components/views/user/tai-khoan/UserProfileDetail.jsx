'use client';

import candidateSelector from '@/redux/features/candidate/candidateSelector';
import {useAppSelector} from '@/redux/hooks';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import Spinner from '../../Spinner';
import CandidateProfileDetail from '../CandidateProfileDetail';

const UpdateProfileForm = dynamic(() => import('./UpdateProfileForm'), {
  ssr: false,
  loading: () => <Spinner isCentered />,
});

const UserProfileDetail = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const candidate = useAppSelector(candidateSelector.selectCandidate);
  console.log('UserProfileDetail', candidate);
  return (
    candidate &&
    (!isEditMode ? (
      <CandidateProfileDetail
        showEdit
        candidate={candidate}
        onOpenEdit={() => setIsEditMode(true)}
      />
    ) : (
      <UpdateProfileForm onClose={() => setIsEditMode(false)} />
    ))
  );
};

export default UserProfileDetail;
