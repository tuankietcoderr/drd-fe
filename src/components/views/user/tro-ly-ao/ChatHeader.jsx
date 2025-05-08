'use client';

import jobDescriptionSelector from '@/redux/features/job-description/jobDescriptionSelector';
import {jobDescriptionActions} from '@/redux/features/job-description/jobDescriptionSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {JobDescriptionSessionIdUtils} from '@/utils/token-utils';
import {Trash2} from 'lucide-react';

const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(
    jobDescriptionSelector.selectChatMessages,
  );
  const hasMessage = chatMessages.length > 0;

  const handleDeleteChat = () => {
    const res = confirm('Xóa tất cả tin nhắn trong phòng chat?');
    if (res) {
      JobDescriptionSessionIdUtils.removeToken();
      dispatch(jobDescriptionActions.reset());
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <div>
        <h1 className="font-semibold">
          Trợ lý ảo - Hỗ trợ tìm việc làm cho người khuyết tật
        </h1>
      </div>
      {hasMessage && (
        <button onClick={handleDeleteChat}>
          <Trash2 className="text-destructive/80" size={20} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
