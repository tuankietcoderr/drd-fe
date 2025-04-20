import JobDetail from '@/components/views/user/viec-lam/JobDetail';
import MainLayout from '@/layout/MainLayout';
import jobs from '~/__data__/posts.json';

const page = async ({params}) => {
  const {id} = await params;

  const job = jobs.find(job => job.id == id);

  if (!job) {
    return (
      <MainLayout>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-bold">Không tìm thấy công việc</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <JobDetail job={job} />
    </MainLayout>
  );
};

export default page;
