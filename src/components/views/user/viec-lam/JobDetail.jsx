import {Button} from '@/components/ui/button';
import Formatter from '@/utils/formatter';
import SimilarJobs from './SimilarJobs';

/**
 * @param {{job: JobPosting}}
 */
const JobDetail = ({job}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-lg border bg-background p-4">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <div className="flex flex-1 flex-wrap items-start gap-2 text-sm">
          <p className="w-fit rounded-full bg-muted px-4 py-2">
            Mức lương:{' '}
            {Formatter.currency(job.min_salary, {
              notation: 'compact',
              compactDisplay: 'long',
            })}{' '}
            -{' '}
            {Formatter.currency(job.max_salary, {
              notation: 'compact',
              compactDisplay: 'long',
            })}
          </p>
          <p className="w-fit rounded-full bg-muted px-4 py-2">
            Trình độ chuyên môn: {job.professional_level}
          </p>
          <p className="w-fit rounded-full bg-muted px-4 py-2">
            Hình thức làm việc: {job.type}
          </p>
          <p className="w-fit rounded-full bg-muted px-4 py-2">
            Thời gian làm việc: {job.working_time}
          </p>
        </div>
        <Button>Ứng tuyển ngay</Button>
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
            <p className="text-sm">{job.disability_requirement}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Quyền lợi</h4>
            <p className="text-sm">{job.benefit}</p>
          </div>
        </div>
        <Button>Ứng tuyển ngay</Button>
      </div>
      <SimilarJobs jobId={job.id} />
    </div>
  );
};

export default JobDetail;
