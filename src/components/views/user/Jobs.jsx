import jobs from '~/__data__/posts.json';
import JobItem from './JobItem';

const Jobs = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tất cả việc làm</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {jobs.map(job => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
