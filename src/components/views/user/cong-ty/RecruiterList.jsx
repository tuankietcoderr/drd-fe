'use client';
import {Button} from '@/components/ui/button';
import recruiterApi from '@/redux/features/recruiter/recruiterQuery';
import Link from 'next/link';
import {useCallback, useEffect, useMemo, useState} from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import RecruiterItem, {RecruiterItemSkeleton} from './RecruiterItem';

const RecruiterList = ({canSkip}) => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const {data, isSuccess, isError, isLoading} =
    recruiterApi.useGetRecruitersQuery(
      {
        page,
      },
      {
        skip: canSkip && page > 0,
      },
    );

  const pagination = useMemo(
    () => ({
      page: data?.currentPage || 0,
      totalPages: data?.totalPages || 0,
    }),
    [data],
  );

  useEffect(() => {
    if (isSuccess) {
      setItems(prev => [...prev, ...(data?.recruiters ?? [])]);
    }
  }, [data?.recruiters, isSuccess]);

  useEffect(() => {
    return () => {
      setItems([]);
      setPage(0);
    };
  }, []);

  const hasMore = useMemo(() => {
    return pagination.page < pagination.totalPages;
  }, [pagination]);

  const loadMoreItems = useCallback(() => {
    if (isLoading || isError || !hasMore || items.length === 0) return;
    setPage(prev => prev + 1);
  }, [hasMore, isError, isLoading, items.length]);

  const [elemRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: loadMoreItems,
    rootMargin: '0px 0px 200px 0px',
    disabled: isError,
  });

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nhà tuyển dụng</h2>
        {canSkip && (
          <Button asChild variant="link">
            <Link href="/cong-ty">Xem tất cả</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          [...Array(10)].map((_, index) => (
            <RecruiterItemSkeleton key={index} />
          ))
        ) : isError ? (
          <p className="col-span-full text-center text-muted-foreground">
            Có lỗi xảy ra trong quá trình tải nhà tuyển dụng
          </p>
        ) : isSuccess ? (
          items.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              Không có nhà tuyển dụng nào
            </p>
          ) : (
            items.map(recruiter => (
              <RecruiterItem key={recruiter.id} recruiter={recruiter} />
            ))
          )
        ) : null}
        {(hasMore || isLoading) && (
          <div ref={elemRef} className="col-span-full" />
        )}
      </div>
    </div>
  );
};

export default RecruiterList;
