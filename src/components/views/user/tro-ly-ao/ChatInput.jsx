'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useJobDescriptionChatContext} from '@/context/JobDescriptionChatContext';
import chatbotApi from '@/redux/features/chatbot/chatbotQuery';
import chatbotSelector from '@/redux/features/chatbot/chatbotSelector';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {SendHorizonal} from 'lucide-react';
import {useCallback, useEffect, useState} from 'react';
import {toast} from 'sonner';
import {v4} from 'uuid';
import Dictaphone from '../../../Dictaphone';

const ChatInput = () => {
  const {inputRef} = useJobDescriptionChatContext();
  const message = useAppSelector(chatbotSelector.selectMessage);
  const [isListening, setIsListening] = useState(false);
  const canSendMessage = message.trim().length > 0;

  const dispatch = useAppDispatch();
  const chatSessionId = useAppSelector(chatbotSelector.selectChatSessionId);
  const [chatMutation, {isLoading}] = chatbotApi.useChatMutation();
  const [chatStreamMutation, {isLoading: isStreaming}] =
    chatbotApi.useChatStreamMutation();

  useEffect(() => {
    dispatch(chatbotActions.setChatLoading(isLoading || isStreaming));
  }, [isLoading, dispatch, isStreaming]);

  const handleSendMessage = e => {
    e.preventDefault();
    if (!canSendMessage) {
      dispatch(chatbotActions.clearMessage());
      toast.error('Vui lòng nhập câu hỏi');
      return;
    }

    dispatch(
      chatbotActions.addChatMessage({
        chat_id: v4(),
        chat_message: message,
      }),
    );

    chatStreamMutation({
      session_id: chatSessionId,
      message,
    })
      .unwrap()
      .then(async res => {
        const reader = res.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        while (true) {
          const {done, value} = await reader.read();
          if (done) {
            dispatch(chatbotActions.clearMessage());
            if (inputRef.current) {
              inputRef.current.focus();
            }
            break;
          }
          if (value) {
            dispatch(chatbotActions.replaceLastChatStreamingMessage(value));
          }
        }
      })
      .catch(err => {
        console.log('Error sending message:', err);
        dispatch(
          chatbotActions.replaceLastChatMessage({
            answer:
              'Có lỗi xảy ra trong quá trình gửi tin nhắn. Vui lòng thử lại sau.',
          }),
        );
      });

    // chatMutation({
    //   session_id: chatSessionId,
    //   message,
    // })
    //   .unwrap()
    //   .then(res => {
    //     dispatch(
    //       chatbotActions.replaceLastChatMessage({
    //         answer: res,
    //       }),
    //     );
    //     dispatch(chatbotActions.clearMessage());
    //   })
    //   .catch(err => {
    //     console.log('Error sending message:', err);
    //     dispatch(
    //       chatbotActions.replaceLastChatMessage({
    //         answer:
    //           'Có lỗi xảy ra trong quá trình gửi tin nhắn. Vui lòng thử lại sau.',
    //       }),
    //     );
    //     dispatch(chatbotActions.clearMessage());
    //     toast.error('Có lỗi xảy ra trong quá trình gửi tin nhắn');
    //   })
    //   .finally(() => {
    //     if (inputRef.current) {
    //       inputRef.current.focus();
    //     }
    //   });
  };

  const handleSpeech = useCallback(
    text => {
      dispatch(chatbotActions.setMessage(text));
    },
    [dispatch],
  );

  return (
    <div className="flex w-full gap-2 border-t p-4 pb-8">
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
          disabled={isLoading || isListening || isStreaming}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={isLoading || isListening || !canSendMessage || isStreaming}
          title="Gửi câu hỏi">
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
