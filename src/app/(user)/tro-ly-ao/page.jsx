import ChatHeader from '@/components/views/user/tro-ly-ao/ChatHeader';
import ChatInput from '@/components/views/user/tro-ly-ao/ChatInput';
import ChatMessages from '@/components/views/user/tro-ly-ao/ChatMessages';
import {JobDescriptionChatProvider} from '@/context/JobDescriptionChatContext';
import MainLayout from '@/layout/MainLayout';

const page = () => {
  return (
    <JobDescriptionChatProvider>
      <MainLayout className="mt-10 flex h-[80vh] max-h-[80vh] flex-col overflow-hidden rounded-lg border">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </MainLayout>
    </JobDescriptionChatProvider>
  );
};

export default page;
