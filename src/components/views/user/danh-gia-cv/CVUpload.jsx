'use client';
import UploadCV from '@/components/UploadCV';
import cvReviewApi from '@/redux/features/cv-review/cvReviewQuery';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect} from 'react';

const CVUpload = () => {
  const dispatch = useAppDispatch();
  const [preReviewCVMutation, {isLoading}] = cvReviewApi.usePreReviewMutation();
  const file = useAppSelector(cvReviewSelector.selectFile);
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  const onPreviewFile = useCallback(
    file => {
      dispatch(cvReviewActions.setFile(file));
    },
    [dispatch],
  );

  useEffect(() => {
    if (file && source === 'tai-len-cv') {
      onPreviewFile(file);
    }
  }, [file, onPreviewFile, source]);

  const onUpload = file => {
    onPreviewFile(file);
  };

  return (
    <div>
      <UploadCV
        onUpload={onUpload}
        onRemove={() => {
          dispatch(cvReviewActions.setFile(null));
        }}
        isUploading={isLoading}
        initialFile={file}
      />
    </div>
  );
};

export default CVUpload;
