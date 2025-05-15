'use client';

import {ChevronLeft, ChevronRight} from 'lucide-react';
import {memo, useCallback, useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Button} from './ui/button';
import Spinner from './views/Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ProgressBar = memo(({percent}) => {
  return (
    <div className="mx-auto h-2.5 w-full max-w-2xl bg-gray-200">
      <div className="h-2.5 bg-primary" style={{width: `${percent}%`}} />
    </div>
  );
});

const LoadingPageSkeleton = () => {
  return (
    <div className="flex h-[31.25rem] w-full items-center justify-center">
      <Spinner className="text-primary" size={32} />
    </div>
  );
};

const CVPreview = ({fileUrl}) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [loadPercent, setLoadPercent] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const onDocumentLoadSuccess = useCallback(({numPages}) => {
    setNumPages(numPages);
  }, []);

  const onDocumentLoadError = useCallback(error => {
    setError(error.message);
  }, []);

  const onDocumentLoadProgress = useCallback(({loaded, total}) => {
    const percent = Math.floor((loaded / total) * 100);
    setLoadPercent(percent);
  }, []);

  const isLoaded = loadPercent >= 100;

  return (
    <div className="flex w-full flex-col items-center gap-4 border pt-4">
      {!isLoaded && !error && <ProgressBar percent={loadPercent} />}

      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        onLoadProgress={onDocumentLoadProgress}
        error={`Gặp lỗi khi tải CV: ${error}`}
        loading="Đang tải...">
        <Page
          pageNumber={pageNumber}
          loading={<LoadingPageSkeleton />}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="mb-2 flex items-center gap-3">
        <Button
          onClick={prevPage}
          disabled={pageNumber <= 1}
          variant="outline"
          size="icon">
          <ChevronLeft />
        </Button>
        <span className="text-sm">
          Trang {pageNumber} / {numPages ?? '...'}
        </span>
        <Button
          onClick={nextPage}
          disabled={numPages && pageNumber >= numPages}
          variant="outline"
          size="icon">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CVPreview;
