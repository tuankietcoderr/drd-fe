'use client';
import {Button} from '@/components/ui/button';
import useUploadCV from '@/hooks/useUploadCV';
import {Trash2} from 'lucide-react';
import {useEffect, useId, useRef} from 'react';

const UploadCV = ({initialFile, onUpload, onRemove, isUploading}) => {
  const {
    MAX_FILE_SIZE_TEXT,
    SUPPORT_FILE_TYPES_TEXT,
    SUPPORT_FILE_TYPES,
    file,
    setFile,
    onChangeFile,
    onRemoveFile,
  } = useUploadCV();
  const fileId = useId();
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
    }
  }, [initialFile, setFile]);

  const onSubmitUpload = () => {
    onUpload(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="group w-full rounded-lg border border-dashed border-muted-foreground p-4 transition-colors hover:border-primary">
        <input
          ref={inputRef}
          id={fileId}
          className="hidden"
          type="file"
          accept={SUPPORT_FILE_TYPES.join(', ')}
          onChange={onChangeFile}
        />
        <label
          htmlFor={fileId}
          className="flex cursor-pointer flex-col items-center gap-2 text-center">
          <p className="font-semibold">
            Tải lên CV từ máy tính, chọn hoặc kéo thả
          </p>
          <p className="text-sm text-muted-foreground">
            Hỗ trợ định dạng {SUPPORT_FILE_TYPES_TEXT.join(', ')} có kích thước
            tối đa {MAX_FILE_SIZE_TEXT}
          </p>
          {file ? (
            <Button
              variant="outline"
              onClick={() => {
                onRemoveFile();
                onRemove();
                inputRef.current.value = null;
              }}>
              <p className="text-sm text-primary">
                {file.name
                  .substring(0, 32)
                  .concat(file.name.length > 32 ? '...' : '')}
              </p>
              <Trash2 className="text-destructive" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="group-hover:bg-primary group-hover:text-primary-foreground"
              onClick={() => {
                inputRef.current.click();
              }}>
              Chọn CV
            </Button>
          )}
        </label>
      </div>

      <Button onClick={onSubmitUpload} disabled={!file || isUploading}>
        {isUploading ? 'Đang tải lên...' : 'Tải CV lên'}
      </Button>
    </div>
  );
};

export default UploadCV;
