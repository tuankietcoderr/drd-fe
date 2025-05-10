'use client';

import jobDescriptionSelector from '@/redux/features/chatbot/chatbotSelector';
import jobDescriptionApi from '@/redux/features/job-description/jobDescriptionQuery';
import {jobDescriptionActions} from '@/redux/features/job-description/jobDescriptionSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {ChatbotWidgetSessionIdUtils} from '@/utils/token-utils';
import {Trash2} from 'lucide-react';
import {toast} from 'sonner';
import Spinner from '../../Spinner';

const ChatbotWidgetHeader = () => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(
    jobDescriptionSelector.selectChatMessages,
  );
  const [deleteSessionMutation, {isLoading}] =
    jobDescriptionApi.useDeleteSessionMutation();

  const hasMessage = chatMessages.length > 0;

  const handleDeleteChat = () => {
    const res = confirm('Xóa tất cả tin nhắn trong phòng chat?');
    if (res) {
      const sessionId = ChatbotWidgetSessionIdUtils.getToken();
      if (!sessionId) return;
      const toastId = toast.loading('Đang xoá đoạn hội thoại', {
        duration: 0,
      });
      deleteSessionMutation({sessionId})
        .unwrap()
        .then(() => {
          toast.dismiss(toastId);
          ChatbotWidgetSessionIdUtils.removeToken();
          dispatch(jobDescriptionActions.reset());
          toast.success('Xoá đoạn hội thoại thành công');
        })
        .catch(err => {
          console.log('Error deleting session:', err);
          toast.dismiss(toastId);
          toast.error('Có lỗi xảy ra trong quá trình xoá đoạn hội thoại');
        });
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <h1 className="font-semibold">Trợ lý ảo</h1>
      {hasMessage && isLoading ? (
        <Spinner />
      ) : (
        <button onClick={handleDeleteChat}>
          <Trash2 className="text-destructive/80" size={20} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidgetHeader;
