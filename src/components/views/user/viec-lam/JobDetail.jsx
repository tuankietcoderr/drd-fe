'use client';
import {Button} from '@/components/ui/button';
import {
  PROFESSIONAL_LEVEL_LABEL,
  QUALIFICATION_REQUIREMENT_LABEL,
} from '@/constants/enum';
import postApi from '@/redux/features/post/postQuery';
import Formatter from '@/utils/formatter';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import ScreenLoader from '../../ScreenLoader';
import Spinner from '../../Spinner';

const ApplyJobModal = dynamic(() => import('@views/user/modal/ApplyJobModal'), {
  ssr: false,
  loading: () => <ScreenLoader />,
});

const JobDetail = ({jobId}) => {
  const {
    data: job = {},
    isLoading,
    isSuccess,
    isError,
  } = postApi.useGetPostDetailQuery({
    postId: jobId,
  });
  const [showApplyJobModal, setShowApplyJobModal] = useState(false);

  const onClickApplyJob = () => {
    setShowApplyJobModal(true);
  };

  return isLoading ? (
    <Spinner isCentered />
  ) : isError ? (
    <p className="text-center text-sm">
      Không thể tải thông tin việc làm. Vui lòng thử lại sau.
    </p>
  ) : (
    isSuccess && (
      <>
        <div className="space-y-8">
          <div className="space-y-4 rounded-lg border bg-background p-4">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <div className="flex flex-1 flex-wrap items-start gap-2 text-sm">
              <p className="w-fit rounded-full bg-muted px-4 py-2">
                Mức lương:{' '}
                {Formatter.currency(job.minSalary, {
                  notation: 'compact',
                  compactDisplay: 'long',
                })}{' '}
                -{' '}
                {Formatter.currency(job.maxSalary, {
                  notation: 'compact',
                  compactDisplay: 'long',
                })}
              </p>
              <p className="w-fit rounded-full bg-muted px-4 py-2">
                Trình độ học vấn:{' '}
                {PROFESSIONAL_LEVEL_LABEL[job.professionalLevel]}
              </p>
              <p className="w-fit rounded-full bg-muted px-4 py-2">
                Trình độ chuyên môn:{' '}
                {QUALIFICATION_REQUIREMENT_LABEL[job.qualificationRequirement]}
              </p>
              <p className="w-fit rounded-full bg-muted px-4 py-2">
                Hình thức làm việc: {job.type}
              </p>
              <p className="w-fit rounded-full bg-muted px-4 py-2">
                Thời gian làm việc: {job.workingTime}
              </p>
              {job.locations.map(location => (
                <p
                  key={location.id}
                  className="w-fit rounded-full bg-muted px-4 py-2">
                  {location.name}
                </p>
              ))}
            </div>
            <Button onClick={onClickApplyJob}>Ứng tuyển ngay</Button>
          </div>

          <div className="space-y-4 overflow-hidden rounded-lg border bg-background p-4">
            <div className="space-y-4">
              <h3 className="w-fit rounded-br-lg border-l-[6px] border-primary pl-2 text-xl font-semibold">
                Chi tiết tuyển dụng
              </h3>
              <div className="space-y-2">
                <h4 className="font-medium">Mô tả công việc</h4>
                <p className="text-sm">{job.description}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Yêu cầu ứng viên</h4>
                <p className="text-sm">
                  {job.disabilityRequirement.join(', ')}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Quyền lợi</h4>
                <p className="text-sm">{job.benefit}</p>
              </div>
            </div>
            <Button onClick={onClickApplyJob}>Ứng tuyển ngay</Button>
          </div>
          {/* <SimilarJobs jobId={job.id} /> */}
        </div>
        {showApplyJobModal && (
          <ApplyJobModal
            job={job}
            visible={showApplyJobModal}
            onClose={() => setShowApplyJobModal(false)}
          />
        )}
      </>
    )
  );
};

export default JobDetail;
