'use client';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {ChevronDown, Eye, Plus, Trash2} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Separator} from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import postApi from '@/redux/features/post/postQuery';
import Formatter from '@/utils/formatter';
import {PopoverClose} from '@radix-ui/react-popover';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {toast} from 'sonner';
import {useDebounceValue} from 'usehooks-ts';

export const columns = [
  {
    accessorKey: 'title',
    header: 'Tiêu đề',
    cell: ({row}) => row.getValue('title'),
  },
  {
    accessorKey: 'applicants',
    header: () => <p className="min-w-max">Đã ứng tuyển</p>,
    cell: ({row}) => row.getValue('applicants'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Đã đăng lúc',
    cell: ({row}) => (
      <p className="min-w-max">
        {Formatter.date(row.getValue('createdAt')).format('MM-DD-YYYY hh:mm A')}
      </p>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({row}) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [showConfirm, setShowConfirm] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [deletePostMutation, {isLoading}] = postApi.useDeletePostMutation();
      const onDelete = () => {
        deletePostMutation({postId: row.original.id})
          .unwrap()
          .then(() => {
            toast.success('Xóa việc làm thành công');
            setShowConfirm(false);
          })
          .catch(err => {
            console.error('Xóa việc làm thất bại', err);
            toast.error('Xóa việc làm thất bại');
          });
      };
      return (
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/nha-tuyen-dung/viec-lam/${row.original.id}`}>
              <Eye />
            </Link>
          </Button>
          <Popover open={showConfirm} onOpenChange={setShowConfirm}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="text-destructive" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <p className="text-sm">
                  Bạn có chắc chắn muốn xóa việc làm này không? Việc làm sẽ bị
                  xóa vĩnh viễn và không thể khôi phục.
                </p>
                <div className="flex justify-end">
                  <Button variant="destructive" size="sm" onClick={onDelete}>
                    {isLoading ? 'Đang xóa...' : 'Xóa'}
                  </Button>
                  <PopoverClose asChild>
                    <Button variant="outline" size="sm" className="ml-2">
                      Huỷ
                    </Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

const JobDataTable = () => {
  const [{pageIndex, pageSize}, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters, setColumnFilters] = useState([]);

  const [keyword, setKeyword] = useState('');

  const [debouncedKeyword] = useDebounceValue(keyword, 200);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const query = useMemo(() => {
    const q = {
      page: pageIndex,
      size: pageSize,
    };

    if (debouncedKeyword) {
      q.title = debouncedKeyword;
    }

    return q;
  }, [pageIndex, pageSize, debouncedKeyword]);

  const jobQuery = postApi.useGetRecruiterPostsQuery(query);
  const jobs = useMemo(() => jobQuery.data?.posts ?? [], [jobQuery.data]);

  const totalPages = jobQuery.data?.totalPages ?? 1;
  const totalItems = jobQuery.data?.totalElements ?? 0;

  const [columnVisibility, setColumnVisibility] = useState({
    createdAt: false,
  });

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: totalPages,
    onPaginationChange: setPagination,
    manualFiltering: true,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnVisibility,
      pagination,
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
            <Button asChild>
              <Link href="/nha-tuyen-dung/viec-lam/tao-moi">
                <Plus />
                Tạo mới
              </Link>
            </Button>
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
        <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          <div className="flex items-center gap-1 text-sm text-muted-foreground md:gap-2">
            <p className="min-w-max">Trang</p>
            <Select
              value={pageIndex}
              onValueChange={v =>
                setPagination(prev => ({...prev, pageIndex: v}))
              }>
              <SelectTrigger>
                <SelectValue placeholder="Trang" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: totalPages}, (_, i) => i).map(p => (
                  <SelectItem key={p} value={p}>
                    {p + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="min-w-max">của {totalPages}</p>{' '}
            <Separator orientation="vertical" className="!h-5" />
            <p className="min-w-max">Kích cỡ</p>
            <Select
              value={pageSize}
              onValueChange={v =>
                setPagination(prev => ({...prev, pageSize: v}))
              }>
              <SelectTrigger>
                <SelectValue placeholder="Số lượng" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map(p => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Separator orientation="vertical" className="!h-5" />
            <p className="min-w-max">Tổng: {totalItems ?? 0}</p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Trang trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Trang sau
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDataTable;
