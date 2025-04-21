'use client';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import RealtimeAudioWaveform from '@/components/views/RealtimeAudioWaveform';
import Spinner from '@/components/views/Spinner';
import {HEALTH_STATUS_ARRAY} from '@/constants/enum';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import useUploadCV from '@/hooks/useUploadCV';
import authSelector from '@/redux/features/auth/authSelector';
import {useAppSelector} from '@/redux/hooks';
import {createCVValidator} from '@/validator/cv';
import {zodResolver} from '@hookform/resolvers/zod';
import {AudioWaveform, Pause, Play, Trash2} from 'lucide-react';
import {useEffect, useId, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

const CreateNewCVForm = () => {
  const form = useForm({
    resolver: zodResolver(createCVValidator),
    defaultValues: {
      email: '',
      phone: '',
      name: '',
      birthday: '',
      health_status: '',
      address: '',
    },
  });

  const user = useAppSelector(authSelector.selectUser);
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
  const {startRecording, isRecording, audioURL, stopRecording} =
    useAudioRecorder();

  const [uploadingMessage, setUploadingMessage] = useState(null);

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
      });
    }
  }, [user]);

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

  const onSubmitProcessAudio = async () => {};

  const onSubmit = async data => {};

  const onEvaluate = async () => {};
  const onPreview = async () => {};

  return (
    <div className="space-y-4 rounded-lg border bg-background p-8 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="self-start">
          <h3 className="text-lg font-semibold">Tải CV lên</h3>
          <p className="text-sm text-muted-foreground">
            Tải lên CV để hệ thống tự động điền thông tin vào các trường bên
            dưới
          </p>
        </div>
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
              Hỗ trợ định dạng {SUPPORT_FILE_TYPES_TEXT.join(', ')} có kích
              thước tối đa {MAX_FILE_SIZE_TEXT}
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

      <hr />

      <div className="space-y-4">
        <div className="self-start">
          <h3 className="text-lg font-semibold">Sử dụng giọng nói</h3>
          <p className="text-sm text-muted-foreground">
            Sử dụng giọng nói để tự động điền thông tin vào các trường bên dưới
          </p>
        </div>

        {isRecording && <RealtimeAudioWaveform isRecording={isRecording} />}
        {audioURL && (
          <div className="space-y-2">
            <p className="font-medium">Nghe lại</p>
            <audio className="w-full" controls src={audioURL} />
          </div>
        )}
        <div className="flex items-center gap-4">
          {!isRecording ? (
            <>
              <Button disabled={isRecording} onClick={startRecording}>
                <Play className="fill-primary-foreground" />
                Bắt đầu ghi âm
              </Button>
              {audioURL && (
                <Button
                  disabled={isRecording}
                  onClick={onSubmitProcessAudio}
                  variant="outline">
                  <AudioWaveform />
                  Xử lý giọng nói
                </Button>
              )}
            </>
          ) : (
            <Button variant="outline" onClick={stopRecording}>
              <Pause />
              Dừng ghi âm
            </Button>
          )}
        </div>
      </div>

      <hr />

      <Form {...form}>
        <form
          className="flex flex-col items-end gap-4"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập số điện thoại"
                    {...field}
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="health_status"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tình trạng sức khoẻ</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="flex gap-4">
                    {HEALTH_STATUS_ARRAY.map(status => (
                      <FormItem
                        key={status.value}
                        className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={status.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {status.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ và tên" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-between gap-2 self-start">
            <div className="space-x-2">
              <Button
                className="self-start"
                variant="secondary"
                type="button"
                onClick={onEvaluate}>
                Đánh giá CV
              </Button>

              <Button
                className="self-start"
                variant="secondary"
                type="button"
                onClick={onPreview}>
                Xem trước
              </Button>
            </div>
            <Button className="self-start">Tạo CV mới</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewCVForm;
