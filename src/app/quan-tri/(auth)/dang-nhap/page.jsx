import LoginForm from '@/components/views/admin/auth/LoginForm';
import Spinner from '@/components/views/Spinner';
import MainLayout from '@/layout/MainLayout';
import {Suspense} from 'react';

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <MainLayout className="mt-[10%] w-full max-w-md space-y-4">
        <Suspense fallback={<Spinner isCentered />}>
          <LoginForm />
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default page;
