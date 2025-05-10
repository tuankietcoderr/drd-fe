'use client';
import UploadCV from '@/components/UploadCV';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect} from 'react';

const CVUpload = () => {
  const dispatch = useAppDispatch();
  const file = useAppSelector(cvReviewSelector.selectFile);
  const isCVUploaded = useAppSelector(cvReviewSelector.selectIsCVUploaded);

  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  const onPreviewFile = useCallback(
    file => {
      dispatch(cvReviewActions.setMarkdownContent(''));
      dispatch(cvReviewActions.setSuggestions({}));
      dispatch(cvReviewActions.setFile(file));
      dispatch(cvReviewActions.setIsCVUploaded(true));
    },
    [dispatch],
  );

  useEffect(() => {
    if (file && source === 'tai-len-cv' && !isCVUploaded) {
      onPreviewFile(file);
    }
  }, [file, onPreviewFile, source, isCVUploaded]);

  const onUpload = file => {
    onPreviewFile(file);
  };

  return (
    <div>
      {!isCVUploaded && (
        <UploadCV
          onUpload={onUpload}
          onRemove={() => {
            dispatch(cvReviewActions.setFile(null));
          }}
          initialFile={file}
        />
      )}
    </div>
  );
};

export default CVUpload;
