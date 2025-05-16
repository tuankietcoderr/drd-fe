'use client';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {useAppSelector} from '@/redux/hooks';
import dynamic from 'next/dynamic';

const CVPreview = dynamic(() => import('@/components/CVPreview'), {ssr: false});

const CVPreviewer = () => {
  const file = useAppSelector(cvReviewSelector.selectFile);
  return <>{file && <CVPreview fileUrl={file} />}</>;
};

export default CVPreviewer;
