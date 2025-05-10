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
import {jwtDecode} from '@/utils/decoder';
import {AccessTokenUtils} from '@/utils/token-utils';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useCallback, useEffect} from 'react';
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
    name: 'Đánh giá CV',
    href: '/danh-gia-cv',
  },
];

const NavigationBar = () => {
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(authSelector.selectIsAuthenticated);
  const user = useAppSelector(authSelector.selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const decodedToken = jwtDecode(AccessTokenUtils.getToken());
    dispatch(authActions.setUser(decodedToken));
  }, [dispatch]);
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
    <MainLayout Elem="header">
      <nav className="flex h-[80px] items-center justify-between">
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
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{user.name.at(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/tai-khoan/cv">CV của tôi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tai-khoan/lich-su-ung-tuyen">
                    Việc làm đã ứng tuyển
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/tai-khoan/cai-dat-thong-tin-ca-nhan">
                    Cài đặt thông tin cá nhân
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive">
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
