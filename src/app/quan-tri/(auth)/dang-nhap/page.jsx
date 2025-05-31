import LoginForm from '@/components/views/admin/auth/LoginForm';
import Logo from '@/components/views/Logo';
import Spinner from '@/components/views/Spinner';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import {Suspense} from 'react';

const page = () => {
  return (
    <>
      <MainLayout Elem="header">
        <nav className="flex h-[80px] items-center justify-between gap-2">
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/">
                <Logo className="h-10 w-full" />
              </Link>
            </li>
          </ul>
        </nav>
      </MainLayout>
      <div className="flex items-center justify-center">
        <MainLayout className="mt-[10%] w-full max-w-md space-y-4">
          <Suspense fallback={<Spinner isCentered />}>
            <LoginForm />
          </Suspense>
        </MainLayout>
      </div>
    </>
  );
};

export default page;
