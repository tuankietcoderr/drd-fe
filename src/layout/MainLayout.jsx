import {cn} from '@/lib/utils';

const MainLayout = ({children, className, Elem = 'div'}) => {
  return (
    <Elem className={cn('2xl:px-auto max-w-screen-2xl px-[5%]', className)}>
      {children}
    </Elem>
  );
};

export default MainLayout;
