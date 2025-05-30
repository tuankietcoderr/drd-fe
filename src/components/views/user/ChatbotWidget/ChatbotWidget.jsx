'use client';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ChatbotWidgetProvider} from '@/context/ChatbotWidgetContext';
import {ChevronRight} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import ChatbotWidgetHeader from './ChatbotWidgetHeader';
import ChatbotWidgetInput from './ChatbotWidgetInput';
import ChatbotWidgetMessages from './ChatbotWidgetMessages';

const ChatbotWidget = () => {
  const [showAnimateBadge, setShowAnimateBadge] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimateBadge(true);
    }, 5000); // Show after 5 second

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const onOpenChange = open => {
    setShowWidget(open);
    if (open) {
      setShowAnimateBadge(false); // Hide the badge when the widget is opened
    } else {
      setShowAnimateBadge(true); // Show the badge again when the widget is closed
    }
  };

  return (
    <ChatbotWidgetProvider>
      <Popover open={showWidget} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button className="fixed bottom-8 right-8 z-50 rounded-full border bg-white p-2">
            <Image
              src={'/assets/logo/chatbot.png'}
              width={40}
              height={40}
              alt=""
              className="object-contain"
            />
            {showAnimateBadge && (
              <p className="chatbot-animate absolute inset-y-1 right-full z-[51] mr-4 flex w-max items-center justify-center gap-2 rounded-full bg-primary/95 px-4 text-primary-foreground">
                <span>Tôi có thể giúp gì cho bạn?</span>
                <ChevronRight className="rounded-full bg-white/20 p-1" />
              </p>
            )}
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
