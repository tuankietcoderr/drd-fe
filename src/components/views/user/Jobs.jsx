import jobs from '~/__data__/posts.json';
import JobItem from './JobItem';

const Jobs = () => {
  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-2xl font-bold">Tất cả việc làm</h2>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map(job => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
