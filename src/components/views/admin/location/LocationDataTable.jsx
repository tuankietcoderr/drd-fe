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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import locationApi from '@/redux/features/location/locationQuery';
import {PopoverClose} from '@radix-ui/react-popover';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {toast} from 'sonner';
import {useDebounceValue} from 'usehooks-ts';

export const columns = [
  {
    accessorKey: 'name',
    header: 'Tên địa điểm',
    cell: ({row}) => row.getValue('name'),
  },
  {
    accessorKey: 'countPost',
    header: 'Số lượng công việc',
    cell: ({row}) => row.getValue('countPost'),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({row}) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [showConfirm, setShowConfirm] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [deleteLocationMutation, {isLoading}] =
        locationApi.useDeleteLocationMutation();
      const onDelete = () => {
        deleteLocationMutation({locationId: row.original.id})
          .unwrap()
          .then(() => {
            toast.success('Xóa địa điểm thành công');
            setShowConfirm(false);
          })
          .catch(err => {
            console.error('Xóa địa điểm thất bại', err);
            toast.error('Xóa địa điểm thất bại');
          });
      };
      return (
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/quan-tri/dia-diem/${row.original.id}`}>
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
                  Bạn có chắc chắn muốn xóa địa điểm này không? Địa điểm sẽ bị
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

const LocationDataTable = () => {
  const [columnFilters, setColumnFilters] = useState([]);

  const [keyword, setKeyword] = useState('');

  const [debouncedKeyword] = useDebounceValue(keyword, 200);

  const query = useMemo(() => {
    const q = {};

    if (debouncedKeyword) {
      q.query = debouncedKeyword;
    }

    return q;
  }, [debouncedKeyword]);

  const locationQuery = locationApi.useGetLocationsQuery(query);
  const locations = useMemo(
    () => locationQuery.data ?? [],
    [locationQuery.data],
  );

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: locations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
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
                        {column.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link href="/quan-tri/dia-diem/tao-moi">
                <Plus />
                Tạo mới
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 rounded-md border">
          <Table
            className="relative w-full overflow-auto"
            isLoading={locationQuery.isFetching}>
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
                    {locationQuery.isFetching
                      ? 'Đang tải...'
                      : 'Không có kết quả.'}
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

export default LocationDataTable;
