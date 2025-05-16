import ChatbotWidget from '@/components/views/user/ChatbotWidget/ChatbotWidget';
import Footer from '@/components/views/user/Footer';
import NavigationBar from '@/components/views/user/NavigationBar';
import UserFetchDataProviders from './user-fetch-data-providers';

const layout = ({children}) => {
  return (
    <>
      <NavigationBar />
      <main className="min-h-[80vh]">{children}</main>
      <ChatbotWidget />
      <Footer />
      <UserFetchDataProviders />
    </>
  );
};

export default layout;
