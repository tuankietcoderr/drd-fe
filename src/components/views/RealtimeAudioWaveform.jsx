import useAudioVisualizer from '@/hooks/useAudioVisualizer';
import {cn} from '@/lib/utils';

const RealtimeAudioWaveform = ({isRecording, className}) => {
  const canvasRef = useAudioVisualizer(isRecording);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={80}
      className={cn('w-full rounded border', className)}
    />
  );
};

export default RealtimeAudioWaveform;
