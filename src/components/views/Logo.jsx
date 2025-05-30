import Image from 'next/image';

/**
 *
 * @param {import('next/image').ImageProps} props
 * @returns
 */
const Logo = props => {
  return (
    <Image
      src="/assets/logo/DRD_LOGO_FIT.svg"
      alt="vieclamnkt.top Logo"
      width={200}
      height={60}
      priority
      {...props}
    />
  );
};

export default Logo;
