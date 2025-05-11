'use client';
import postApi from '@/redux/features/post/postQuery';
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useMemo, useState} from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import JobItem, {JobItemSkeleton} from '../JobItem';

const Jobs = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const locationId = searchParams.get('location');
  const minSalary = searchParams.get('minSalary');
  const maxSalary = searchParams.get('maxSalary');
  const occupationId = searchParams.get('occupation');
  const keyword = searchParams.get('keyword');

  const queryObject = useMemo(() => {
    const query = {
      page,
    };

    if (locationId) {
      query.locationId = locationId;
    }
    if (occupationId) {
      query.occupationId = occupationId;
    }
    if (minSalary) {
      query.minSalary = minSalary;
    }
    if (maxSalary) {
      query.maxSalary = maxSalary;
    }
    if (keyword) {
      query.title = keyword;
    }
    return query;
  }, [keyword, locationId, maxSalary, minSalary, occupationId, page]);

  const {data, isSuccess, isError, isLoading} =
    postApi.useGetPostsQuery(queryObject);

  const pagination = useMemo(
    () => ({
      page: data?.currentPage || 0,
      totalPages: data?.totalPages || 0,
    }),
    [data],
  );

  useEffect(() => {
    if (isSuccess) {
      setItems(prev => [...prev, ...(data?.posts ?? [])]);
    }
  }, [data?.posts, isSuccess]);

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
      <h2 className="text-2xl font-bold">Tất cả việc làm</h2>
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          [...Array(10)].map((_, index) => <JobItemSkeleton key={index} />)
        ) : isError ? (
          <p className="col-span-full text-center text-muted-foreground">
            Có lỗi xảy ra trong quá trình tải việc làm
          </p>
        ) : isSuccess ? (
          items.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              Không có việc làm nào
            </p>
          ) : (
            items.map(job => <JobItem key={job.id} job={job} />)
          )
        ) : null}
        {(hasMore || isLoading) && (
          <div ref={elemRef} className="col-span-full" />
        )}
      </div>
    </div>
  );
};

export default Jobs;
