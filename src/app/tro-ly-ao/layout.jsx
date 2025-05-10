import NavigationBar from '@/components/views/user/NavigationBar';
export const dynamic = 'force-dynamic';
const layout = ({children}) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default layout;
