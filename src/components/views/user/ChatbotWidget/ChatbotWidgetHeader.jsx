'use client';

import jobDescriptionSelector from '@/redux/features/chatbot/chatbotSelector';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {ChatbotWidgetSessionIdUtils} from '@/utils/token-utils';
import {Trash2} from 'lucide-react';

const ChatbotWidgetHeader = () => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(
    jobDescriptionSelector.selectChatMessages,
  );
  const hasMessage = chatMessages.length > 0;

  const handleDeleteChat = () => {
    const res = confirm('Xóa tất cả tin nhắn trong phòng chat?');
    if (res) {
      ChatbotWidgetSessionIdUtils.removeToken();
      dispatch(chatbotActions.reset());
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b p-2">
      <h1 className="font-semibold">Trợ lý ảo</h1>
      {hasMessage && (
        <button onClick={handleDeleteChat}>
          <Trash2 className="text-destructive/80" size={20} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidgetHeader;
