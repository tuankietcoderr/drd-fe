'use client';
import {useJobDescriptionChatContext} from '@/context/JobDescriptionChatContext';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import {jobDescriptionActions} from '@/redux/features/job-description/jobDescriptionSlice';
import {useAppDispatch} from '@/redux/hooks';
import {Volume2} from 'lucide-react';

const disabilityJobSearchQuestions = [
  // Về cơ hội việc làm phù hợp
  'Tôi là người khuyết tật vận động, có công việc nào phù hợp với tôi không?',
  'Những ngành nghề nào phù hợp cho người khiếm thị?',
  'Tôi bị khiếm thính, có thể làm công việc gì từ xa?',
  'Có công ty nào tuyển dụng ưu tiên cho người khuyết tật không?',
  'Tôi cần một công việc linh hoạt về thời gian vì tôi phải điều trị y tế định kỳ, có vị trí nào phù hợp không?',

  // Về hỗ trợ & điều kiện làm việc
  'Công ty có hỗ trợ người khuyết tật tại nơi làm việc không?',
  'Tôi cần thiết bị hỗ trợ đặc biệt (ví dụ: phần mềm đọc màn hình), công ty có thể đáp ứng không?',
  'Chính sách làm việc từ xa cho người khuyết tật là gì?',
  'Có chính sách nào hỗ trợ người khuyết tật trong quá trình tuyển dụng không?',

  // Về hồ sơ & tuyển dụng
  'Tôi nên trình bày khuyết tật trong CV như thế nào?',
  'Tôi có nên nói về tình trạng khuyết tật trong buổi phỏng vấn không?',
  'Có cần giấy tờ chứng minh khuyết tật khi ứng tuyển không?',
  'Có mẫu CV nào dành riêng cho người khuyết tật không?',

  // Về quyền lợi & pháp lý
  'Là người khuyết tật, tôi có quyền lợi gì khi đi làm?',
  'Theo luật lao động Việt Nam, người khuyết tật được hỗ trợ gì trong tuyển dụng?',
  'Có quy định nào cấm phân biệt đối xử với người khuyết tật khi xin việc không?',

  // Về công việc từ xa & công nghệ
  'Tôi muốn làm việc online tại nhà, có nền tảng nào phù hợp không?',
  'Những kỹ năng nào tôi có thể học để làm việc từ xa?',
  'Có phần mềm nào hỗ trợ người khuyết tật trong công việc không?',
];

const EmptyRoomMessages = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {disabilityJobSearchQuestions.map((question, index) => (
        <EmptyRoomMessage question={question} key={index} />
      ))}
    </div>
  );
};

const EmptyRoomMessage = ({question}) => {
  const dispatch = useAppDispatch();
  const {focusInput} = useJobDescriptionChatContext();

  const {isSpeaking, startSpeech, stopSpeech} = useTextToSpeech({
    lang: 'vi-VN',
  });

  const handleClick = () => {
    dispatch(jobDescriptionActions.setMessage(question));
    focusInput();
  };
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-sm transition-colors hover:bg-muted"
      onClick={() => handleClick(question)}>
      {question}
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

export default EmptyRoomMessages;
