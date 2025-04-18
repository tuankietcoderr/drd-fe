'use client';

import {Separator} from '@/components/ui/separator';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import Logo from '../Logo';

const SITEMAP = [
  {
    title: 'Về DrD',
    children: [
      {
        title: 'Giới thiệu',
        href: '#',
      },
      {
        title: 'Góc báo chí',
        href: '#',
      },
      {
        title: 'Tuyển dụng',
        href: '#',
      },
      {
        title: 'Liên hệ',
        href: '#',
      },
      {
        title: 'Hỗ trợ',
        href: '#',
      },
      {
        title: 'Chính sách bảo mật',
        href: '#',
      },
      {
        title: 'Điều khoản sử dụng',
        href: '#',
      },
    ],
  },
  {
    title: 'Dành cho người tìm việc',
    children: [
      {
        title: 'Tìm kiếm việc làm',
        href: '#',
      },
      {
        title: 'Đăng ký tìm việc',
        href: '#',
      },
      {
        title: 'Hồ sơ của tôi',
        href: '#',
      },
      {
        title: 'Đăng nhập',
        href: '#',
      },
    ],
  },
  {
    title: 'Dành cho nhà tuyển dụng',
    children: [
      {
        title: 'Đăng tin tuyển dụng',
        href: '#',
      },
      {
        title: 'Quản lý tin tuyển dụng',
        href: '#',
      },
      {
        title: 'Đăng nhập',
        href: '#',
      },
    ],
  },
  {
    title: 'Xây dựng sự nghiệp',
    children: [
      {
        title: 'Việc làm tốt nhất',
        href: '#',
      },
      {
        title: 'Việc làm lương cao',
        href: '#',
      },
      {
        title: 'Việc làm quản lý',
        href: '#',
      },
      {
        title: 'Việc làm theo ngành nghề',
        href: '#',
      },
      {
        title: 'Việc làm theo khu vực',
        href: '#',
      },
      {
        title: 'Việc làm theo công ty',
        href: '#',
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <Separator />
      <MainLayout className="flex flex-wrap gap-10 py-10">
        <div className="w-full space-y-4 md:max-w-2xl">
          <Link href="/" className="block w-fit">
            <Logo className="h-40 w-fit" />
          </Link>
          <p>
            Sở Lao Động - Thương Binh và Xã Hội TP.HCM
            <br />
            Trung tâm bảo trợ - dạy nghề và tạo việc làm cho người tàn tật Thành
            phố Hồ Chí Minh
          </p>

          <div className="space-y-1">
            <p className="text-lg font-semibold">Liên hệ</p>
            <ul>
              <li>
                Điện thoại:{' '}
                <a
                  href="tel:0839320483"
                  className="font-medium hover:underline">
                  08.3932.0483
                </a>
              </li>
              <li>
                Fax:{' '}
                <a
                  href="tel:0839327177"
                  className="font-medium hover:underline">
                  08.3932.7177
                </a>
              </li>
              <li>
                Email:{' '}
                <a
                  href="mailto:hotro@vieclamnkt.vn"
                  className="font-medium hover:underline">
                  hotro@vieclamnkt.vn
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="text-lg font-semibold">Địa chỉ</p>
            <div className="relative h-0 overflow-hidden rounded-lg pb-[50%]">
              <iframe
                className="absolute left-0 top-0 size-full border-none"
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=215+V%C3%B5+Th%E1%BB%8B+S%C3%A1u%2C+Ph%C6%B0%E1%BB%9Dng+7%2C+Qu%E1%BA%ADn+3%2C+Th%C3%A0nh+Ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh&output=embed"
              />
            </div>
          </div>
        </div>
        <div className="grid h-fit flex-1 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
          {SITEMAP.map((item, index) => (
            <div key={index} className="h-fit space-y-4">
              <p className="text-lg font-semibold">{item.title}</p>
              <ul className="space-y-2">
                {item.children.map((child, index) => (
                  <li key={index}>
                    <Link
                      href={child.href}
                      className="text-sm text-muted-foreground hover:underline">
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MainLayout>
      <Separator />
      <p className="bg-primary py-4 text-center text-sm font-medium text-primary-foreground">
        © Bản quyền thuộc về DrD 2025. Tất cả quyền được bảo lưu.
      </p>
    </footer>
  );
};

export default Footer;
