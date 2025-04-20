import Formatter from '@/utils/formatter';
import {Eye, NotepadTextDashed} from 'lucide-react';
import Link from 'next/link';
import {memo} from 'react';

/**
 * @param {{job: JobPosting}}
 */
const JobItem = ({job}) => {
  return (
    <Link
      href={`/viec-lam/${job.id}`}
      className="group flex flex-col gap-4 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:border-primary">
      <h3 className="font-semibold transition-colors group-hover:text-primary">
        {job.title}
      </h3>
      <div className="flex flex-1 flex-wrap items-start gap-2 text-xs">
        <p className="w-fit rounded-full bg-muted px-2 py-1">
          {Formatter.currency(job.min_salary, {
            notation: 'compact',
            compactDisplay: 'long',
          })}{' '}
          -{' '}
          {Formatter.currency(job.max_salary, {
            notation: 'compact',
            compactDisplay: 'long',
          })}
        </p>
        <p className="w-fit rounded-full bg-muted px-2 py-1">
          {job.professional_level}
        </p>
        <p className="w-fit rounded-full bg-muted px-2 py-1">{job.type}</p>
        <p className="w-fit rounded-full bg-muted px-2 py-1">
          {job.working_time}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <p>
          Đã đăng{' '}
          {Formatter.date(job.created_at).format('DD/MM/YYYY lúc HH:mm')}
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
    </Link>
  );
};

export default memo(JobItem);
