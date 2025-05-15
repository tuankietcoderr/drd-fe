'use client';
import CVPreview from '@/components/CVPreview';
import {Button} from '@/components/ui/button';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import candidateSelector from '@/redux/features/candidate/candidateSelector';
import {useAppSelector} from '@/redux/hooks';
import {Download, Expand, Trash2, Upload} from 'lucide-react';
import Link from 'next/link';
import {toast} from 'sonner';

const UploadedCV = () => {
  const cv = useAppSelector(candidateSelector.selectCv);
  const [updateCvMutation, {isLoading}] = candidateApi.useUpdateCvMutation();
  const [deleteCvMutation, {isLoading: isDeleting}] =
    candidateApi.useDeleteCvMutation();
  const hasCv = !!cv?.url;

  const onDownloadCV = async () => {
    const blobRes = await fetch(cv.url);
    const blob = await blobRes.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'cv.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    toast.success('Tải xuống CV thành công');
  };

  const onDeleteCV = () => {
    const yes = confirm(
      'Bạn có chắc chắn muốn xóa CV này không? Bạn sẽ không thể khôi phục lại CV này sau khi xóa.',
    );
    if (!yes) return;
    deleteCvMutation()
      .unwrap()
      .then(res => {
        toast.success('Xoá CV thành công');
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.log('Xoá CV thất bại', err);
        toast.error('Xoá CV thất bại');
      });
  };

  return (
    <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">CV đã tải lên</h2>
        <Link href="/tai-khoan/cv/tai-len">
          <Button>
            <Upload />
            {hasCv ? 'Cập nhật CV' : 'Tải CV lên'}
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {hasCv ? (
          <>
            <CVPreview fileUrl={cv.url} />
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href={cv.url} target="_blank" rel="noopener noreferrer">
                  <Expand />
                  Mở rộng
                </Link>
              </Button>
              <Button variant="outline" onClick={onDownloadCV}>
                <Download />
                Tải CV xuống
              </Button>
              <Button
                variant="outline"
                onClick={onDeleteCV}
                disabled={isDeleting}>
                <Trash2 className="text-destructive" />
                Xoá CV
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Bạn chưa tải CV lên. Tải CV lên để ứng tuyển vào các công việc phù
            hợp với bạn.
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadedCV;
