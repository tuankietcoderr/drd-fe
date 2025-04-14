import {cn} from '@/lib/utils';

const MainLayout = ({children, className, Elem = 'div'}) => {
  return (
    <Elem className={cn('mx-[5%] max-w-screen-2xl 2xl:mx-auto', className)}>
      {children}
    </Elem>
  );
};

export default MainLayout;
