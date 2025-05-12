'use client';

import jobDescriptionApi from '@/redux/features/job-description/jobDescriptionQuery';
import jobDescriptionSelector from '@/redux/features/job-description/jobDescriptionSelector';
import {jobDescriptionActions} from '@/redux/features/job-description/jobDescriptionSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {ChatbotWidgetSessionIdUtils} from '@/utils/token-utils';
import {createContext, useContext, useEffect, useRef} from 'react';
import {v4} from 'uuid';

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
  const chatSessionId = useAppSelector(
    jobDescriptionSelector.selectChatSessionId,
  );
  const [deleteSessionMutation] = jobDescriptionApi.useDeleteSessionMutation();

  useEffect(() => {
    if (!chatSessionId) {
      const newSessionId = v4();
      dispatch(jobDescriptionActions.setChatSessionId(newSessionId));
      ChatbotWidgetSessionIdUtils.setToken(newSessionId);
    }
  }, [chatSessionId, dispatch]);

  useEffect(() => {
    const prevChatSessionId = ChatbotWidgetSessionIdUtils.getToken();
    if (prevChatSessionId) {
      //TODO: delete the previous session
      deleteSessionMutation({sessionId: prevChatSessionId})
        .unwrap()
        .catch(err => {
          console.log('Error deleting session:', err);
        });
    }
  }, [deleteSessionMutation]);

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
