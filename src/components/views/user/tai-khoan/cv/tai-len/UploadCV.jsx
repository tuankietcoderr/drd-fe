'use client';
import {Button} from '@/components/ui/button';
import Spinner from '@/components/views/Spinner';
import useUploadCV from '@/hooks/useUploadCV';
import {Trash2} from 'lucide-react';
import {useId, useRef, useState} from 'react';

const UploadCV = () => {
  const {
    MAX_FILE_SIZE_TEXT,
    SUPPORT_FILE_TYPES_TEXT,
    SUPPORT_FILE_TYPES,
    file,
    onChangeFile,
    onRemoveFile,
  } = useUploadCV();
  const fileId = useId();
  const inputRef = useRef(null);

  const [uploadingMessage, setUploadingMessage] = useState(null);

  const onSubmitUpload = async () => {
    setUploadingMessage('Đang tải lên CV...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadingMessage(
      'Gửi CV đến máy chủ thành công! Hệ thống đang xử lý...',
    );
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadingMessage('Hệ thống đã xử lý xong. Tải CV lên thành công!');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadingMessage(null);
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
            <Button variant="outline" onClick={onRemoveFile}>
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

      <Button onClick={onSubmitUpload}>Tải CV lên</Button>
      {uploadingMessage && (
        <p className="inline-flex items-center gap-2 text-sm text-primary/80">
          <Spinner iconClassName="size-4" />
          {uploadingMessage}
        </p>
      )}
    </div>
  );
};

export default UploadCV;
