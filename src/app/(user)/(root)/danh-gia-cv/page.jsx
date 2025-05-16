import Spinner from '@/components/views/Spinner';
import CVPreviewer from '@/components/views/user/danh-gia-cv/CVPreviewer';
import CVReview from '@/components/views/user/danh-gia-cv/CVReview';
import CVUpload from '@/components/views/user/danh-gia-cv/CVUpload';
import MainLayout from '@/layout/MainLayout';
import {Suspense} from 'react';

const page = () => {
  return (
    <MainLayout className="mt-8 space-y-8">
      <Suspense fallback={<Spinner isCentered />}>
        <CVUpload />
      </Suspense>
      <CVReview />
      <CVPreviewer />
    </MainLayout>
  );
};

export default page;
