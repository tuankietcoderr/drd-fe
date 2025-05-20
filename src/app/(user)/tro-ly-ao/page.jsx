import ChatHeader from '@/components/views/user/tro-ly-ao/ChatHeader';
import ChatInput from '@/components/views/user/tro-ly-ao/ChatInput';
import ChatMessages from '@/components/views/user/tro-ly-ao/ChatMessages';
import {JobDescriptionChatProvider} from '@/context/JobDescriptionChatContext';
import MainLayout from '@/layout/MainLayout';

const page = () => {
  return (
    <JobDescriptionChatProvider>
      <MainLayout className="flex max-h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] flex-col overflow-hidden rounded-t-lg border-x border-t">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </MainLayout>
    </JobDescriptionChatProvider>
  );
};

export default page;
