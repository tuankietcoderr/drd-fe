'use client';
import jobDescriptionSelector from '@/redux/features/job-description/jobDescriptionSelector';
import {jobDescriptionActions} from '@/redux/features/job-description/jobDescriptionSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {JobDescriptionSessionIdUtils} from '@/utils/token-utils';
import {createContext, useContext, useEffect, useRef} from 'react';
import {useBeforeunload} from 'react-beforeunload';

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
  const chatSessionId = useAppSelector(
    jobDescriptionSelector.selectChatSessionId,
  );

  useBeforeunload(event => {
    // event.preventDefault();
  });

  useEffect(() => {
    if (!chatSessionId) {
      const newSessionId = crypto.randomUUID();
      dispatch(jobDescriptionActions.setChatSessionId(newSessionId));
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
