import CVOptimizeCTA from '@/components/views/user/tai-khoan/CVOptimizeCTA';
import UserProfileDetail from '@/components/views/user/tai-khoan/UserProfileDetail';
import MainLayout from '@/layout/MainLayout';

const layout = ({children}) => {
  return (
    <MainLayout className="mt-10 flex gap-8">
      <div className="flex-1">{children}</div>
      <aside className="w-full max-w-[360px] space-y-4">
        <UserProfileDetail />
        <CVOptimizeCTA />
      </aside>
    </MainLayout>
  );
};

export default layout;
