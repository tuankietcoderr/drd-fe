import {useRef, useState} from 'react';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const checkMicrophonePermission = async () => {
    try {
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({
          name: 'microphone',
        });
        return permissionStatus.state; // 'granted', 'denied', or 'prompt'
      } else {
        // Fallback: Try requesting mic
        await navigator.mediaDevices.getUserMedia({audio: true});
        return 'granted';
      }
    } catch (err) {
      return 'denied';
    }
  };

  const startRecording = async () => {
    const permissionStatus = await checkMicrophonePermission();
    if (permissionStatus !== 'granted') {
      alert('Bạn cần cấp quyền truy cập microphone để ghi âm.');
      return;
    }

    setAudioURL('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
  };
};

export default useAudioRecorder;
