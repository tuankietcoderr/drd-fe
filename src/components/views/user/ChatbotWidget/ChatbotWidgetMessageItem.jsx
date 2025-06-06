import MarkdownRender from '@/components/MarkdownRender';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import {User, Volume2} from 'lucide-react';
import Image from 'next/image';

const ChatbotWidgetMessageItem = ({chatMessage}) => {
  const {isSpeaking, startSpeech, stopSpeech} = useTextToSpeech({
    lang: 'vi-VN',
  });
  return (
    <div className="flex flex-col gap-2">
      {chatMessage.chat_message && (
        <div className="flex gap-2">
          <div className="flex size-6 items-center justify-center rounded-full border bg-white p-1 dark:border-gray-700">
            <User size={16} className="text-black" />
          </div>

          <div className="max-w-xl space-y-1 self-start rounded-lg bg-primary/80 px-3 py-2 dark:bg-primary-foreground/80">
            <p className="text-sm text-primary-foreground dark:text-white/90">
              {chatMessage.chat_message}
            </p>
          </div>
        </div>
      )}
      {chatMessage.answer && (
        <div className="flex gap-2">
          <div className="size-6 overflow-hidden rounded-full border bg-white p-1 dark:border-gray-700">
            <Image
              src={'/assets/logo/chatbot.png'}
              width={40}
              height={40}
              alt=""
              className="object-contain"
            />
          </div>
          <div className="max-w-xl space-y-1 self-start rounded-lg border bg-card px-3 py-2">
            <MarkdownRender className="text-sm text-card-foreground">
              {chatMessage.answer}
            </MarkdownRender>
            {isSpeaking ? (
              <Volume2
                onClick={e => {
                  e.stopPropagation();
                  stopSpeech();
                }}
                className="animate-pulse cursor-pointer text-primary"
                size={16}
              />
            ) : (
              <Volume2
                size={16}
                onClick={e => {
                  e.stopPropagation();
                  startSpeech(chatMessage.plain_answer || chatMessage.answer);
                }}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidgetMessageItem;
