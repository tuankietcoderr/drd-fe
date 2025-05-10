import ChatHeader from '@/components/views/user/tro-ly-ao/ChatHeader';
import ChatInput from '@/components/views/user/tro-ly-ao/ChatInput';
import ChatMessages from '@/components/views/user/tro-ly-ao/ChatMessages';
import {JobDescriptionChatProvider} from '@/context/JobDescriptionChatContext';
import MainLayout from '@/layout/MainLayout';

const page = () => {
  return (
    <JobDescriptionChatProvider>
      <MainLayout className="flex max-h-screen min-h-screen flex-col overflow-hidden border-x">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </MainLayout>
    </JobDescriptionChatProvider>
  );
};

export default page;
