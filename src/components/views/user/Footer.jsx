'use client';

import {Separator} from '@/components/ui/separator';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import Logo from '../Logo';

const SITEMAP = [
  {
    title: 'Về vieclamnkt.top',
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
    <footer className="mt-20">
      <Separator />
      <MainLayout className="flex flex-wrap gap-10 py-10">
        <div className="w-full space-y-4 md:max-w-2xl">
          <Link href="/" className="block w-fit">
            <Logo className="h-40 w-fit" />
          </Link>
          <p>
            vieclamnkt.top - Trung tâm Nghiên cứu và Phát triển Năng lực Người
            khuyết tật
          </p>

          <div className="space-y-1">
            <p className="text-lg font-semibold">Liên hệ</p>
            <ul>
              <li>
                Điện thoại:{' '}
                <a
                  href="tel:0399988336"
                  className="font-medium hover:underline">
                  (+84) 399 988 336
                </a>
              </li>
              <li>
                Email:{' '}
                <a
                  href="mailto:info@vieclamnkt.top"
                  className="font-medium hover:underline">
                  info@vieclamnkt.top
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
                src="https://maps.google.com/maps?q=311K8 KNOTĐC Thủ Thiêm, Đ. Số 7, An Phú, Thủ Đức, Hồ Chí Minh, Việt Nam&output=embed"
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
        © Bản quyền thuộc về vieclamnkt.top 2025. Tất cả quyền được bảo lưu.
      </p>
    </footer>
  );
};

export default Footer;
