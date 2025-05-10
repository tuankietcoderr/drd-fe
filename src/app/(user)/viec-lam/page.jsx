import Jobs from '@/components/views/user/Jobs';
import JobFilter from '@/components/views/user/viec-lam/JobFilter';
import MainLayout from '@/layout/MainLayout';

const page = () => {
  return (
    <MainLayout className="mt-10 flex gap-8">
      <JobFilter />
      <Jobs />
    </MainLayout>
  );
};

export default page;
