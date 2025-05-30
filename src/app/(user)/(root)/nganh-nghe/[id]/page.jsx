import CategoryJobCount from '@/components/views/user/nganh-nghe/CategoryJobCount';
import Jobs from '@/components/views/user/nganh-nghe/Jobs';
import MainLayout from '@/layout/MainLayout';

const page = async ({params}) => {
  const {id} = await params;
  return (
    <MainLayout className="mt-10 space-y-8">
      <Jobs occupationId={id} />
      <CategoryJobCount currentOccupation={id} />
    </MainLayout>
  );
};

export default page;
