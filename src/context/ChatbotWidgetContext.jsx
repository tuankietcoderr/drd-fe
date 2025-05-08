'use client';

import chatbotSelector from '@/redux/features/chatbot/chatbotSelector';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {ChatbotWidgetSessionIdUtils} from '@/utils/token-utils';
import {createContext, useContext, useEffect, useRef} from 'react';

const ChatbotWidgetContext = createContext({
  inputRef: null,
  focusInput: () => {},
});

export const useChatbotWidgetContext = () => {
  const context = useContext(ChatbotWidgetContext);
  if (!context) {
    throw new Error(
      'useChatbotWidgetContext must be used within a ChatProvider',
    );
  }
  return context;
};

export const ChatbotWidgetProvider = ({children}) => {
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const chatSessionId = useAppSelector(chatbotSelector.selectChatSessionId);

  useEffect(() => {
    if (!chatSessionId) {
      const newSessionId = crypto.randomUUID();
      dispatch(chatbotActions.setChatSessionId(newSessionId));
      ChatbotWidgetSessionIdUtils.setToken(newSessionId);
    }
  }, [chatSessionId, dispatch]);

  useEffect(() => {
    const prevChatSessionId = ChatbotWidgetSessionIdUtils.getToken();
    if (prevChatSessionId) {
      //TODO: delete the previous session
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const value = {
    inputRef,
    focusInput,
  };

  return (
    <ChatbotWidgetContext.Provider value={value}>
      {children}
    </ChatbotWidgetContext.Provider>
  );
};
