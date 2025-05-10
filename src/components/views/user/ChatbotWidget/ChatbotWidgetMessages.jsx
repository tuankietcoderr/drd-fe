'use client';

import jobDescriptionSelector from '@/redux/features/job-description/jobDescriptionSelector';
import {useAppSelector} from '@/redux/hooks';
import {useRef} from 'react';
import ChatbotWidgetMessageItem from './ChatbotWidgetMessageItem';
import EmptyRoomMessages from './EmptyRoomMessages';
import Generating from './Generating';

const ChatbotWidgetMessages = () => {
  const chatMessages = useAppSelector(
    jobDescriptionSelector.selectChatMessages,
  );
  const isChatLoading = useAppSelector(
    jobDescriptionSelector.selectIsChatLoading,
  );

  const bottomRef = useRef(null);
  return (
    <div className="max-h-[70vh] min-h-[40vh] flex-1 overflow-y-auto p-4 scrollbar-thin">
      <div className="space-y-4 pb-8">
        <div className="flex items-center justify-center">
          <p className="max-w-xl text-center text-xs text-muted-foreground">
            Trợ lý ảo sẽ giúp bạn tìm kiếm việc làm phù hợp với nhu cầu và khả
            năng của bạn. Bạn có thể hỏi về các công việc từ xa, hỗ trợ người
            khuyết tật, hoặc bất kỳ câu hỏi nào liên quan đến việc làm. <br />
            <span className="font-medium">
              Toàn bộ lịch sử trò chuyện sẽ bị xoá khi bạn tải lại trang.
            </span>
          </p>
        </div>
        {chatMessages.length === 0 ? (
          <EmptyRoomMessages />
        ) : (
          chatMessages.map(chatMessage => (
            <ChatbotWidgetMessageItem
              chatMessage={chatMessage}
              key={chatMessage.chat_id}
            />
          ))
        )}
        {isChatLoading && <Generating />}
        <div aria-label="Bottom ref" ref={bottomRef} />
      </div>
      {/* Scroll to bottom when new message is added */}
      {bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })}
    </div>
  );
};

export default ChatbotWidgetMessages;
