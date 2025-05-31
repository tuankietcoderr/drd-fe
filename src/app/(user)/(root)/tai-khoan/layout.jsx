import UserProfileDetail from '@/components/views/user/tai-khoan/UserProfileDetail';
import MainLayout from '@/layout/MainLayout';

const layout = ({children}) => {
  return (
    <MainLayout className="mt-10 flex flex-col-reverse gap-8 md:flex-row">
      <div className="flex-1">{children}</div>
      <aside className="w-full space-y-4 md:max-w-[360px]">
        <UserProfileDetail />
        {/* <CVOptimizeCTA /> */}
      </aside>
    </MainLayout>
  );
};

export default layout;
