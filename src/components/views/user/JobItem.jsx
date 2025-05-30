import {PROFESSIONAL_LEVEL_LABEL} from '@/constants/enum';
import Formatter from '@/utils/formatter';
import {Eye, NotepadTextDashed} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {memo} from 'react';

const JobItem = ({job, hideImage}) => {
  return (
    <Link
      href={`/viec-lam/${job.id}`}
      className="group flex gap-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:border-primary">
      {!hideImage && (
        <div>
          <Image
            src={
              job.recruiterAvatar ??
              `https://ui-avatars.com/api/?name=${encodeURIComponent(job.recruiterName)}`
            }
            width={80}
            height={80}
            alt={job.recruiterName}
            unoptimized
            onError={e => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.recruiterName)}`;
              e.currentTarget.srcset = '';
              e.currentTarget.onerror = null; // Prevent infinite loop
            }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">
              {job.recruiterName}
            </h2>
            <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
              {job.title}
            </h3>
            <p className="line-clamp-2 text-sm">{job.description}</p>
          </div>

          <div className="flex flex-1 flex-wrap items-start gap-2 text-xs">
            <p className="w-fit rounded-full bg-muted px-2 py-1">
              {Formatter.currency(job.minSalary, {
                notation: 'compact',
                compactDisplay: 'long',
              })}{' '}
              -{' '}
              {Formatter.currency(job.maxSalary, {
                notation: 'compact',
                compactDisplay: 'long',
              })}
            </p>
            <p className="w-fit rounded-full bg-muted px-2 py-1">
              {PROFESSIONAL_LEVEL_LABEL[job.professionalLevel]}
            </p>
            <p className="w-fit rounded-full bg-muted px-2 py-1">{job.type}</p>
            <p className="w-fit rounded-full bg-muted px-2 py-1">
              {job.disabilityRequirement.join(', ')}
            </p>
            {job.locations.map(location => (
              <p
                key={location.id}
                className="w-fit rounded-full bg-muted px-2 py-1">
                {location.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <p>
            Đã đăng{' '}
            {Formatter.date(job.createdAt).format('DD/MM/YYYY lúc HH:mm')}
          </p>
          <div className="flex items-center gap-2">
            <p
              className="inline-flex items-center gap-1"
              title="Lượt xem"
              aria-label="Lượt xem">
              <Eye size={14} />
              {Formatter.number(job.views)}
              <span className="sr-only">Lượt xem</span>
            </p>
            <p
              className="inline-flex items-center gap-1"
              title="Đã ứng tuyển"
              aria-label="Đã ứng tuyển">
              <NotepadTextDashed size={14} />
              {Formatter.number(job.applicants)}
              <span className="sr-only">Đã ứng tuyển</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const JobItemSkeleton = ({hideImage}) => {
  return (
    <div className="flex gap-3 rounded-lg border bg-background p-4 shadow-sm">
      {!hideImage && <div className="size-20 animate-pulse bg-muted" />}
      <div className="flex-1 space-y-3">
        <div className="space-y-2">
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-full animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
        </div>
        <div className="flex flex-1 flex-wrap items-start gap-2 text-xs">
          <div className="h-4 w-fit animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-fit animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-fit animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-fit animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default memo(JobItem);
