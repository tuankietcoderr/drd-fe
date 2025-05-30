'use client';
import postApi from '@/redux/features/post/postQuery';
import JobItem, {JobItemSkeleton} from '../JobItem';

const OtherJobs = ({recruiterId, recruiterName}) => {
  const {isLoading, data, isError, isSuccess} = postApi.useGetPostsQuery({
    recruiterId,
  });
  const jobs = data?.posts || [];
  return (
    <div className="space-y-4 overflow-hidden rounded-lg border bg-background p-4">
      <h3 className="w-fit rounded-br-lg border-l-[6px] border-primary pl-2 text-xl font-semibold">
        Việc làm khác của {recruiterName || 'Nhà tuyển dụng'}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          Array.from({length: 3}).map((_, index) => (
            <JobItemSkeleton key={index} />
          ))
        ) : isError ? (
          <p className="col-span-full text-sm text-muted-foreground">
            Không thể tải thông tin việc làm. Vui lòng thử lại sau.
          </p>
        ) : isSuccess && jobs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Không có việc làm nào</p>
        ) : (
          jobs.map(job => <JobItem key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default OtherJobs;
