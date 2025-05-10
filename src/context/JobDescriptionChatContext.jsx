'use client';
import chatbotSelector from '@/redux/features/chatbot/chatbotSelector';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {JobDescriptionSessionIdUtils} from '@/utils/token-utils';
import {createContext, useContext, useEffect, useRef} from 'react';
import {useBeforeunload} from 'react-beforeunload';
import {v4} from 'uuid';

const JobDescriptionChatContext = createContext({
  inputRef: null,
  focusInput: () => {},
});

export const useJobDescriptionChatContext = () => {
  const context = useContext(JobDescriptionChatContext);
  if (!context) {
    throw new Error(
      'useJobDescriptionChatContext must be used within a ChatProvider',
    );
  }
  return context;
};

export const JobDescriptionChatProvider = ({children}) => {
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const chatSessionId = useAppSelector(chatbotSelector.selectChatSessionId);

  useBeforeunload(event => {
    // event.preventDefault();
  });

  useEffect(() => {
    if (!chatSessionId) {
      const newSessionId = v4();
      dispatch(chatbotActions.setChatSessionId(newSessionId));
      JobDescriptionSessionIdUtils.setToken(newSessionId);
    }
  }, [chatSessionId, dispatch]);

  useEffect(() => {
    const prevChatSessionId = JobDescriptionSessionIdUtils.getToken();
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
    <JobDescriptionChatContext.Provider value={value}>
      {children}
    </JobDescriptionChatContext.Provider>
  );
};
