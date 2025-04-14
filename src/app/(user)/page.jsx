import MainLayout from '@/layout/MainLayout';
import Hero from '@views/user/home/Hero';
import JobSearch from '@views/user/home/JobSearch';

const page = () => {
  return (
    <>
      <Hero />
      <MainLayout className="mt-10">
        <JobSearch />
      </MainLayout>
    </>
  );
};

export default page;
