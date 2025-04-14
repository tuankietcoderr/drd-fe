import Footer from '@/components/views/user/Footer';
import NavigationBar from '@/components/views/user/NavigationBar';

const layout = ({children}) => {
  return (
    <>
      <NavigationBar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
