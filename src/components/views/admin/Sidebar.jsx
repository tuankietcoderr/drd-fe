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
import {ChevronLeft, LayoutDashboard, MapPin, Puzzle} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useCallback} from 'react';

const sidebarData = [
  {
    title: 'Bảng điều khiển',
    url: '/quan-tri',
    icon: LayoutDashboard,
  },
  {
    title: 'Địa điểm',
    url: '/quan-tri/dia-diem',
    icon: MapPin,
  },
  {
    title: 'Ngành nghề',
    url: '/quan-tri/nganh-nghe',
    icon: Puzzle,
  },
];

const AppSidebar = () => {
  const {toggleSidebar} = useSidebar();

  const pathname = usePathname();

  const isActive = useCallback(
    href => {
      if (pathname === '/quan-tri' && href === '/quan-tri') return true;
      if (href !== '/quan-tri' && pathname.startsWith(href)) return true;
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
                  width={40}
                  height={40}
                  className="size-8 rounded-full"
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-md font-semibold">vieclamnkt.top</span>
                  <span className="text-sm">Quản trị viên</span>
                </div>
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
