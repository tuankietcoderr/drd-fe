'use client';
import postApi from '@/redux/features/post/postQuery';
import JobItem, {JobItemSkeleton} from '../JobItem';

const SimilarJobs = ({jobId}) => {
  const {isLoading, data, isError, isSuccess} = postApi.useGetRelatedPostsQuery(
    {
      postId: jobId,
    },
  );
  return (
    <div className="space-y-4 overflow-hidden rounded-lg border bg-background p-4">
      <h3 className="w-fit rounded-br-lg border-l-[6px] border-primary pl-2 text-xl font-semibold">
        Việc làm tương tự
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
        ) : isSuccess && data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Không có việc làm nào</p>
        ) : (
          data.map(job => <JobItem key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default SimilarJobs;
