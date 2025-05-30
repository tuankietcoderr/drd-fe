'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  LayoutDashboard,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useCallback} from 'react';

const sidebarData = [
  {
    title: 'Bảng điều khiển',
    url: '/nha-tuyen-dung',
    icon: LayoutDashboard,
  },
  {
    title: 'Việc làm',
    url: '/nha-tuyen-dung/viec-lam',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Hồ sơ công ty',
    url: '/nha-tuyen-dung/ho-so',
    icon: Building2,
  },
];

const AppSidebar = () => {
  const {toggleSidebar} = useSidebar();

  const pathname = usePathname();

  const isActive = useCallback(
    href => {
      if (pathname === '/nha-tuyen-dung' && href === '/nha-tuyen-dung')
        return true;
      if (href !== '/nha-tuyen-dung' && pathname.startsWith(href)) return true;
      return false;
    },
    [pathname],
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={toggleSidebar}
              size="lg"
              asChild>
              <a>
                <Image
                  src="/assets/logo/DRD_LOGO_FIT.svg"
                  alt="logo"
                  width={80}
                  height={60}
                  className="h-8 w-12"
                />
                <p className="text-sm">Nhà tuyển dụng</p>
                <div className="ml-auto">
                  <ChevronLeft className="size-5" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="scrollbar-none">
        <SidebarMenu className="mx-2 my-4">
          {sidebarData.map(item =>
            item.isHidden ? null : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive(item.url)}
                  className="gap-3 py-5 group-data-[collapsible=icon]:my-1"
                  asChild>
                  <Link href={item.url}>
                    <item.icon className="size-5" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
