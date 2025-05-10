'use client';

import chatbotSelector from '@/redux/features/chatbot/chatbotSelector';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {JobDescriptionSessionIdUtils} from '@/utils/token-utils';
import {Trash2} from 'lucide-react';

const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(chatbotSelector.selectChatMessages);
  const hasMessage = chatMessages.length > 0;

  const handleDeleteChat = () => {
    const res = confirm('Xóa tất cả tin nhắn trong phòng chat?');
    if (res) {
      JobDescriptionSessionIdUtils.removeToken();
      dispatch(chatbotActions.reset());
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <h1 className="font-semibold">
        Trợ lý ảo - Hỏi đáp sổ tay người khuyết tật
      </h1>
      {hasMessage && (
        <button onClick={handleDeleteChat}>
          <Trash2 className="text-destructive/80" size={20} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
