'use client';

import MainLayout from '@/layout/MainLayout';
import {cn} from '@/lib/utils';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from '../../ui/button';
import Logo from '../Logo';

const ROUTES = [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Trợ lý ảo',
    href: '/tro-ly-ao',
  },
  {
    name: 'Hỗ trợ',
    href: '/ho-tro',
  },
];

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <MainLayout className="py-4" Elem="header">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/">
              <Logo className="h-10 w-full" />
            </Link>
          </li>

          {ROUTES.map(route => {
            const isActive = pathname === route.href;

            return (
              <li key={route.href}>
                <Button asChild variant="ghost">
                  <Link
                    href={route.href}
                    className={cn({
                      '!text-primary': isActive,
                    })}>
                    {route.name}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
        <ul className="flex items-center gap-2">
          <li>
            <Button asChild variant="outline">
              <Link href="/dang-nhap">Đăng nhập</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/dang-ky">Đăng ký</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="outline"
              className="bg-tertiary text-tertiary-foreground">
              <Link href="/nha-tuyen-dung">Dành cho nhà tuyển dụng</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </MainLayout>
  );
};

export default NavigationBar;
