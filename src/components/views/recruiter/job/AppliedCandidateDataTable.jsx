'use client';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {ChevronDown, ExternalLink, Eye, Info, Mail, Phone} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import postApi from '@/redux/features/post/postQuery';
import Formatter from '@/utils/formatter';
import {useMemo, useState} from 'react';
import {useDebounceValue} from 'usehooks-ts';
import Spinner from '../../Spinner';

export const columns = [
  {
    accessorKey: 'cadidate',
    header: 'Ứng viên',
    cell: ({row}) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [showInfo, setShowInfo] = useState(false);
      const {
        isError,
        isLoading,
        isSuccess,
        data: candidate,
      } = candidateApi.useGetCandidateInfoByIdQuery(
        {
          candidateId: row.getValue('cadidate').id,
        },
        {
          skip: !showInfo,
        },
      );
      return (
        <div className="flex items-center gap-2">
          <p className="min-w-max">{row.getValue('cadidate').name}</p>
          <Dialog open={showInfo} onOpenChange={setShowInfo}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Info />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Thông tin ứng viên {row.getValue('cadidate').name}
                </DialogTitle>
              </DialogHeader>
              {isLoading ? (
                <Spinner isCentered />
              ) : isError ? (
                <p className="text-center text-destructive">
                  Không thể tải thông tin công việc. Vui lòng thử lại sau.
                </p>
              ) : (
                isSuccess && (
                  <div className="space-y-4">
                    <Avatar className="size-20 border">
                      <AvatarImage
                        src={candidate.avatar}
                        alt={candidate.name}
                      />
                      <AvatarFallback className="text-xl font-bold">
                        {candidate.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    <p className="text-xs text-muted-foreground">
                      Cập nhật lần cuối vào{' '}
                      <span>
                        {Formatter.date(candidate.updatedAt).format(
                          'DD/MM/YYYY [lúc] HH:mm',
                        )}
                      </span>
                    </p>
                    <div className="space-y-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Tên</p>
                        <p className="font-medium">{candidate.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Giới tính
                        </p>
                        <p className="font-medium">
                          {candidate.gender || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Trạng thái làm việc
                        </p>
                        <p className="font-medium">
                          {candidate.currentJobStatus || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{candidate.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Số điện thoại
                        </p>
                        <p className="font-medium">{candidate.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Địa chỉ hiện tại
                        </p>
                        <p className="font-medium">
                          {candidate.currentAddress || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Trình độ học vấn
                        </p>
                        <p className="font-medium">
                          {candidate.professionalLevel || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Trình độ chuyên môn
                        </p>
                        <p className="font-medium">
                          {candidate.qualificationLevel || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Tình trạng khuyết tật
                        </p>
                        <p className="font-medium">
                          {candidate.disabilityStatus.join(', ') ||
                            'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Lý do khuyết tật
                        </p>
                        <p className="font-medium">
                          {candidate.disabilityCause || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Tình trạng sức khoẻ
                        </p>
                        <p className="font-medium">
                          {candidate.healthStatus || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Mức lương mong muốn
                        </p>
                        <p className="font-medium">
                          {candidate.expectedSalary || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Hoàn cảnh kinh tế
                        </p>
                        <p className="font-medium">
                          {candidate.economicStatus || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Chuyên ngành
                        </p>
                        <p className="font-medium">
                          {candidate.major || 'Không có thông tin'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Sở thích
                        </p>
                        <p className="font-medium">
                          {candidate.hobbies || 'Không có thông tin'}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button">Đóng</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({row}) => (
      <Button variant="link">
        <a
          href={`mailto:${row.getValue('cadidate').email}`}
          rel="noopener noreferrer"
          target="_blank">
          {row.getValue('cadidate').email}
        </a>
        <Mail />
      </Button>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại',
    cell: ({row}) => (
      <Button variant="link">
        <a
          href={`tel:${row.getValue('cadidate').phone}`}
          rel="noopener noreferrer"
          target="_blank">
          {row.getValue('cadidate').phone}
        </a>
        <Phone />
      </Button>
    ),
  },

  {
    accessorKey: 'cv',
    header: 'CV',
    cell: ({row}) => (
      <Button variant="link">
        <a
          href={row.getValue('cadidate').cv}
          target="_blank"
          rel="noopener noreferrer">
          Xem CV
        </a>
        <ExternalLink />
      </Button>
    ),
  },
  {
    accessorKey: 'coverLetter',
    header: () => <p className="min-w-max">Thư xin việc</p>,
    cell: ({row}) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Thư xin việc của {row.getValue('cadidate').name}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm">
              {row.getValue('coverLetter')
                ? row.getValue('coverLetter')
                : 'Không có thông tin'}
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Đóng</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

const AppliedCandidateDataTable = ({jobId}) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const [keyword, setKeyword] = useState('');

  const [debouncedKeyword] = useDebounceValue(keyword, 200);

  const query = useMemo(() => {
    const q = {
      postId: jobId,
    };

    if (debouncedKeyword) {
      q.title = debouncedKeyword;
    }

    return q;
  }, [debouncedKeyword, jobId]);

  const jobQuery = postApi.useGetPostCandidatesQuery(query);
  const jobs = useMemo(() => jobQuery.data ?? [], [jobQuery.data]);

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualFiltering: true,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnVisibility,
      columnFilters,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
          <Input
            placeholder="Tìm kiếm"
            className="flex-1 py-2"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Cột <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="!text-left capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={value =>
                          column.toggleVisibility(!!value)
                        }>
                        {typeof column.columnDef.header === 'string' ? (
                          column.columnDef.header
                        ) : (
                          <column.columnDef.header />
                        )}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 rounded-md border">
          <Table
            className="relative w-full overflow-auto"
            isLoading={jobQuery.isFetching}>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead className="text-center" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className="min-w-max text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center">
                    {jobQuery.isFetching ? 'Đang tải...' : 'Không có kết quả.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AppliedCandidateDataTable;
