'use client';
import candidateSelector from '@/redux/features/candidate/candidateSelector';
import postApi from '@/redux/features/post/postQuery';
import {useAppSelector} from '@/redux/hooks';
import JobItem, {JobItemSkeleton} from '../../JobItem';

const SuitableJobs = () => {
  const cv = useAppSelector(candidateSelector.selectCv);
  const {data, isLoading, isError, isSuccess, isUninitialized} =
    postApi.useGetSuitableJobsQuery(
      {
        topk: 10,
        uploadedWithinDays: 30,
      },
      {
        skip: !cv,
      },
    );
  const posts = data?.posts || [];

  return (
    <div
      className="space-y-4 overflow-hidden rounded-lg border bg-background p-4"
      id="viec-lam-phu-hop">
      <h3 className="w-fit rounded-br-lg border-l-[6px] border-primary pl-2 text-xl font-semibold">
        Việc làm phù hợp với bạn
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {isUninitialized && (
          <p className="col-span-full text-sm text-muted-foreground">
            Vui lòng tải lên CV để nhận được việc làm phù hợp với bạn
          </p>
        )}
        {isLoading ? (
          Array.from({length: 3}).map((_, index) => (
            <JobItemSkeleton key={index} hideImage />
          ))
        ) : isError ? (
          <p className="col-span-full text-sm text-muted-foreground">
            Không thể tải thông tin việc làm. Vui lòng thử lại sau.
          </p>
        ) : isSuccess ? (
          posts.length === 0 ? (
            <p className="col-span-full text-sm text-muted-foreground">
              Không có việc làm nào
            </p>
          ) : (
            posts.map(job => (
              <JobItem key={job.id} job={job} showScore hideImage />
            ))
          )
        ) : null}
      </div>
    </div>
  );
};

export default SuitableJobs;
