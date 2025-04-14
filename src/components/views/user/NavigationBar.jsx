import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import {Button} from '../../ui/button';
import Logo from '../Logo';

const NavigationBar = () => {
  return (
    <MainLayout className="py-4" Elem="header">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/">
              <Logo className="h-10 w-full" />
            </Link>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/">Trang chủ</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/tro-ly-ao">Trợ lý ảo</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/ho-tro">Hỗ trợ</Link>
            </Button>
          </li>
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
