import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import useUploadCV from '@/hooks/useUploadCV';
import {FolderSearch2, PenTool, Trash2, TriangleAlert} from 'lucide-react';
import {useId, useRef} from 'react';
import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

/**
 * @typedef {Object} ApplyJobModalProps
 * @property {boolean} visible
 * @property {() => void} onClose
 * @property {JobPosting} job
 */

/**
 * @param {ApplyJobModalProps} props
 */
const ApplyJobModal = ({job, visible, onClose}) => {
  const {
    SUPPORT_FILE_TYPES,
    SUPPORT_FILE_TYPES_TEXT,
    MAX_FILE_SIZE_TEXT,
    file,
    onChangeFile,
    onRemoveFile,
  } = useUploadCV();
  const fileId = useId();
  const inputRef = useRef(null);

  const form = useForm({});

  const onSubmit = async data => {};

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-auto border-none scrollbar-thin">
        <DialogHeader>
          <DialogTitle>
            Ứng tuyển <span className="text-primary">{job.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="inline-flex items-center gap-1 font-medium">
            <FolderSearch2
              strokeWidth={1.5}
              className="text-primary"
              size={20}
            />
            Chọn CV để ứng tuyển
          </p>

          <div className="group rounded-lg border border-dashed border-muted-foreground p-4 transition-colors hover:border-primary">
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
            <hr className="my-4" />
            <Form {...form}>
              <form
                className="flex flex-col items-end gap-4"
                onSubmit={form.handleSubmit(onSubmit)}>
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
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập email"
                            {...field}
                            type="email"
                          />
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
                </div>
              </form>
            </Form>
          </div>

          <div className="space-y-2">
            <p className="inline-flex items-center gap-1 font-medium">
              <PenTool strokeWidth={1.5} className="text-primary" size={20} />
              Thư giới thiệu
            </p>
            <p className="text-sm text-muted-foreground">
              Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên
              nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
            </p>
            <TextareaAutosize
              className="flex max-h-80 min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
            />
          </div>
          <div className="rounded-lg border p-4">
            <p className="inline-flex items-center gap-1 font-medium">
              <TriangleAlert
                strokeWidth={1.5}
                className="text-destructive"
                size={20}
              />
              Lưu ý
            </p>
            <p className="text-sm text-muted-foreground">
              DrD khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm
              việc và chủ động nghiên cứu về thông tin công ty, vị trí việc làm
              trước khi ứng tuyển. Ứng viên cần có trách nhiệm với hành vi ứng
              tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được
              liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho TopCV
              qua email{' '}
              <a
                href="mailto:info@drdvietnam.org"
                className="font-medium text-primary hover:underline">
                info@drdvietnam.org
              </a>{' '}
              để được hỗ trợ kịp thời.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Huỷ</Button>
          </DialogClose>
          <Button type="submit" className="flex-1">
            Nộp hồ sơ ứng tuyển
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
