'use client';
import {Button} from '@/components/ui/button';
import {
  PROFESSIONAL_LEVEL_LABEL,
  QUALIFICATION_REQUIREMENT_LABEL,
} from '@/constants/enum';
import useAuthorizedAction from '@/hooks/useAuthorizedAction';
import postApi from '@/redux/features/post/postQuery';
import Formatter from '@/utils/formatter';
import dynamic from 'next/dynamic';
import {useCallback, useState} from 'react';
import {toast} from 'sonner';
import ScreenLoader from '../../ScreenLoader';
import Spinner from '../../Spinner';
import SimilarJobs from './SimilarJobs';

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

  const [unApplyJobMutation, {isLoading: isUnApplying}] =
    postApi.useUnApplyMutation();
  const [showApplyJobModal, setShowApplyJobModal] = useState(false);

  const onClickApplyJob = () => {
    setShowApplyJobModal(true);
  };

  const onClickUnApplyJob = useCallback(() => {
    const yes = confirm(
      'Bạn có chắc chắn muốn thu hồi đơn ứng tuyển này không?',
    );
    if (yes) {
      unApplyJobMutation({postId: jobId})
        .unwrap()
        .then(res => {
          console.log('Thu hồi đơn ứng tuyển thành công', res);
          toast.success('Thu hồi đơn ứng tuyển thành công');
        })
        .catch(err => {
          console.log('Thu hồi đơn ứng tuyển thất bại', err);
          toast.error('Thu hồi đơn ứng tuyển thất bại');
        });
    }
  }, [jobId, unApplyJobMutation]);

  const {execute} = useAuthorizedAction({
    handler: onClickApplyJob,
  });

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
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground">
                {job.recruiterName}
              </h2>
              <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                {job.title}
              </h3>
              <p className="line-clamp-2 text-sm">{job.description}</p>
            </div>
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
            <p className="text-sm text-muted-foreground">
              {job.applicants === 0
                ? 'Chưa có ai ứng tuyển. Hãy trở thành người đầu tiên ứng tuyển để nhận được cơ hội tốt hơn.'
                : `Đã có ${job.applicants} người ứng tuyển`}
            </p>
            <div className="space-x-2">
              <Button onClick={execute} disabled={job.applied}>
                {job.applied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}
              </Button>
              {job.applied && (
                <Button onClick={onClickUnApplyJob} variant="outline">
                  {isUnApplying ? 'Đang thu hồi...' : 'Thu hồi đơn ứng tuyển'}
                </Button>
              )}
            </div>
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
          </div>
          <SimilarJobs jobId={job.id} />
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
