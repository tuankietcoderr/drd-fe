import Jobs from '@/components/views/user/Jobs';
import JobSearch from '@/components/views/user/JobSearch';
import Hero from '@/components/views/user/trang-chu/Hero';
import MainLayout from '@/layout/MainLayout';

const page = () => {
  return (
    <>
      <Hero />
      <MainLayout className="mt-10 space-y-8">
        <JobSearch />
        <Jobs />
      </MainLayout>
    </>
  );
};

export default page;
