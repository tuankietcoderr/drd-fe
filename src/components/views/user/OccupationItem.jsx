import Link from 'next/link';

const OccupationItem = ({occupation}) => {
  return (
    <Link
      href={`/nganh-nghe/${occupation.id}`}
      className="text-sm font-medium transition-colors hover:text-primary hover:underline">
      <span>{occupation.name}</span>{' '}
      <span className="text-primary">({occupation.countPost} việc làm)</span>
    </Link>
  );
};

export const OccupationItemSkeleton = () => {
  return <div className="h-6 w-full animate-pulse rounded bg-muted" />;
};

export default OccupationItem;
