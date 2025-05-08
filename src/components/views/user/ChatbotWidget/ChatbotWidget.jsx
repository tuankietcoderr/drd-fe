'use client';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ChatbotWidgetProvider} from '@/context/ChatbotWidgetContext';
import Image from 'next/image';
import ChatbotWidgetHeader from './ChatbotWidgetHeader';
import ChatbotWidgetInput from './ChatbotWidgetInput';
import ChatbotWidgetMessages from './ChatbotWidgetMessages';

const ChatbotWidget = () => {
  return (
    <ChatbotWidgetProvider>
      <Popover>
        <PopoverTrigger asChild>
          <button className="fixed bottom-8 right-8 z-50 overflow-hidden rounded-full border bg-white p-2">
            <Image
              src={'/assets/logo/chatbot.png'}
              width={40}
              height={40}
              alt=""
              className="object-contain"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[40rem] p-0" align="end">
          <ChatbotWidgetHeader />
          <ChatbotWidgetMessages />
          <ChatbotWidgetInput />
        </PopoverContent>
      </Popover>
    </ChatbotWidgetProvider>
  );
};

export default ChatbotWidget;
