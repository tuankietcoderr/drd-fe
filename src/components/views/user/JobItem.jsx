import {PROFESSIONAL_LEVEL_LABEL} from '@/constants/enum';
import Formatter from '@/utils/formatter';
import {Check, Eye, NotepadTextDashed, Sparkles} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {memo, useMemo} from 'react';

const JobItem = ({job, hideImage, showScore}) => {
  const renderScore = (score, label) => {
    switch (true) {
      case score >= 90:
        return `Rất phù hợp với ${label} của bạn`;
      case score >= 80:
        return `Phù hợp với ${label} của bạn`;
      case score >= 70:
        return `Khá phù hợp với ${label} của bạn`;
      case score >= 60:
        return `Tương đối phù hợp với ${label} của bạn`;
      case score >= 50:
        return `Có thể phù hợp với ${label} của bạn`;
      case score >= 40:
        return `Ít phù hợp với ${label} của bạn`;
      case score >= 30:
        return `Không quá phù hợp với ${label} của bạn`;
      case score >= 20:
        return `Rất ít phù hợp với ${label} của bạn`;
      case score >= 10:
        return `Không phù hợp với ${label} của bạn`;
      case score >= 0:
        return `Hoàn toàn không phù hợp với ${label} của bạn`;
      default:
        return `Không có điểm số cho ${label}`;
    }
  };

  const scores = useMemo(
    () => [
      {
        score: job.locationScore,
        label: 'địa điểm làm việc',
      },
      {
        score: job.salaryScore,
        label: 'mức lương mong muốn',
      },
      {
        score: job.positionScore,
        label: 'vị trí công việc',
      },
      {
        score: job.educationScore,
        label: 'cấp bậc chuyên môn',
      },
      {
        score: job.disabilityScore,
        label: 'tình trạng khuyết tật',
      },
    ],
    [job],
  );

  return (
    <Link
      href={`/viec-lam/${job.id}`}
      className="group flex gap-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:border-primary">
      {!hideImage && (
        <div className="hidden md:block">
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

          <p className="w-fit font-semibold text-primary">
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
          <div className="flex flex-1 flex-wrap items-start gap-2 overflow-auto text-xs">
            <p className="w-fit rounded-full bg-muted px-2 py-1">
              Học vấn {PROFESSIONAL_LEVEL_LABEL[job.professionalLevel]}
            </p>
            <p className="w-fit rounded-full bg-muted px-2 py-1">{job.type}</p>
            {job.disabilityRequirement.length > 0 && (
              <p className="w-fit rounded-full bg-muted px-2 py-1">
                Dành cho {job.disabilityRequirement.join(', ')}
              </p>
            )}
            {job.locations.map(location => (
              <p
                key={location.id}
                className="w-fit rounded-full bg-muted px-2 py-1">
                {location.name}
              </p>
            ))}
          </div>
        </div>
        {showScore && (
          <div className="flex flex-wrap gap-2">
            {scores.map(({score, label}) => (
              <p
                className="inline-flex w-fit gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                key={label}>
                <Sparkles size={14} />
                {renderScore(score, label)}
              </p>
            ))}
          </div>
        )}
        {job.applied && (
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Check size={16} />
            Bạn đã ứng tuyển vị trí này.
          </p>
        )}
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
