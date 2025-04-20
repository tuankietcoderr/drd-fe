'use client';

import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MainLayout from '@/layout/MainLayout';
import {cn} from '@/lib/utils';
import authSelector from '@/redux/features/auth/authSelector';
import {authActions} from '@/redux/features/auth/authSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useCallback} from 'react';
import {Button} from '../../ui/button';
import Logo from '../Logo';

const ROUTES = [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Việc làm',
    href: '/viec-lam',
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
  const isAuthenticated = useAppSelector(authSelector.selectIsAuthenticated);
  const user = useAppSelector(authSelector.selectUser);
  const dispatch = useAppDispatch();

  const url = useCallback(
    href => {
      if (pathname === href) {
        return href;
      }
      return `${href}?fallbackUrl=${pathname}`;
    },
    [pathname],
  );

  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
    location.href = '/';
  }, [dispatch]);

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
          {!isAuthenticated && (
            <li>
              <Button asChild variant="outline">
                <Link href={url('/dang-nhap')}>Đăng nhập</Link>
              </Button>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Button asChild>
                <Link href={url('/dang-ky')}>Đăng ký</Link>
              </Button>
            </li>
          )}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>{user.name.at(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                align="end" // Aligns to the end (right) of the trigger
                alignOffset={-5} // Shifts the menu left by 5px
                sideOffset={5}>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/tai-khoan">Tài khoản</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <li>
            <Button
              asChild
              variant="outline"
              className="bg-tertiary text-tertiary-foreground">
              <Link
                href="/nha-tuyen-dung"
                target="_blank"
                rel="noopener noreferrer">
                Dành cho nhà tuyển dụng
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </MainLayout>
  );
};

export default NavigationBar;
