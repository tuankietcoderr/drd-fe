'use client';
import CVPreview from '@/components/CVPreview';
import candidateSelector from '@/redux/features/candidate/candidateSelector';
import {useAppSelector} from '@/redux/hooks';
import {pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const UploadedCVPreview = () => {
  const cv = useAppSelector(candidateSelector.selectCv);

  return (
    <div>
      <CVPreview fileUrl={cv} />
    </div>
  );
};

export default UploadedCVPreview;
