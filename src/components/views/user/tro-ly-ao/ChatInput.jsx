'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useJobDescriptionChatContext} from '@/context/JobDescriptionChatContext';
import jobDescriptionApi from '@/redux/features/job-description/jobDescriptionQuery';
import jobDescriptionSelector from '@/redux/features/job-description/jobDescriptionSelector';
import {jobDescriptionActions} from '@/redux/features/job-description/jobDescriptionSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {SendHorizonal} from 'lucide-react';
import {useCallback, useEffect, useState} from 'react';
import {toast} from 'sonner';
import Dictaphone from '../../../Dictaphone';

const ChatInput = () => {
  const {inputRef} = useJobDescriptionChatContext();
  const message = useAppSelector(jobDescriptionSelector.selectMessage);
  const [isListening, setIsListening] = useState(false);
  const canSendMessage = message.trim().length > 0;

  const dispatch = useAppDispatch();
  const chatSessionId = useAppSelector(
    jobDescriptionSelector.selectChatSessionId,
  );
  const [chatMutation, {isLoading}] = jobDescriptionApi.useChatMutation();

  useEffect(() => {
    dispatch(jobDescriptionActions.setChatLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleSendMessage = e => {
    e.preventDefault();
    if (!canSendMessage) {
      dispatch(jobDescriptionActions.clearMessage());
      toast.error('Vui lòng nhập câu hỏi');
      return;
    }

    dispatch(
      jobDescriptionActions.addChatMessage({
        chat_id: crypto.randomUUID(),
        chat_message: message,
      }),
    );

    chatMutation({
      session_id: chatSessionId,
      message,
    })
      .unwrap()
      .then(res => {
        dispatch(jobDescriptionActions.replaceLastChatMessage(res));
        dispatch(jobDescriptionActions.clearMessage());
      })
      .catch(err => {
        console.error('Error sending message:', err);
        toast.error('Có lỗi xảy ra trong quá trình gửi tin nhắn');
      })
      .finally(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
  };

  const handleSpeech = useCallback(
    text => {
      dispatch(jobDescriptionActions.setMessage(text));
    },
    [dispatch],
  );

  return (
    <div className="flex w-full gap-2 border-t p-4">
      <Dictaphone onSpeech={handleSpeech} onListeningChange={setIsListening} />
      <form onSubmit={handleSendMessage} className="flex w-full gap-2">
        <Input
          autoFocus
          ref={inputRef}
          type="text"
          autoComplete="off"
          value={message}
          onChange={e =>
            dispatch(jobDescriptionActions.setMessage(e.target.value))
          }
          placeholder="Nhập câu hỏi của bạn"
          className="w-full"
          disabled={isLoading || isListening}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={isLoading || isListening || !canSendMessage}
          title="Gửi câu hỏi">
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
