'use client';
import {Button} from '@/components/ui/button';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import {Mic, MicOff} from 'lucide-react';
import {useEffect} from 'react';

const Dictaphone = ({onSpeech, onListeningChange = () => {}}) => {
  const {transcript, error, isListening, startListening, stopListening} =
    useSpeechRecognition({
      continuous: true,
      lang: 'vi-VN',
      interimResults: true,
    });
  useEffect(() => {
    if (transcript.length > 0) {
      onSpeech(transcript);
    }
  }, [onSpeech, transcript]);

  useEffect(() => {
    onListeningChange(isListening);
  }, [isListening, onListeningChange]);

  const handler = () => {
    if (isListening) {
      stopListening();
    } else {
      onSpeech('');
      startListening();
    }
  };

  if (error) return null;

  return (
    <Button variant="light" onClick={handler}>
      {isListening ? <MicOff /> : <Mic />}
    </Button>
  );
};
export default Dictaphone;
