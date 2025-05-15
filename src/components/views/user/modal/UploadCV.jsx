'use client';
import {default as MUploadCV} from '@/components/UploadCV';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import uploadApi from '@/redux/features/upload/uploadQuery';
import {toast} from 'sonner';

const UploadCV = () => {
  const [uploadFileMutation, {isLoading}] = uploadApi.useUploadFileMutation();
  const [updateCvMutation, {isLoading: isUpdating}] =
    candidateApi.useUpdateCvMutation();
  const onUploadCV = file => {
    uploadFileMutation({file})
      .unwrap()
      .then(res => {
        console.log('Upload CV success', res);
        updateCvMutation({cv: res.url})
          .unwrap()
          .then(res => {
            console.log('Update CV success', res);
            toast.success('Tải lên CV thành công');
          })
          .catch(err => {
            console.log('Update CV error', err);
            toast.error('Cập nhật CV thất bại');
          });
      })
      .catch(err => {
        console.log('Upload CV error', err);
        toast.error('Tải lên CV thất bại');
      });
  };
  return (
    <MUploadCV onUpload={onUploadCV} isUploading={isLoading || isUpdating} />
  );
};

export default UploadCV;
