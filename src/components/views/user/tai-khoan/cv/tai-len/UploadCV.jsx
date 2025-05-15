'use client';
import {Button} from '@/components/ui/button';
import UploadCV from '@/components/UploadCV';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import uploadApi from '@/redux/features/upload/uploadQuery';
import {useAppDispatch} from '@/redux/hooks';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'sonner';

const UploadUserCV = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [uploadMutation, {isLoading: isUploading, isSuccess: isUploaded}] =
    uploadApi.useUploadFileMutation();
  const [updateCvMutation, {isLoading: isUpdatingCv, isSuccess: isUpdated}] =
    candidateApi.useUpdateCvMutation();
  const [file, setFile] = useState(null);

  const onUpload = file => {
    uploadMutation({file})
      .unwrap()
      .then(res => {
        updateCvMutation({cv: res.url})
          .unwrap()
          .then(res => {
            setFile(file);
            toast.success('Tải lên CV thành công');
          })
          .catch(err => {
            console.log(err);
            toast.error('Tải lên CV thất bại');
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onReview = () => {
    dispatch(cvReviewActions.setFile(file));
    router.push('/danh-gia-cv?source=tai-len-cv');
  };

  return (
    <div className="space-y-4">
      <UploadCV
        onUpload={onUpload}
        isUploading={isUploading || isUpdatingCv}
        onRemove={() => setFile(null)}
      />
      {isUploaded && isUpdated && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">
            Bạn muốn đánh giá CV này?{' '}
            <Button variant="link" onClick={onReview}>
              Nhấn vào đây
            </Button>
          </p>
          <div className="flex items-center gap-1">
            <hr className="w-20" />
            <p className="text-sm">hoặc</p>
            <hr className="w-20" />
          </div>
          <p className="text-sm">
            Xem các công việc phù hợp với CV bạn đã tải lên?{' '}
            <Button variant="link" asChild>
              <Link href="/tai-khoan/cv#viec-lam-phu-hop">Nhấn vào đây</Link>
            </Button>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadUserCV;
