import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import CreateOccupationForm from '@/components/views/admin/occupation/CreateOccupationForm';
import Link from 'next/link';

const page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/quan-tri">Bảng điều khiển</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/quan-tri/nganh-nghe">Danh sách ngành nghề</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tạo ngành nghề</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center text-2xl font-semibold">Tạo ngành nghề</h1>
      <CreateOccupationForm />
    </div>
  );
};

export default page;
