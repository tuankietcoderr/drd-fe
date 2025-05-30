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

const page = async ({params}) => {
  const {id} = await params;
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
              <Link href="/quan-tri/dia-diem">Danh sách địa điểm</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chỉnh sửa địa điểm</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center text-2xl font-semibold">Chỉnh sửa địa điểm</h1>

      <CreateOccupationForm occupationId={id} />
    </div>
  );
};

export default page;
