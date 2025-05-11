import JobDetail from '@/components/views/user/viec-lam/JobDetail';
import MainLayout from '@/layout/MainLayout';

const page = async ({params}) => {
  const {id} = await params;

  return (
    <MainLayout className="mt-10">
      <JobDetail jobId={id} />
    </MainLayout>
  );
};

export default page;
