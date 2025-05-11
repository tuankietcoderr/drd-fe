import CVUpload from '@/components/views/user/tim-viec-nhanh/CVUpload';
import MainLayout from '@/layout/MainLayout';

const page = () => {
  return (
    <MainLayout className="mt-8 space-y-8">
      <CVUpload />
    </MainLayout>
  );
};

export default page;
