import NavigationBar from '@/components/views/user/NavigationBar';

const layout = ({children}) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default layout;
