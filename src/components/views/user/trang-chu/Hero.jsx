'use client';
import {Button} from '@/components/ui/button';
import MainLayout from '@/layout/MainLayout';
import {Search} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const heroImages = Array.from({length: 8}, (_, i) => ({
  id: `hero-${i}`,
  src: `/assets/hero/${i}.jpg`,
}));

const Hero = () => {
  return (
    <div className="relative">
      {/* <Swiper
        slidesPerView={1}
        autoplay={{delay: 5000}}
        fadeEffect={{crossFade: true}}
        effect="fade"
        loop={true}
        height={500}
        style={{
          height: '500px',
          width: '100%',
        }}
        modules={[Autoplay, EffectFade]}>
        {heroImages.map(image => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.src}
              alt={`Hero Image ${image.id}`}
              width={965}
              height={286}
              className="size-full object-cover"
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <Image
        src="/assets/hero/hero.png"
        alt="Hero Image"
        width={1080}
        height={720}
        className="h-[70vh] w-full object-cover object-top"
        quality={100}
        priority
      />
      <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/90 to-black/20 pb-8">
        <MainLayout className="w-full space-y-6">
          <h2 className="text-xl font-bold text-white md:text-4xl">
            Chào mừng bạn đến với{' '}
            <span className="text-primary">vieclamnkt.top</span>
            <br />
            Nền tảng tìm kiếm việc làm và tuyển dụng dành cho người khuyết tật
            Việt Nam
          </h2>
          <p className="mt-4 text-white md:text-lg">
            Tìm kiếm việc làm dễ dàng, nhanh chóng và hiệu quả nhất cho người
            khuyết tật hoặc tuyển dụng nhân sự phù hợp với nhu cầu của doanh
            nghiệp.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/viec-lam">
              <Button>
                <Search />
                Tìm việc ngay
              </Button>
            </Link>
            <Link
              href="/nha-tuyen-dung"
              target="_blank"
              rel="noopener noreferrer">
              <Button variant="outline">Đăng tuyển ngay</Button>
            </Link>
          </div>
        </MainLayout>
      </div>
    </div>
  );
};

export default Hero;
