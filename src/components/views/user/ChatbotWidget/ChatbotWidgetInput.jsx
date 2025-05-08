'use client';

import Dictaphone from '@/components/Dictaphone';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useChatbotWidgetContext} from '@/context/ChatbotWidgetContext';
import chatbotApi from '@/redux/features/chatbot/chatbotQuery';
import chatbotSelector from '@/redux/features/chatbot/chatbotSelector';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {SendHorizonal} from 'lucide-react';
import {useCallback, useEffect, useState} from 'react';
import {toast} from 'sonner';

const ChatbotWidgetInput = () => {
  const {inputRef} = useChatbotWidgetContext();
  const message = useAppSelector(chatbotSelector.selectMessage);
  const [isListening, setIsListening] = useState(false);
  const canSendMessage = message.trim().length > 0;

  const dispatch = useAppDispatch();
  const chatSessionId = useAppSelector(chatbotSelector.selectChatSessionId);
  const [chatMutation, {isLoading}] = chatbotApi.useChatMutation();

  useEffect(() => {
    dispatch(chatbotActions.setChatLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleSendMessage = e => {
    e.preventDefault();
    if (!canSendMessage) {
      dispatch(chatbotActions.clearMessage());
      toast.error('Vui lòng nhập câu hỏi');
      return;
    }

    dispatch(
      chatbotActions.addChatMessage({
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
        dispatch(
          chatbotActions.replaceLastChatMessage({
            answer: res,
          }),
        );
        dispatch(chatbotActions.clearMessage());
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
      dispatch(chatbotActions.setMessage(text));
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
          onChange={e => dispatch(chatbotActions.setMessage(e.target.value))}
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

export default ChatbotWidgetInput;
