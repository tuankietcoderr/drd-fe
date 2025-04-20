import jobs from '~/__data__/posts.json';
import JobItem from '../JobItem';

const SimilarJobs = ({jobId}) => {
  const similarJobs = jobs.filter(job => job.id !== jobId).slice(0, 12);
  return (
    <div className="space-y-4 overflow-hidden rounded-lg border bg-background p-4">
      <h3 className="w-fit rounded-br-lg border-l-[6px] border-primary pl-2 text-xl font-semibold">
        Việc làm tương tự
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {similarJobs.map(job => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;
