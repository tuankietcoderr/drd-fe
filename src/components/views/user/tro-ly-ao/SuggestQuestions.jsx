'use client';
import {useJobDescriptionChatContext} from '@/context/JobDescriptionChatContext';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import chatbotApi from '@/redux/features/chatbot/chatbotQuery';
import {chatbotActions} from '@/redux/features/chatbot/chatbotSlice';
import {useAppDispatch} from '@/redux/hooks';
import {Volume2} from 'lucide-react';

const SuggessQuestion = ({question}) => {
  const dispatch = useAppDispatch();
  const {focusInput} = useJobDescriptionChatContext();

  const {isSpeaking, startSpeech, stopSpeech} = useTextToSpeech({
    lang: 'vi-VN',
  });

  const handleClick = () => {
    dispatch(chatbotActions.setMessage(question));
    focusInput();
  };
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-left text-sm transition-colors hover:bg-muted"
      onClick={() => handleClick(question)}>
      <span className="flex-1">{question}</span>
      {isSpeaking ? (
        <Volume2
          onClick={e => {
            e.stopPropagation();
            stopSpeech();
          }}
          className="animate-pulse text-primary"
          size={16}
        />
      ) : (
        <Volume2
          size={16}
          onClick={e => {
            e.stopPropagation();
            startSpeech(question);
          }}
        />
      )}
    </button>
  );
};

const SuggestQuestions = () => {
  const {data, isSuccess} = chatbotApi.useGetSuggestQuestionsQuery();
  return (
    isSuccess && (
      <div className="space-y-2">
        <p className="text-sm">Gợi ý câu hỏi cho bạn:</p>
        <div className="flex flex-wrap gap-2">
          {data.map((question, index) => (
            <SuggessQuestion question={question} key={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default SuggestQuestions;
