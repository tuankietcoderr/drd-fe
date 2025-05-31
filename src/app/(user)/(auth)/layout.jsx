import {Separator} from '@/components/ui/separator';
import Logo from '@/components/views/Logo';
import Spinner from '@/components/views/Spinner';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import {Suspense} from 'react';

const layout = ({children}) => {
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
        <MainLayout className="mt-[5%] w-full max-w-md space-y-4">
          <Suspense fallback={<Spinner isCentered />}>{children}</Suspense>
          <Separator />
          <div className="space-y-2 text-center text-sm">
            <p className="font-semibold">Bạn gặp khó khăn khi tạo tài khoản?</p>
            <p className="text-sm">
              Vui lòng gọi tới số{' '}
              <a href="tel:0383396764" className="font-medium text-primary">
                0383396764
              </a>{' '}
              (giờ hành chính).
            </p>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default layout;
