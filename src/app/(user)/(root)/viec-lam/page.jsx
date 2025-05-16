import Spinner from '@/components/views/Spinner';
import JobFilter from '@/components/views/user/viec-lam/JobFilter';
import Jobs from '@/components/views/user/viec-lam/Jobs';
import MainLayout from '@/layout/MainLayout';
import {Suspense} from 'react';

const page = () => {
  return (
    <MainLayout className="mt-10 flex gap-8">
      <Suspense fallback={<Spinner isCentered />}>
        <JobFilter />
        <Jobs />
      </Suspense>
    </MainLayout>
  );
};

export default page;
