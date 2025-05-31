'use client';
import CVPreview from '@/components/CVPreview';
import {Button} from '@/components/ui/button';
import Spinner from '@/components/views/Spinner';
import CandidateProfileDetail from '@/components/views/user/CandidateProfileDetail';
import MainLayout from '@/layout/MainLayout';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {Download, Expand} from 'lucide-react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {toast} from 'sonner';

const Page = () => {
  const params = useParams();
  const candidateId = params.id;
  const {data, isError, isLoading, isSuccess} =
    candidateApi.useGetCandidateInfoByIdQuery({candidateId});
  const hasCv = !!data?.cv;

  const onDownloadCV = async () => {
    const blobRes = await fetch(data.cv);
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

  if (isLoading) {
    return <Spinner isCentered />;
  }

  if (isError) {
    return (
      <p className="text-center text-sm text-destructive">
        Không thể tải thông tin ứng viên. Vui lòng thử lại sau.
      </p>
    );
  }

  return (
    <MainLayout className="mt-10 flex flex-col gap-8 md:flex-row">
      <div className="flex-1">
        <div className="space-y-4">
          {hasCv ? (
            <>
              <CVPreview fileUrl={data.cv} />
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" asChild>
                  <Link
                    href={data.cv}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Expand />
                    Mở rộng
                  </Link>
                </Button>
                <Button variant="outline" onClick={onDownloadCV}>
                  <Download />
                  Tải CV xuống
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ứng viên này chưa tải CV lên.
            </p>
          )}
        </div>
      </div>
      <aside className="w-full space-y-4 md:max-w-[360px]">
        <CandidateProfileDetail candidate={data} />
      </aside>
    </MainLayout>
  );
};

export default Page;
