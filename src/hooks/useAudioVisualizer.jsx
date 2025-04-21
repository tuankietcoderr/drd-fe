import {useEffect, useRef} from 'react';

const useAudioVisualizer = isRecording => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (!isRecording) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const setupVisualizer = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      sourceRef.current = audioCtxRef.current.createMediaStreamSource(stream);

      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      sourceRef.current.connect(analyserRef.current);

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

        canvasCtx.fillStyle = '#f3f4f6';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = '#3b82f6';

        canvasCtx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArrayRef.current[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      };

      draw();
    };

    setupVisualizer();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [isRecording]);

  return canvasRef;
};

export default useAudioVisualizer;
