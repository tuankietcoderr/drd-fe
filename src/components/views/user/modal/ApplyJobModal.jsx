import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import candidateSelector from '@/redux/features/candidate/candidateSelector';
import postApi from '@/redux/features/post/postQuery';
import {useAppSelector} from '@/redux/hooks';
import {FolderSearch2, PenTool, TriangleAlert} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {toast} from 'sonner';

const UploadCV = dynamic(() => import('./UploadCV'), {
  ssr: false,
});

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
  const cv = useAppSelector(candidateSelector.selectCv);
  const [applyJobMutation, {isLoading}] = postApi.useApplyMutation();
  const [coverLetter, setCoverLetter] = useState('');

  const onApply = () => {
    if (!cv) {
      toast.error('Vui lòng tải CV lên trước khi ứng tuyển');
      return;
    }
    applyJobMutation({postId: job.id, coverLetter})
      .unwrap()
      .then(res => {
        console.log('Ứng tuyển thành công', res);
        toast.success('Ứng tuyển thành công');
        onClose();
      })
      .catch(err => {
        console.log('Ứng tuyển thất bại', err);
        toast.error('Ứng tuyển thất bại');
      });
  };

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

          {cv ? <p className="text-sm">Sử dụng CV đã tải lên</p> : <UploadCV />}

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
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
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
              vieclamnkt.top khuyên tất cả các bạn hãy luôn cẩn trọng trong quá
              trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí
              việc làm trước khi ứng tuyển. Ứng viên cần có trách nhiệm với hành
              vi ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận
              được liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho
              chúng tôi qua email{' '}
              <a
                href="mailto:info@abcd.team"
                className="font-medium text-primary hover:underline">
                info@abcd.team
              </a>{' '}
              để được hỗ trợ kịp thời.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Huỷ</Button>
          </DialogClose>
          <Button
            type="submit"
            className="flex-1"
            onClick={onApply}
            disabled={isLoading}>
            {isLoading ? 'Đang ứng tuyển...' : 'Nộp hồ sơ ứng tuyển'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
