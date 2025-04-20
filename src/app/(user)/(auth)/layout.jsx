import {Separator} from '@/components/ui/separator';
import MainLayout from '@/layout/MainLayout';
import {redirect} from 'next/navigation';

const layout = ({children}) => {
  const isAuth = false; // Replace with actual authentication check

  if (isAuth) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center">
      <MainLayout className="mt-[5%] max-w-md space-y-4">
        {children}
        <Separator />
        <div className="space-y-2 text-center text-sm">
          <p className="font-semibold">Bạn gặp khó khăn khi tạo tài khoản?</p>
          <p className="text-sm">
            Vui lòng gọi tới số{' '}
            <a href="tel:0839320483" className="font-medium text-primary">
              08.3932.0483
            </a>{' '}
            (giờ hành chính).
          </p>
        </div>
      </MainLayout>
    </div>
  );
};

export default layout;
