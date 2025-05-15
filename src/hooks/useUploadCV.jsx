import {useCallback, useState} from 'react';

const SUPPORT_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const SUPPORT_FILE_TYPES_TEXT = ['pdf', 'doc', 'docx'];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const MAX_FILE_SIZE_TEXT = '5MB';

const useUploadCV = () => {
  const [file, setFile] = useState(null);

  const onChangeFile = useCallback(event => {
    event?.preventDefault?.();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size;

      if (!SUPPORT_FILE_TYPES.includes(fileType)) {
        alert(
          `Không hỗ trợ định dạng file ${fileType}. Chỉ hỗ trợ ${SUPPORT_FILE_TYPES_TEXT.join(
            ', ',
          )}.` + `\nVui lòng chọn file khác.`,
        );
        return;
      }

      if (fileSize > MAX_FILE_SIZE) {
        alert(`Kích thước file tối đa là ${MAX_FILE_SIZE_TEXT}.`);
        return;
      }

      setFile(selectedFile);
    }
  }, []);

  const onRemoveFile = useCallback(() => {
    setFile(null);
  }, []);

  return {
    SUPPORT_FILE_TYPES,
    SUPPORT_FILE_TYPES_TEXT,
    MAX_FILE_SIZE,
    MAX_FILE_SIZE_TEXT,
    /**
     * @type {File | null}
     */
    file,
    setFile,
    onChangeFile,
    onRemoveFile,
  };
};

export default useUploadCV;
