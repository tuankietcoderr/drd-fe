'use client';
import {Button} from '@/components/ui/button';
import UploadCV from '@/components/UploadCV';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch} from '@/redux/hooks';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const UploadUserCV = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const onUpload = file => {
    setIsUploading(true);
    setTimeout(() => {
      setFile(file);
      setIsUploading(false);
    }, 2000);
  };

  const onReview = () => {
    dispatch(cvReviewActions.setFile(file));
    router.push('/danh-gia-cv?source=tai-len-cv');
  };

  return (
    <div className="space-y-4">
      <UploadCV onUpload={onUpload} isUploading={isUploading} />
      {file && (
        <div className="flex justify-center">
          <p className="text-sm">
            Bạn muốn đánh giá CV này?{' '}
            <Button variant="link" onClick={onReview}>
              Nhấn vào đây
            </Button>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadUserCV;
