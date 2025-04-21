import jobs from '~/__data__/posts.json';
import JobItem from '../../JobItem';

const SuitableJobs = ({jobId}) => {
  const suitableJobs = jobs.filter(job => job.id !== jobId).slice(0, 12);
  return (
    <div className="space-y-4 overflow-hidden rounded-lg border bg-background p-4">
      <h3 className="w-fit rounded-br-lg border-l-[6px] border-primary pl-2 text-xl font-semibold">
        Việc làm phù hợp với bạn
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {suitableJobs.map(job => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SuitableJobs;
