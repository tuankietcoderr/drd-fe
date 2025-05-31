import {cn} from '@/lib/utils';

const MainLayout = ({children, className, Elem = 'div'}) => {
  return (
    <Elem
      className={cn('mx-6 max-w-screen-xl md:mx-[5%] 2xl:mx-auto', className)}>
      {children}
    </Elem>
  );
};

export default MainLayout;
