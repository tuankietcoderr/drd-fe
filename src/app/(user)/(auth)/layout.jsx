import {Separator} from '@/components/ui/separator';
import MainLayout from '@/layout/MainLayout';

const layout = ({children}) => {
  return (
    <div className="flex items-center justify-center">
      <MainLayout className="mt-[5%] max-w-md space-y-4">
        {children}
        <Separator />
        <div className="space-y-2 text-center text-sm">
          <p className="font-semibold">Bạn gặp khó khăn khi tạo tài khoản?</p>
          <p className="text-sm">
            Vui lòng gọi tới số{' '}
            <a href="tel:0399988336" className="font-medium text-primary">
              (+84) 399 988 336
            </a>{' '}
            (giờ hành chính).
          </p>
        </div>
      </MainLayout>
    </div>
  );
};

export default layout;
