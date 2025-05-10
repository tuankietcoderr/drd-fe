'use client';
import CVPreview from '@/components/CVPreview';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {useAppSelector} from '@/redux/hooks';

const CVPreviewer = () => {
  const file = useAppSelector(cvReviewSelector.selectFile);
  return <>{file && <CVPreview fileUrl={file} />}</>;
};

export default CVPreviewer;
