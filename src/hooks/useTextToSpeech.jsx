import {useEffect, useRef, useState} from 'react';

const useTextToSpeech = ({lang = 'vi-VN'}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    window.onbeforeunload = () => {
      window.speechSynthesis.cancel();
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const startSpeech = content => {
    if (!('speechSynthesis' in window)) {
      alert(
        'Xin lỗi, trình duyệt của bạn không hỗ trợ văn bản thành giọng nói.',
      );
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(content);
    utteranceRef.current.pitch = 1;
    utteranceRef.current.rate = 1;
    utteranceRef.current.volume = 1;
    utteranceRef.current.lang = lang;

    // Event listeners for managing speech state
    utteranceRef.current.onstart = () => {
      setIsSpeaking(true);
    };
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
    };
    utteranceRef.current.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utteranceRef.current);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    startSpeech,
    stopSpeech,
    isSpeaking,
  };
};

export default useTextToSpeech;
