import NavigationBar from '@/components/views/user/NavigationBar';
import UserFetchDataProviders from '../(root)/user-fetch-data-providers';

const layout = ({children}) => {
  return (
    <>
      <NavigationBar />
      {children}
      <UserFetchDataProviders />
    </>
  );
};

export default layout;
