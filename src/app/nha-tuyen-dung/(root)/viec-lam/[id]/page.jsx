import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Button} from '@/components/ui/button';
import CreateJobForm from '@/components/views/recruiter/job/CreateJobForm';
import Link from 'next/link';

const page = async ({params}) => {
  const {id} = await params;
  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/nha-tuyen-dung">Bảng điều khiển</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/nha-tuyen-dung/viec-lam">Danh sách việc làm</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chỉnh sửa việc làm</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="text-center text-2xl font-semibold">
          Chỉnh sửa việc làm
        </h1>
        <Button asChild variant="link">
          <Link href={`/nha-tuyen-dung/viec-lam/${id}/don-ung-tuyen`}>
            Xem đơn ứng tuyển
          </Link>
        </Button>
      </div>
      <CreateJobForm jobId={id} />
    </div>
  );
};

export default page;
