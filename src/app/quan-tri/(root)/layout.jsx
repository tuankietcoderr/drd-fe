import {SidebarProvider} from '@/components/ui/sidebar';
import Header from '@/components/views/admin/Header';
import AppSidebar from '@/components/views/admin/Sidebar';
import AdminFetchDataProviders from './admin-fetch-data-providers';

const layout = ({children}) => {
  return (
    <>
      <SidebarProvider>
        <main className="flex h-screen w-full overflow-x-hidden">
          <AppSidebar />
          <div className="relative flex flex-1 flex-col">
            <Header />
            <div className="flex-1 p-4 md:p-10">{children}</div>
          </div>
        </main>
      </SidebarProvider>
      <AdminFetchDataProviders />
    </>
  );
};

export default layout;
